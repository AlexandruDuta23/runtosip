import { Router } from 'express';
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { query } from '../db';

export const authRouter = Router();

const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

function signToken(payload: object) {
  const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

authRouter.post('/login', async (req, res) => {
  const parsed = LoginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid credentials' });
  const { username, password } = parsed.data;

  const result = await query<{ id: number; username: string; password_hash: string }>(
    `SELECT id, username, password_hash FROM admins WHERE username = $1`,
    [username]
  );
  if (result.rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

  const admin = result.rows[0];
  const ok = await bcrypt.compare(password, admin.password_hash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken({ sub: admin.id, username: admin.username, role: 'admin' });
  res.json({ token });
});
