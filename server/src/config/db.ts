import { Pool } from 'pg';

const connectionString =
  process.env.DATABASE_URL || process.env.POSTGRES_URL || 'postgresql://localhost:5432/vuejs_cms';

const pool = new Pool({ connectionString });

const connectDB = async () => {
  try {
    // Ensure posts table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    console.log('Postgres connected');
  } catch (err) {
    console.error('Postgres connection error:', err);
    process.exit(1);
  }
};

export { pool };
export default connectDB;
