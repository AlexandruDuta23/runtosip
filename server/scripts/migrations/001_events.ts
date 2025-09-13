import { query } from '../../db';

async function migrate() {
  await query(`
    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      date DATE NOT NULL,
      time TEXT NOT NULL,
      location TEXT NOT NULL,
      distance TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      coffee_stop TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      runner_count INTEGER NOT NULL DEFAULT 0
    );
  `);

  // Seed with a few initial events if table is empty
  const existing = await query<{ count: string }>(`SELECT COUNT(*)::text as count FROM events`);
  if (existing.rows[0] && Number(existing.rows[0].count) === 0) {
    await query(
      `INSERT INTO events (title, date, time, location, distance, difficulty, coffee_stop, description, image, runner_count)
       VALUES
       ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10),
       ($11,$12,$13,$14,$15,$16,$17,$18,$19,$20),
       ($21,$22,$23,$24,$25,$26,$27,$28,$29,$30)`,
      [
        'Herastrau Park Morning Run','2025-12-15','09:00','Herastrau Park','5K - 8K','All Levels','Origo Coffee Shop','Beautiful lakeside run','https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=800',15,
        'Cismigiu Gardens Evening Run','2025-12-20','18:30','Cismigiu Gardens','3K - 5K','Beginner Friendly','Café Central','Relaxing evening run','https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=800',8,
        'Carol Park Trail Run','2025-12-25','10:00','Carol Park','8K - 12K','Intermediate','Starbucks','Challenging trail run','https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=800',12
      ]
    );
  }
}

migrate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Migration completed.');
    process.exit(0);
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Migration failed:', err);
    process.exit(1);
  });


