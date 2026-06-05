# Mailprex Frontend

Next.js 16 app — landing page, auth, and user dashboard.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | `/api` for local dev (proxied to backend); full API URL in production |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional Cloudflare Turnstile |
| `NEXT_PUBLIC_MAILPREX_FORM_TOKEN` | Optional token for the demo form on the landing page |

Local dev **must** use `NEXT_PUBLIC_API_URL=/api` so httpOnly auth cookies work via the Next.js rewrite.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |

## Related

- [Root README](../README.md)
- [API backend](../back/README.md)
- [Documentation site](../docs/)
