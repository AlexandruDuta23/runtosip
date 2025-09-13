import { query } from '../../db';

async function migrate() {
  // Ensure events.id auto-increments properly for existing setups.
  // If the column is already IDENTITY, do nothing. Otherwise, ensure a sequence/default exist and are in sync.
  const colInfo = await query<{ is_identity: string | null; column_default: string | null }>(
    `SELECT is_identity, column_default
     FROM information_schema.columns
     WHERE table_name = 'events' AND column_name = 'id'`
  );

  const row = colInfo.rows[0];
  if (!row) {
    throw new Error("Column 'events.id' not found");
  }

  if (row.is_identity === 'YES') {
    // Already identity-based, nothing to do.
    // eslint-disable-next-line no-console
    console.log('Migration 002: events.id is already IDENTITY. Skipping.');
    return;
  }

  // Create sequence if it doesn't exist, set default, own it, and sync to max(id)
  await query(`CREATE SEQUENCE IF NOT EXISTS events_id_seq`);
  await query(`ALTER TABLE events ALTER COLUMN id SET DEFAULT nextval('events_id_seq')`);
  await query(`ALTER SEQUENCE events_id_seq OWNED BY events.id`);
  await query(`SELECT setval('events_id_seq', COALESCE((SELECT MAX(id) FROM events), 0))`);

  // eslint-disable-next-line no-console
  console.log('Migration 002: Ensured events.id auto-increments via sequence.');
}

migrate()
  .then(() => process.exit(0))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Migration 002 failed:', err);
    process.exit(1);
  });


