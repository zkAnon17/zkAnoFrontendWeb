## zkAnon — The Private Side of Web3..

zkAnon is a privacy-first web application built with Next.js that lets you create an anonymous wallet and privately trade, chat, bridge, and swap across chains without leaving traceable on‑chain footprints. It leverages zero‑knowledge proofs (ZK) and end‑to‑end encryption to protect your identity and transaction data.

Status: actively developed. Some modules are placeholders/mocks and will be progressively completed per the roadmap.

## Key Features

- Private Wallet: generate an anonymous identity (ZK‑ID/AnoID) and a Solana wallet locally in the browser.
- AnoBot: private trading bot with hidden execution (UI/UX in place; backend upcoming).
- AnoVault: encrypted storage for assets/files (UI/UX in place; decentralized storage integration upcoming).
- AnoBridge: private cross‑chain bridging (multi‑chain rollout planned).
- AnoSwap: private DEX aggregator for token swaps.
- AnoChat: private messaging with SOL transfer (planned).
- Anonymous Governance: vote without revealing your identity (planned).
- Developer API/SDK: basic endpoints for wallet and balance are available; SDK is planned.

## Tech & Architecture

- Framework: Next.js 16 (App Router), React 18, TypeScript.
- UI/UX: Tailwind CSS v4, Radix UI, shadcn/ui patterns, lucide-react, framer-motion.
- Solana: @solana/web3.js, @solana/spl-token.
- Internal Hooks: `hooks/use-zkano.ts` for mnemonic generation, keypair derivation, AES‑GCM encryption, ZK‑ID hashing, and Phantom/Solflare connections.
- Lightweight Backend: Next.js API Routes (`/app/api/*`) for balance queries and wallet persistence in PostgreSQL.
- Database: PostgreSQL via `pg` (pooled in `lib/db.ts`).
- Analytics/Theming: `@vercel/analytics`, `next-themes`.

## Project Structure (short)

```
app/
	page.tsx                # Landing: features, roadmap, CTA
	layout.tsx              # Root layout & theming
	(dashboard)/            # Authenticated area
		layout.tsx
		dashboard/page.tsx    # Private account overview
		ai-agent/page.tsx     # (planned) AI agents marketplace
		analytics/page.tsx    # (planned) private analytics
		anoscan/page.tsx      # (planned) scanner/privacy tools
		bot/page.tsx          # (planned) trading bot
		bridge/page.tsx       # (planned) private bridge
		chat/page.tsx         # (planned) anonymous chat
		nft/page.tsx          # (planned) private NFTs
		profile/page.tsx      # user profile
		settings/page.tsx     # settings
		swap/page.tsx         # (planned) DEX aggregator
		tools/page.tsx        # extra tools
		vault/page.tsx        # (planned) encrypted storage
	auth/
		page.tsx              # Create/Connect/Login via AnoID
		wallet-info/page.tsx  # Newly created wallet info
	api/
		solana/balance/route.ts  # GET SOL balance (supports encrypted address)
		wallets/route.ts         # POST/GET wallets to PostgreSQL

components/
	ui/*, dashboard-*, terminal-card.tsx, theme-provider.tsx

lib/
	db.ts, utils.ts

hooks/
	use-zkano.ts, use-toast.ts
```

## Prerequisites

- Node.js ≥ 22 (see `"engines"` in `package.json`).
- PostgreSQL access for wallet persistence (optional for UI exploration; required for the `/api/wallets` endpoint).

## Run Locally

1) Create a `.env.local` (see Environment Configuration below).

2) Install dependencies and start the dev server:

```powershell
npm install
npm run dev
```

3) Open http://localhost:3000

Build & start for production:

```powershell
npm run build
npm start
```

Lint (optional):

```powershell
npm run lint
```

## Environment Configuration

Create `.env.local` in the project root. Minimal example:

