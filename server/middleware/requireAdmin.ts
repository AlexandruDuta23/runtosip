import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization || '';
  const [, token] = auth.split(' ');
  if (!token) return res.status(401).json({ message: 'Missing token' });
  try {
    const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
    const payload = jwt.verify(token, secret) as any;
    if (!payload || payload.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    (req as any).admin = { id: payload.sub, username: payload.username };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}


