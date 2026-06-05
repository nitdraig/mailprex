# Mailprex API

Express + TypeScript API for the Mailprex form-to-email service.

## Requirements

- Node.js 18+
- MongoDB
- SMTP (Gmail via `EMAILSEND`/`PASS`, or custom via `MAILPREX_SMTP_*`)

## Setup

```bash
npm install
cp .example.env .env
# Edit .env — see Environment variables below
npm run dev
```

Server listens on `PORT` (default `5000`).

## Environment variables

Copy [`.example.env`](.example.env). Key settings:

| Variable | Description |
|---|---|
| `MAILPREX_MODE` | `public` (default), `selfhost`, or `internal` |
| `MONGODB_URI` | Mongo connection string |
| `JWT_SECRET` | Session signing secret |
| `FRONTEND_URL` | Used in verification emails and billing redirects |
| `EMAILSEND` / `PASS` | Gmail SMTP (when custom SMTP not set) |
| `MAILPREX_SMTP_*` | Custom SMTP host (recommended for self-host) |
| `TURNSTILE_SECRET_KEY` | Optional Cloudflare Turnstile |
| `GUMROAD_*` | Pro/Business billing (public mode) |
| `CORS_ORIGINS` | Comma-separated origins for `/auth` |

See [Deployment modes](https://docs.mailprex.excelso.xyz/deployment-modes) and [Gumroad billing](https://docs.mailprex.excelso.xyz/gumroad-billing).

## Docker

From repository root:

```bash
docker compose up -d --build
```

Uses `back/Dockerfile` and MongoDB from `docker-compose.yml`.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server (ts-node-dev) |
| `npm run build` | Compile to `dist/` |
| `npm run ts.check` | TypeScript check |
| `npm run report-legacy-tokens` | List users still on plaintext UUID tokens |

## Main routes

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/email/send` | `formToken` | Send form email |
| POST | `/auth/register` | — | Register (if signup allowed) |
| POST | `/auth/login` | — | Login → httpOnly cookie |
| GET | `/auth/me` | Cookie | Current user |
| GET | `/auth/config` | — | Public deployment config |
| POST | `/token/generateToken` | Cookie | Generate `mk_live_` token |
| GET | `/token/getFormToken` | Cookie | Token status (prefix only) |
| POST | `/billing/checkout` | Cookie | Gumroad checkout URL |
| POST | `/billing/gumroad/ping` | Gumroad | Purchase webhook |

## Project structure

```
src/
  config/       mailprexMode, gumroad, plans, SMTP
  controllers/  auth, email, tokens, billing
  middlewares/  auth, rate limits, CAPTCHA
  models/       User, Send, RevokedToken
  routes/
  index.ts
```

## Modes

- **public** — Multi-tenant SaaS (mailprex.excelso.xyz).
- **selfhost** — Your VPS; set `MAILPREX_SMTP_*` and optional `MAILPREX_ALLOW_SIGNUP`.
- **internal** — Single admin; set `MAILPREX_INTERNAL_ADMIN_EMAIL` / `PASSWORD`; registration disabled.

## License

MIT — see [LICENSE.md](../LICENSE.md).
