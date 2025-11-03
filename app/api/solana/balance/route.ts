import { NextResponse } from "next/server"
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"

// Minimal decrypt support to handle encrypted addresses (zk1:...)
function utf8ToBytes(input: string): Uint8Array {
  return new TextEncoder().encode(input)
}

function base64ToBytes(b64: string): Uint8Array {
  const binary = typeof atob !== "undefined" ? atob(b64) : Buffer.from(b64, "base64").toString("binary")
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes
}

function toStrictArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const ab = new ArrayBuffer(bytes.byteLength)
  new Uint8Array(ab).set(bytes)
  return ab
}

async function deriveAesGcmKey(secret: string): Promise<CryptoKey> {
  const salt = utf8ToBytes("zkano_salt_v1")
  const secretBytes = utf8ToBytes(secret)
  const raw = toStrictArrayBuffer(secretBytes)
  const baseKey = await crypto.subtle.importKey("raw", raw, { name: "PBKDF2" }, false, ["deriveKey"]) 
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: toStrictArrayBuffer(salt),
      iterations: 100_000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  )
}

async function decryptMaybeAddress(tokenOrAddress: string, secret: string): Promise<string> {
  // If it parses as a PublicKey and doesn't look like an encrypted token, return as-is
  try {
    new PublicKey(tokenOrAddress)
    if (!tokenOrAddress.startsWith("zk1:")) return tokenOrAddress
  } catch {}

  if (!tokenOrAddress.startsWith("zk1:")) return tokenOrAddress
  const [, ivB64, ctB64] = tokenOrAddress.split(":")
  const iv = base64ToBytes(ivB64)
  const ct = base64ToBytes(ctB64)
  const key = await deriveAesGcmKey(secret)
  const ctBuf = toStrictArrayBuffer(ct)
  const ivBuf = toStrictArrayBuffer(iv)
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: ivBuf }, key, ctBuf)
  const dec = new TextDecoder().decode(pt)
  // Validate is a proper Solana public key
  new PublicKey(dec)
  return dec
}

export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
  const addressParam = searchParams.get("address")
    const rpc = searchParams.get("rpc")

  if (!addressParam) return NextResponse.json({ error: "Missing address" }, { status: 400 })

  const secret = process.env.NEXT_PUBLIC_ZKANO_ENC_SECRET || process.env.ZKANO_ENC_SECRET || "zkano_default_secret"
  const address = await decryptMaybeAddress(addressParam, secret)

    const DEFAULT_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com"
    const conn = new Connection(rpc || DEFAULT_RPC, "confirmed")
    const lamports = await conn.getBalance(new PublicKey(address))
    const sol = lamports / LAMPORTS_PER_SOL
    return NextResponse.json({ address, lamports, sol })
  } catch (err: any) {
    console.error("/api/solana/balance error", err)
    return NextResponse.json({ error: "Failed to fetch balance" }, { status: 500 })
  }
}
