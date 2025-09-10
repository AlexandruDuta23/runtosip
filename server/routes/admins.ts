import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { query } from '../db';
import { requireAdmin } from '../middleware/requireAdmin';

export const adminsRouter = Router();

const AdminCreateSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

adminsRouter.use(requireAdmin);

adminsRouter.get('/', async (_req, res) => {
  const result = await query<{ id: number; username: string }>(
    `SELECT id, username FROM admins ORDER BY id ASC`
  );
  res.json(result.rows);
});

adminsRouter.post('/', async (req, res) => {
  const parsed = AdminCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid body', issues: parsed.error.issues });
  const { username, password } = parsed.data;
  const hash = await bcrypt.hash(password, 10);
  const result = await query<{ id: number }>(
    `INSERT INTO admins (username, password_hash) VALUES ($1, $2) RETURNING id`,
    [username, hash]
  );
  res.status(201).json({ id: result.rows[0].id });
});

adminsRouter.delete('/:id', async (req, res) => {
  const result = await query<{ id: number }>(`DELETE FROM admins WHERE id = $1 RETURNING id`, [req.params.id]);
  if (result.rows.length === 0) return res.status(404).json({ message: 'Not found' });
  res.status(204).end();
});


