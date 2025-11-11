import { Router } from 'express';
import { z } from 'zod';
import { query } from '../db';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import type { Request } from 'express';
import { requireAdmin } from '../middleware/requireAdmin';
import sharp from 'sharp';
export const crewRouter = Router();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `crew-${unique}${ext}`);
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

const CreateCrewSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  age: z.number().int().min(0).optional(),
  profession: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1).optional(),
});

const UpdateCrewSchema = CreateCrewSchema.partial();

type CrewRow = {
  id: number;
  firstName: string;
  lastName: string;
  age: number | null;
  profession: string;
  description: string;
  image: string;
};

crewRouter.get('/', async (_req, res) => {
  const result = await query<CrewRow>(
    `SELECT id, first_name as "firstName", last_name as "lastName", age, profession, description, image FROM crew_members ORDER BY id ASC`
  );
  res.json(result.rows);
});

crewRouter.get('/:id', async (req, res) => {
  const result = await query<CrewRow>(
    `SELECT id, first_name as "firstName", last_name as "lastName", age, profession, description, image FROM crew_members WHERE id = $1`,
    [req.params.id]
  );
  if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
  res.json(result.rows[0]);
});

crewRouter.post('/', requireAdmin, async (req, res) => {
  const parsed = CreateCrewSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid body', issues: parsed.error.issues });
  const c = parsed.data;
  const image = c.image && c.image.trim().length > 0 ? c.image : '/Logo RunToSip (1).png';
  const result = await query<{ id: number }>(
    `INSERT INTO crew_members (first_name, last_name, age, profession, description, image)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
    [c.firstName, c.lastName, c.age ?? null, c.profession, c.description, image]
  );
  res.status(201).json({ id: result.rows[0].id });
});

crewRouter.put('/:id', requireAdmin, async (req, res) => {
  const parsed = UpdateCrewSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid body', issues: parsed.error.issues });
  const updates = parsed.data as Record<string, any>;
  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;
  for (const [key, value] of Object.entries(updates)) {
    const col = key === 'firstName' ? 'first_name' : key === 'lastName' ? 'last_name' : key;
    fields.push(`${col} = $${idx++}`);
    values.push(value);
  }
  if (fields.length === 0) return res.status(400).json({ message: 'No fields to update' });
  values.push(req.params.id);
  const sql = `UPDATE crew_members SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id`;
  const result = await query<{ id: number }>(sql, values);
  if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
  res.json({ id: result.rows[0].id });
});

crewRouter.delete('/:id', requireAdmin, async (req, res) => {
  const result = await query<{ id: number; image: string }>(`DELETE FROM crew_members WHERE id = $1 RETURNING id, image`, [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
  const imagePath = result.rows[0].image;
  if (imagePath && imagePath.startsWith('/uploads/')) {
    const full = path.join(process.cwd(), imagePath.replace(/^\//, ''));
    try { await fs.promises.unlink(full); } catch {}
  }
  res.status(204).end();
});

crewRouter.post('/:id/image', requireAdmin, uploadImageMw, async (req: Request, res) => {
  const uploaded = (req as any).file;
  if (!uploaded) return res.status(400).json({ message: 'No file uploaded' });

  const inputPath = uploaded.path;
  const outputFilename = `processed-${uploaded.filename}`;
  const outputPath = path.join(uploadsDir, outputFilename);

  try {
    await sharp(inputPath)
      .rotate() // fix EXIF orientation
      .resize({
        width: 800,
        height: 800,
        fit: sharp.fit.cover, // crop centrally
        position: sharp.strategy.attention,
        withoutEnlargement: true,
      })
      .jpeg({ quality: 85 })
      .toFile(outputPath);

    await fs.promises.unlink(inputPath);

    const publicPath = `/uploads/${outputFilename}`;
    const result = await query<{ id: number; image: string }>(
      `UPDATE crew_members SET image = $1 WHERE id = $2 RETURNING id, image`,
      [publicPath, req.params.id]
    );

    if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Image processing failed:', err);
    res.status(500).json({ message: 'Image processing failed' });
  }
});


