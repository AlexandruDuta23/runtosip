import { query } from '../db';
import path from 'path';
import fs from 'fs/promises';
import { spawn } from 'child_process';

async function ensureMigrationsTable() {
  await query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function getApplied(): Promise<Set<string>> {
  const res = await query<{ filename: string }>(`SELECT filename FROM schema_migrations`);
  return new Set(res.rows.map(r => r.filename));
}

function runTsx(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const cmd = process.platform === 'win32' ? 'npx' : 'npx';
    const args = ['tsx', filePath];
    const child = spawn(cmd, args, { stdio: 'inherit', shell: true });
    child.on('exit', (code) => {
      if (code === 0) resolve(); else reject(new Error(`${filePath} exited with code ${code}`));
    });
    child.on('error', reject);
  });
}

async function main() {
  await ensureMigrationsTable();
  const applied = await getApplied();

  // Base migration file (optional/idempotent)
  const base = path.join(process.cwd(), 'server', 'scripts', 'migrate.ts');
  const baseKey = '000_base_migrate';
  try {
    if (!applied.has(baseKey)) {
      await runTsx(base);
      await query(`INSERT INTO schema_migrations (filename) VALUES ($1)`, [baseKey]);
    }
  } catch (e) {
    // If base file missing, continue
  }

  // Folder migrations
  const dir = path.join(process.cwd(), 'server', 'scripts', 'migrations');
  const files = (await fs.readdir(dir))
    .filter(f => f.endsWith('.ts'))
    .sort((a, b) => a.localeCompare(b));

  for (const file of files) {
    const key = file;
    if (applied.has(key)) continue;
    const full = path.join(dir, file);
    await runTsx(full);
    await query(`INSERT INTO schema_migrations (filename) VALUES ($1)`, [key]);
  }

  // eslint-disable-next-line no-console
  console.log('All migrations applied.');
}

main().then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1); });


