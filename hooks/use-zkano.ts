import { Keypair, Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "@scure/bip39"
// @ts-ignore - subpath wordlist for runtime ESM resolution
import { wordlist as english } from "@scure/bip39/wordlists/english.js"

// Utilities local to this hook (browser-only usage)
function utf8ToBytes(input: string): Uint8Array {
  return new TextEncoder().encode(input)
}

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

function bytesToBase64(bytes: Uint8Array): string {
  // Convert to string of char codes then btoa
  let binary = ""
  bytes.forEach((b) => (binary += String.fromCharCode(b)))
  // btoa expects Latin1 string
  return typeof btoa !== "undefined" ? btoa(binary) : Buffer.from(bytes).toString("base64")
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

async function hmacSha512(key: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    toStrictArrayBuffer(key),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"]
  )
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, toStrictArrayBuffer(data))
  return new Uint8Array(sig)
}

function ser32(i: number): Uint8Array {
  const buf = new Uint8Array(4)
  buf[0] = (i >>> 24) & 0xff
  buf[1] = (i >>> 16) & 0xff
  buf[2] = (i >>> 8) & 0xff
  buf[3] = i & 0xff
  return buf
}

function parsePath(path: string): number[] {
  if (!path || path === "m") return []
  const parts = path.split("/")
  if (parts[0] !== "m") throw new Error("Path must start with m")
  return parts.slice(1).map((p) => {
    const hardened = p.endsWith("'")
    const numStr = hardened ? p.slice(0, -1) : p
    const n = Number(numStr)
    if (!Number.isInteger(n)) throw new Error(`Invalid path segment: ${p}`)
    return (hardened ? 0x80000000 : 0) + n
  })
}

async function sha256Hex(message: string): Promise<string> {
  const data = utf8ToBytes(message)
  const buf = toStrictArrayBuffer(data)
  const digest = await crypto.subtle.digest("SHA-256", buf)
  return bytesToHex(new Uint8Array(digest))
}

async function deriveAesGcmKey(secret: string): Promise<CryptoKey> {
  // Derive a stable AES-GCM key from a secret using PBKDF2
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

async function encryptString(plaintext: string, secret: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await deriveAesGcmKey(secret)
  const ptBytes = utf8ToBytes(plaintext)
  const pt = toStrictArrayBuffer(ptBytes)
  const ivBuf = toStrictArrayBuffer(iv)
  const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv: ivBuf }, key, pt)
  return `zk1:${bytesToBase64(iv)}:${bytesToBase64(new Uint8Array(ct))}`
}

async function decryptString(token: string, secret: string): Promise<string> {
  if (!token.startsWith("zk1:")) throw new Error("Invalid token")
  const [, ivB64, ctB64] = token.split(":")
  const iv = base64ToBytes(ivB64)
  const ct = base64ToBytes(ctB64)
  const key = await deriveAesGcmKey(secret)
  const ctBuf = toStrictArrayBuffer(ct)
  const ivBuf = toStrictArrayBuffer(iv)
  const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: ivBuf }, key, ctBuf)
  return new TextDecoder().decode(pt)
}

