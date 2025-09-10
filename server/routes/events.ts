import { Router } from 'express';
import { z } from 'zod';
import { query } from '../db';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import type { Request } from 'express';
import { requireAdmin } from '../middleware/requireAdmin';

export const eventsRouter = Router();

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `event-${unique}${ext}`);
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

// Wrap multer to return 400 instead of 500 on invalid file type
const uploadImageMw = (req: Request, res: any, next: any) => {
  (upload.single('image') as any)(req, res, (err: any) => {
    if (err) return res.status(400).json({ message: 'Only PNG and JPG files are allowed' });
    next();
  });
};

const EventSchema = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  location: z.string().min(1),
  distance: z.string().min(1),
  difficulty: z.string().min(1),
  coffeeStop: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
});

const CreateEventSchema = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  location: z.string().min(1),
  distance: z.string().min(1),
  difficulty: z.string().min(1),
  coffeeStop: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1).optional(),
});

type EventRow = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  difficulty: string;
  coffeeStop: string;
  description: string;
  image: string;
  runnerCount: number;
};

eventsRouter.get('/', async (req, res) => {
  const pageParam = req.query.page as string | undefined;
  const pageSizeParam = req.query.pageSize as string | undefined;
  const page = pageParam ? Math.max(1, parseInt(pageParam, 10) || 1) : null;
  const pageSize = pageSizeParam ? Math.max(1, Math.min(100, parseInt(pageSizeParam, 10) || 10)) : null;

  if (page && pageSize) {
    const totalResult = await query<{ count: string }>(`SELECT COUNT(*)::text as count FROM events`);
    const total = Number(totalResult.rows[0]?.count || 0);
    const offset = (page - 1) * pageSize;
    const itemsResult = await query<EventRow>(
      `SELECT id, title, date, time, location, distance, difficulty, coffee_stop as "coffeeStop", description, image, runner_count as "runnerCount"
       FROM events
       ORDER BY date ASC
       LIMIT $1 OFFSET $2`,
      [pageSize, offset]
    );
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    return res.json({ items: itemsResult.rows, page, pageSize, total, totalPages });
  }

  const result = await query<EventRow>(
    `SELECT id, title, date, time, location, distance, difficulty, coffee_stop as "coffeeStop", description, image, runner_count as "runnerCount"
     FROM events
     ORDER BY date ASC`
  );
  res.json(result.rows);
});

eventsRouter.get('/:id', async (req, res) => {
  const result = await query<EventRow>(
    `SELECT id, title, date, time, location, distance, difficulty, coffee_stop as "coffeeStop", description, image, runner_count as "runnerCount" FROM events WHERE id = $1`,
    [req.params.id]
  );
  if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
  res.json(result.rows[0]);
});

// Protected: create event
eventsRouter.post('/', requireAdmin, async (req, res) => {
  const parsed = CreateEventSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid body', issues: parsed.error.issues });
  const e = parsed.data;
  const image = e.image && e.image.trim().length > 0 ? e.image : '/Logo RunToSip (1).png';
  const result = await query<{ id: number }>(
    `INSERT INTO events (title, date, time, location, distance, difficulty, coffee_stop, description, image, runner_count)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,0)
     RETURNING id`,
    [e.title, e.date, e.time, e.location, e.distance, e.difficulty, e.coffeeStop, e.description, image]
  );
  res.status(201).json({ id: result.rows[0].id });
});

// Protected: update event
eventsRouter.put('/:id', requireAdmin, async (req, res) => {
  const parsed = EventSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid body', issues: parsed.error.issues });
  const updates = parsed.data;

  const fields: string[] = [];
  const values: any[] = [];
  let idx = 1;
  for (const [key, value] of Object.entries(updates)) {
    if (key === 'coffeeStop') {
      fields.push(`coffee_stop = $${idx++}`);
    } else {
      fields.push(`${key} = $${idx++}`);
    }
    values.push(value);
  }
  if (fields.length === 0) return res.status(400).json({ message: 'No fields to update' });
  values.push(req.params.id);
  const sql = `UPDATE events SET ${fields.join(', ')} WHERE id = $${idx} RETURNING id`;
  const result = await query<{ id: number }>(sql, values);
  if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
  res.json({ id: result.rows[0].id });
});

// Protected: delete event
eventsRouter.delete('/:id', requireAdmin, async (req, res) => {
  const result = await query<{ id: number; image: string }>(`DELETE FROM events WHERE id = $1 RETURNING id, image`, [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
  const imagePath = result.rows[0].image;
  if (imagePath && imagePath.startsWith('/uploads/')) {
    const full = path.join(process.cwd(), imagePath.replace(/^\//, ''));
    try {
      await fs.promises.unlink(full);
    } catch {
      // ignore
    }
  }
  res.status(204).end();
});

eventsRouter.post('/:id/join', async (req, res) => {
  const result = await query<{ runnerCount: number }>(
    `UPDATE events SET runner_count = runner_count + 1 WHERE id = $1 RETURNING runner_count as "runnerCount"`,
    [req.params.id]
  );
  if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
  res.json({ runnerCount: result.rows[0].runnerCount });
});

// Protected: Upload or change event image
eventsRouter.post('/:id/image', requireAdmin, uploadImageMw, async (req: Request, res) => {
  const uploaded = (req as any).file as any;
  if (!uploaded) return res.status(400).json({ message: 'No file uploaded' });
  const publicPath = `/uploads/${uploaded.filename}`;
  const result = await query<{ id: number; image: string }>(
    `UPDATE events SET image = $1 WHERE id = $2 RETURNING id, image`,
    [publicPath, req.params.id]
  );
  if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
  res.json(result.rows[0]);
});


