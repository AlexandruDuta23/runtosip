import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { json } from 'express';
import { eventsRouter } from './routes/events';
import path from 'path';
import { authRouter } from './routes/auth';
import { adminsRouter } from './routes/admins';
import { crewRouter } from './routes/crew';
import { articlesRouter } from './routes/articles';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 5174;

app.use(cors());
app.use(json());
// Serve uploads statically
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/events', eventsRouter);
app.use('/api/crew', crewRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/auth', authRouter);
app.use('/api/admins', adminsRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});