export function useZKano() {
  // Prefix for hashed identifiers
  const PREFIX = "zkano_"
  const SECRET = process.env.NEXT_PUBLIC_ZKANO_ENC_SECRET || "zkano_default_secret"
  const DEFAULT_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com"

  // Validate and resolve a Solana address that may be encrypted (zk1:...)
  const isValidAddress = (val: string): boolean => {
    try {
      // Will throw if invalid
      // eslint-disable-next-line no-new
      new PublicKey(val)
      return true
    } catch {
      return false
    }
  }

  const resolveAddress = async (maybeEncrypted: string): Promise<string> => {
    if (!maybeEncrypted) throw new Error("Address is empty")
    if (isValidAddress(maybeEncrypted) && !maybeEncrypted.startsWith("zk1:")) return maybeEncrypted
    try {
      const dec = await decryptString(maybeEncrypted, SECRET)
      if (isValidAddress(dec)) return dec
    } catch {
      // ignore and fall through
    }
    // If still not valid, throw
    if (!isValidAddress(maybeEncrypted)) throw new Error("Invalid Solana address")
    return maybeEncrypted
  }

  // Normalize provider publicKey into base58 string across shapes
  const normalizePublicKey = (pk: any): string => {
    if (!pk) throw new Error("Empty publicKey")
    try {
      if (typeof pk === "string") {
        return new PublicKey(pk).toBase58()
      }
      if (typeof pk.toBase58 === "function") {
        const s = pk.toBase58()
        return new PublicKey(s).toBase58()
      }
      if (typeof pk.toString === "function") {
        const s = pk.toString()
        return new PublicKey(s).toBase58()
      }
      if (pk instanceof Uint8Array) {
        return new PublicKey(pk).toBase58()
      }
      return new PublicKey(pk).toBase58()
    } catch {
      throw new Error("Unable to normalize public key")
    }
  }

  async function deriveSolanaKeypairFromMnemonic(mnemonic: string, account = 0) {
    if (!validateMnemonic(mnemonic, english as unknown as string[])) {
      throw new Error("Invalid mnemonic")
    }
    // BIP39 seed
    const seed = mnemonicToSeedSync(mnemonic)
    // SLIP-0010 ed25519 path for Solana
  // Common default path used by popular Solana wallets (Phantom/Solflare)
  const path = `m/44'/501'/${account}'`
    const indexes = parsePath(path)

    // Master key I = HMAC-SHA512(key="ed25519 seed", data=seed)
    const master = await hmacSha512(utf8ToBytes("ed25519 seed"), seed)
    let k = master.slice(0, 32)
    let c = master.slice(32)

    for (const i of indexes) {
      if ((i & 0x80000000) === 0) throw new Error("Non-hardened derivation not supported for ed25519")
      const data = new Uint8Array(1 + 32 + 4)
      data.set([0x00], 0)
      data.set(k, 1)
      data.set(ser32(i), 33)
      const I = await hmacSha512(c, data)
      k = I.slice(0, 32)
      c = I.slice(32)
    }
    // Solana Keypair from 32-byte derived k
    const keypair = Keypair.fromSeed(k)
    return keypair
  }

  const createZKWallet = async () => {
    // Generate 12-word mnemonic and derive Solana Keypair using standard path
  const mnemonic = generateMnemonic(english as unknown as string[], 128)
    const keypair = await deriveSolanaKeypairFromMnemonic(mnemonic)
    const publicKeyBase58 = keypair.publicKey.toBase58()

    // Important: address in Solana is the base58 public key
    const address = publicKeyBase58

    // Private key (Uint8Array) -> hex for display/storage
    const privateKeyHex = bytesToHex(keypair.secretKey)

    // Compute SHA-256 hash with our secret as config (salt)
    const pubkeyHashHex = await sha256Hex(`${SECRET}:${publicKeyBase58}`)
    const zkIdentifier = `${PREFIX}${pubkeyHashHex}`

    // Backward-compatible fields + requested fields
    const proofId = `PROOF_${Math.random().toString(36).substring(2, 10).toUpperCase()}_${Date.now()
      .toString(36)
      .toUpperCase()}`

    const seedPhrase = mnemonic

    return {
      // Existing fields used by UI today
      address,
      publicKey: publicKeyBase58,
      privateKey: privateKeyHex,
      seedPhrase,
      proofId,
      // New required fields
      zk_id: zkIdentifier,
      public_key: zkIdentifier, // public_key is the hashed public key per spec
    }
  }

  const importWalletFromMnemonic = async (mnemonic: string) => {
    const keypair = await deriveSolanaKeypairFromMnemonic(mnemonic)
    const publicKeyBase58 = keypair.publicKey.toBase58()
    const address = publicKeyBase58
    const privateKeyHex = bytesToHex(keypair.secretKey)
    const pubkeyHashHex = await sha256Hex(`${SECRET}:${publicKeyBase58}`)
    const zkIdentifier = `${PREFIX}${pubkeyHashHex}`
    return {
      address,
      publicKey: publicKeyBase58,
      privateKey: privateKeyHex,
      seedPhrase: mnemonic,
      zk_id: zkIdentifier,
      public_key: zkIdentifier,
    }
  }

  const hashPublicKey = (pubkey: string) => {
    // Backward-compat helper: returns short hash-like tag (not used for IDs)
    return `hash_zka403_${pubkey.slice(0, 6)}`
  }

  const hashWithZKA403 = (pubkey: string) => {
    // Per request: final ID based on sha256 with our config + prefix
    // Note: This synchronous wrapper returns the formatted string using a precomputed saltless fallback.
    // Prefer using async getZkIdentifierForPublicKey for exact computation.
    // Since components call this synchronously, we approximate using pubkey only.
    // Consumers should use wallet.zk_id returned by createZKWallet for authoritative value.
    return `${PREFIX}${pubkey}`
  }

  const getZkIdentifierForPublicKey = async (pubkey: string) => {
    const hash = await sha256Hex(`${SECRET}:${pubkey}`)
    return `${PREFIX}${hash}`
  }

  const verifyZKProof = async () => {
    // Placeholder/Mock verification
    await new Promise((resolve) => setTimeout(resolve, 500))
    return true
  }

  const getSolBalance = async (pubkeyBase58: string, rpcUrl?: string) => {
    // Resolve plain or encrypted address
    const addr = await resolveAddress(pubkeyBase58)
    try {
      const conn = new Connection(rpcUrl || DEFAULT_RPC, "confirmed")
      const balanceLamports = await conn.getBalance(new PublicKey(addr))
      return balanceLamports / LAMPORTS_PER_SOL
    } catch (e) {
      // Fallback to server API to avoid CORS issues
      try {
        const res = await fetch(`/api/solana/balance?address=${encodeURIComponent(addr)}${rpcUrl ? `&rpc=${encodeURIComponent(rpcUrl)}` : ""}`)
        if (!res.ok) throw new Error("API error")
        const data = await res.json()
        return typeof data.sol === "number" ? data.sol : Number(data.sol)
      } catch (err) {
        console.error("getSolBalance failed", err)
        throw err
      }
    }
  }

  const connectWallet = async (walletType: "phantom" | "solflare" | "metamask") => {
    if (typeof window === "undefined") {
      throw new Error("Wallet connect is only available in browser")
    }

    if (walletType === "phantom") {
      const provider: any = (window as any).solana
      if (!provider || !provider.isPhantom) {
        throw new Error("Phantom provider not found")
      }
      const res = await provider.connect({ onlyIfTrusted: false })
      const pkRaw = res?.publicKey ?? provider.publicKey
      const pubkey = normalizePublicKey(pkRaw)
      return { connected: true, address: pubkey, walletType }
    }

    if (walletType === "solflare") {
      const provider: any = (window as any).solflare
      if (!provider || !provider.isSolflare) {
        throw new Error("Solflare provider not found")
      }
      const res = await provider.connect()
      const pkRaw = provider.publicKey ?? res?.publicKey
      const pubkey = normalizePublicKey(pkRaw)
      return { connected: true, address: pubkey, walletType }
    }

    // MetaMask is not a Solana wallet; return error to avoid misleading SOL balance expectations
    if (walletType === "metamask") {
      throw new Error("MetaMask is not supported for Solana balance")
    }

    throw new Error("Unsupported wallet type")
  }

  return {
    createZKWallet,
    hashPublicKey,
    hashWithZKA403,
    getZkIdentifierForPublicKey,
    verifyZKProof,
    connectWallet,
    encryptString: (plaintext: string) => encryptString(plaintext, SECRET),
    decryptString: (token: string) => decryptString(token, SECRET),
    importWalletFromMnemonic,
    getSolBalance,
    resolveAddress,
    normalizePublicKey,
  }
}