```dotenv
# ——— Database (required for /api/wallets) ———
DATABASE_URL=postgres://user:password@host:5432/dbname
# Set true if your DB provider requires SSL (common on Heroku/Render/Supabase/Neon)
DATABASE_SSL=true
# Optional: pool size
DATABASE_POOL_MAX=10

# ——— Solana RPC ———
# Default RPC for the client (browser)
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
# Server-side RPC (optional; if unset, the default above is used)
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# ——— Encryption/Privacy ———
# Secret to derive the AES‑GCM key (client & server). Do NOT use defaults in production.
NEXT_PUBLIC_ZKANO_ENC_SECRET=change_this_in_production
# Optional: separate server-only secret
ZKANO_ENC_SECRET=change_this_in_production
```

Notes:
- `NEXT_PUBLIC_ZKANO_ENC_SECRET` is used in the browser to encrypt address tokens (`zk1:<iv>:<ciphertext>`) and to deterministically derive ZK‑IDs from a public key.
- The `/api/solana/balance` endpoint can accept an encrypted address and safely decrypt it on the server using the same secret.
- `DATABASE_URL` is required for `/api/wallets` to create and fetch wallet rows.

## NPM Scripts

- `npm run dev` — start development with hot reload.
- `npm run build` — create a production build.
- `npm start` — run the production build.
- `npm run lint` — run ESLint over the codebase.

## API Documentation

All endpoints live under `app/api` (App Router). JSON responses.

1) GET `/api/solana/balance`

- Query:
	- `address` (string, required): Solana address (base58) or encrypted token `zk1:...`.
	- `rpc` (string, optional): custom RPC endpoint.
- Success response: `{ address, lamports, sol }`
- Error codes: `400` (missing params), `500` (failed to fetch balance).

2) POST `/api/wallets`

- Body (JSON):
	- `zk_id` (string, required): the deterministic ZK‑ID.
	- `public_key` (string, required): currently equal to `zk_id` per interim spec.
	- `address` (string, required): the Solana address (base58; same as Solana public key).
	- `username` (string, optional).
- Behavior: idempotently creates the `wallets` table (if missing) and upserts by `zk_id`.
- Success response: `{ ok: true }`

3) GET `/api/wallets`

- Query: exactly one of
	- `zk_id` (string), or
	- `address` (string)
- 200: `{ found: true, wallet: { zk_id, public_key, address, username, created_at } }`
- 404: `{ found: false }`
- 400: invalid parameters.

## Quick User Flow

1) Go to `/auth` to either:
	 - Create a new wallet: locally generate a 12‑word mnemonic and a Solana keypair, derive a `zk_id`, store a short summary in `localStorage`, then (optionally) persist it via `/api/wallets`.
	 - Connect a wallet: Phantom & Solflare supported; the system creates/finds a `zk_id` in the database.
2) On success, the user is redirected to the `(dashboard)` area for account overview, active modules, and privacy metrics.

## Security & Privacy

- Encryption: AES‑256‑GCM, key derived via PBKDF2 (100k iterations, SHA‑256, a versioned static salt).
- Zero‑Knowledge: the app is designed around ZK principles; some parts are mocked today and will be replaced with production ZK‑SNARKs.
- Non‑custodial: private keys are generated and stored locally in the browser; the backend never stores private keys.
- Note: never use default secrets in production. Formal audits are planned.

## Roadmap (high level)

- November 2025 — Token Launch & Foundation: token launch, initial LP, security audit.
- December 2025 — Frontend Development: dashboard and UI for AnoVault & AnoSwap.
- January 2026 — Backend Infrastructure: decentralized relayer, ZK‑proof optimizations, encrypted DB architecture.
- February 2026 — Core Features Launch: AnoBot, AnoBridge, AnoChat, AnoNFT, anonymous governance.
- March 2026 — Ecosystem Expansion: multi‑chain (ETH/BSC/Polygon), mobile apps, developer SDK.
- April 2026 — Enterprise & Scale: enterprise APIs, institutional custody, advanced analytics.

## Contributing

Contributions are welcome. Please open an issue or pull request with a clear description. Follow the existing component patterns and TypeScript conventions.

## License

TBD. Copyright © 2025 zkAnon. Contact the maintainers for commercial use.

## Contact

- Website: https://www.zkanon.io/
- X/Twitter: https://x.com/zkAnon_Official
- Discord: https://discord.gg/S78axhchPK
- Lite Paper: accessible from the landing page button.

