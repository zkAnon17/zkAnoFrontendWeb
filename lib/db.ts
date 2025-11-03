import { Pool } from "pg"

// Use a singleton across Fast Refresh in dev
let _pool: Pool | undefined

export function getDbPool() {
  if (_pool) return _pool

  const connectionString = process.env.DATABASE_URL
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set in environment")
  }

  _pool = new Pool({
    connectionString,
    // Enable ssl if DATABASE_SSL=true or on common hosted providers
    ssl:
      process.env.DATABASE_SSL === "true" || /amazonaws|heroku|render|supabase|neon/i.test(connectionString)
        ? { rejectUnauthorized: false }
        : undefined,
    // Optional: larger pool size for serverless dev
    max: Number(process.env.DATABASE_POOL_MAX || 10),
  })

  return _pool
}
