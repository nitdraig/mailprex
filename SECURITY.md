# Security Policy

## Supported Versions

| Version | Supported |
| --- | --- |
| 1.x (current) | Yes — security fixes for supported branch |
| < 1.0 | No |

## Reporting a Vulnerability

If you discover a security issue in Mailprex, please report it responsibly:

1. **Do not** open a public GitHub issue for exploitable vulnerabilities.
2. Email **me@agustin.top** with:
   - Description of the issue and impact
   - Steps to reproduce
   - Affected component (`back`, `front`, `npm`, etc.)
3. You should receive an acknowledgment within **72 hours**.
4. We aim to provide a fix or mitigation timeline within **14 days** for confirmed issues.

## Security Practices (v2 roadmap)

- JWT session stored in **httpOnly** cookies (not `localStorage`)
- Rate limiting on authentication endpoints
- Optional **Cloudflare Turnstile** on register, login, and `/email/send`
- HTML escaping in outbound email templates
- Profile updates restricted to whitelisted fields
- Avatar URLs restricted to known assets
- CORS restricted on `/auth`; `/email/send` remains open for form submissions (mitigated by token + rate limits)

## Operator Responsibilities

If you self-host or operate the SaaS instance:

- Rotate `JWT_SECRET`, MongoDB credentials, and SMTP passwords if they were ever exposed
- Use HTTPS in production (`NODE_ENV=production` enables secure cookies and HSTS on the API)
- Set `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in production
- Never commit `.env` files or paste secrets into documentation

## Disclosure

We support coordinated disclosure. Credit will be given in release notes when fixes ship, unless you prefer to remain anonymous.
