// One-time schema setup: node --env-file=.env scripts/setup-db.mjs
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

await sql`
  CREATE TABLE IF NOT EXISTS signups (
    id         serial PRIMARY KEY,
    email      text NOT NULL UNIQUE,
    first_name text,
    place      text NOT NULL,
    public_ok  boolean NOT NULL DEFAULT false,
    ip_hash    text,
    created_at timestamptz NOT NULL DEFAULT now()
  )
`;
await sql`CREATE INDEX IF NOT EXISTS signups_place_idx ON signups (place)`;
await sql`CREATE INDEX IF NOT EXISTS signups_ip_recent_idx ON signups (ip_hash, created_at)`;

const [{ count }] = await sql`SELECT count(*)::int AS count FROM signups`;
console.log(`Schema ready. Current signups: ${count}`);
