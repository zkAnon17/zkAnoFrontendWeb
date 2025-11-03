import { NextResponse } from "next/server"
import { getDbPool } from "@/lib/db"

// Disable caching and ensure dynamic execution
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { zk_id, public_key, address, username } = body || {}

    if (!zk_id || !public_key || !address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const pool = getDbPool()
    const client = await pool.connect()
    try {
      await client.query("BEGIN")

      // Ensure table exists
      await client.query(`
        CREATE TABLE IF NOT EXISTS wallets (
          id SERIAL PRIMARY KEY,
          zk_id TEXT UNIQUE NOT NULL,
          public_key TEXT NOT NULL,
          address TEXT NOT NULL,
          username TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `)

      // Upsert by zk_id
      await client.query(
        `INSERT INTO wallets (zk_id, public_key, address, username)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (zk_id)
         DO UPDATE SET public_key = EXCLUDED.public_key, address = EXCLUDED.address, username = EXCLUDED.username;`,
        [zk_id, public_key, address, username || null]
      )

      await client.query("COMMIT")
    } catch (e) {
      await client.query("ROLLBACK")
      throw e
    } finally {
      client.release()
    }

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("/api/wallets POST error", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const zk_id = searchParams.get("zk_id")
    const address = searchParams.get("address")

    if (!zk_id && !address) {
      return NextResponse.json({ error: "Provide zk_id or address" }, { status: 400 })
    }

    const pool = getDbPool()
    const client = await pool.connect()
    try {
      // Ensure table exists (idempotent)
      await client.query(`
        CREATE TABLE IF NOT EXISTS wallets (
          id SERIAL PRIMARY KEY,
          zk_id TEXT UNIQUE NOT NULL,
          public_key TEXT NOT NULL,
          address TEXT NOT NULL,
          username TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `)

      const where = zk_id ? { clause: "zk_id = $1", value: zk_id } : { clause: "address = $1", value: address }
      const result = await client.query(
        `SELECT zk_id, public_key, address, username, created_at FROM wallets WHERE ${where.clause} LIMIT 1`,
        [where.value]
      )

      if (result.rowCount === 0) {
        return NextResponse.json({ found: false }, { status: 404 })
      }

      return NextResponse.json({ found: true, wallet: result.rows[0] })
    } finally {
      client.release()
    }
  } catch (err: any) {
    console.error("/api/wallets GET error", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
