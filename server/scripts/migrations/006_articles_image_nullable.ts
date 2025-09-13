import { query } from '../../db';

async function migrate() {
  await query(`ALTER TABLE articles ALTER COLUMN image DROP NOT NULL;`);
}

migrate()
  .then(() => process.exit(0))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Migration 006 failed:', err);
    process.exit(1);
  });


