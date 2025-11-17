import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load .env.local first (for local development), then .env (for Docker)
dotenv.config({ path: '.env.local' });
dotenv.config({ override: false });
const databaseUrl =
  process.env.DATABASE_URL ||
  `postgresql://${encodeURIComponent(process.env.PGUSER || 'postgres')}:${encodeURIComponent(process.env.PGPASSWORD || '')}@${process.env.PGHOST || 'db'}:${process.env.PGPORT || '5432'}/${process.env.PGDATABASE || 'postgres'}`;


  if (process.env.DEBUG_DB === '1') {
  try {
    const u = new URL(databaseUrl);
    const user = decodeURIComponent(u.username || '');
    const dbName = (u.pathname || '').replace(/^\//, '');
    const host = u.hostname;
    const port = u.port || '5432';
    const password = decodeURIComponent(u.password || '');
    const masked = password ? `${password[0]}${'*'.repeat(Math.max(0, password.length - 2))}${password[password.length - 1]}` : '(empty)';
    // eslint-disable-next-line no-console
    console.log('[DB] Using connection:', { host, port, database: dbName, user, password: masked });
  } catch {
    // eslint-disable-next-line no-console
    console.log('[DB] Invalid DATABASE_URL format for debug display');
  }
}

export const pool = new Pool({ connectionString: databaseUrl });

export async function query<T = unknown>(text: string, params?: any[]): Promise<{ rows: T[] }> {
  return pool.query(text, params);
}


