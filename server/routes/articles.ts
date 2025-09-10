import { Router } from 'express';
import { z } from 'zod';
import { query } from '../db';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import type { Request } from 'express';
import { requireAdmin } from '../middleware/requireAdmin';
import { fetchOpenGraph } from '../utils/opengraph';
const PreviewSchema = z.object({ url: z.string().url() });

export const articlesRouter = Router();

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `article-${unique}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const type = (file.mimetype || '').toLowerCase();
    if (type === 'image/png' || type === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Only PNG and JPG files are allowed'));
    }
  }
});

const uploadImageMw = (req: Request, res: any, next: any) => {
  (upload.single('image') as any)(req, res, (err: any) => {
    if (err) return res.status(400).json({ message: 'Only PNG and JPG files are allowed' });
    next();
  });
};

const CreateArticleSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  image: z.string().min(1).optional(),
});

const UpdateArticleSchema = CreateArticleSchema.partial();

type ArticleRow = { id: number; name: string; url: string; image: string };

articlesRouter.get('/', async (_req, res) => {
  const result = await query<ArticleRow>(`SELECT id, name, url, image FROM articles ORDER BY id DESC`);
  res.json(result.rows);
});

articlesRouter.get('/:id', async (req, res) => {
  const result = await query<ArticleRow>(`SELECT id, name, url, image FROM articles WHERE id = $1`, [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
  res.json(result.rows[0]);
});

articlesRouter.post('/', requireAdmin, async (req, res) => {
  const parsed = CreateArticleSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid body', issues: parsed.error.issues });
  const a = parsed.data;

  // Try OpenGraph fetch if name/image are missing
  let derivedName = a.name;
  let derivedImage = a.image;
  if (!derivedName || !derivedImage) {
    const og = await fetchOpenGraph(a.url).catch(() => ({ } as { title?: string; image?: string }));
    if (!derivedName && og && og.title) derivedName = og.title;
    if (!derivedImage && og && og.image) derivedImage = og.image;
  }

  const image = derivedImage && derivedImage.trim().length > 0 ? derivedImage : null;
  const name = derivedName && derivedName.trim().length > 0 ? derivedName : a.url;
  const result = await query<{ id: number }>(
    `INSERT INTO articles (name, url, image) VALUES ($1,$2,$3) RETURNING id`,
    [name, a.url, image]
  );
  res.status(201).json({ id: result.rows[0].id });
});

// Admin: fetch OpenGraph preview for a URL (no DB write)
articlesRouter.post('/preview', requireAdmin, async (req, res) => {
  const parsed = PreviewSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid body' });
  const { url } = parsed.data;
  const og = await fetchOpenGraph(url).catch(() => ({ } as { title?: string; image?: string }));
  return res.json({ name: og.title || url, image: og.image || null });
});

articlesRouter.put('/:id', requireAdmin, async (req, res) => {
  const parsed = UpdateArticleSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid body', issues: parsed.error.issues });
  const updates = parsed.data as Record<string, any>;
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;
  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = $${idx++}`);
    values.push(value);
  }
  if (fields.length === 0) return res.status(400).json({ message: 'No fields to update' });
  values.push(req.params.id);
  const sql = `UPDATE articles SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id`;
  const result = await query<{ id: number }>(sql, values);
  if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
  res.json({ id: result.rows[0].id });
});

articlesRouter.delete('/:id', requireAdmin, async (req, res) => {
  const result = await query<{ id: number; image: string }>(`DELETE FROM articles WHERE id = $1 RETURNING id, image`, [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
  const imagePath = result.rows[0].image;
  if (imagePath && imagePath.startsWith('/uploads/')) {
    const full = path.join(process.cwd(), imagePath.replace(/^\//, ''));
    try { await fs.promises.unlink(full); } catch {}
  }
  res.status(204).end();
});

articlesRouter.post('/:id/image', requireAdmin, uploadImageMw, async (req: Request, res) => {
  const uploaded = (req as any).file as any;
  if (!uploaded) return res.status(400).json({ message: 'No file uploaded' });
  const publicPath = `/uploads/${uploaded.filename}`;
  const result = await query<{ id: number; image: string }>(
    `UPDATE articles SET image = $1 WHERE id = $2 RETURNING id, image`,
    [publicPath, req.params.id]
  );
  if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
  res.json(result.rows[0]);
});


