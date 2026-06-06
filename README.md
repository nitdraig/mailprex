<p align="center">
  <a href="https://mailprex.excelso.xyz/">
    <img src="https://mailprex.excelso.xyz/logo.webp" alt="Mailprex Logo" width="200" height="200">
  </a>
</p>

<h3 align="center">Mailprex — form-to-email, open-source</h3>

<p align="center">
  Send emails from your website with ease — 1 hook, 1 token, 0 backend.
  <br>
  <a href="https://docs.mailprex.excelso.xyz/"><strong>Documentation »</strong></a>
  ·
  <a href="https://mailprex.excelso.xyz/"><strong>Web app »</strong></a>
  ·
  <a href="BLUEPRINT.md"><strong>Blueprint »</strong></a>
</p>

# Mailprex

[![npm version](https://img.shields.io/npm/v/mailprex.svg?style=flat-square)](https://www.npmjs.com/package/mailprex)

**Mailprex** is an open-source **form-to-email** service: register, generate a private token, add the npm package to your site, and contact forms reach your inbox without building a backend.

**Production:** [mailprex.excelso.xyz](https://mailprex.excelso.xyz) · API [api.mailprex.excelso.xyz](https://api.mailprex.excelso.xyz)

## Features (v2)

- Hashed form tokens with `mk_live_…` prefix (shown once on generate)
- React hook + framework-agnostic `sendMailprex()` client
- Monthly quotas by plan (Free / Pro / Business)
- httpOnly cookie auth, optional Turnstile CAPTCHA, rate limits
- Self-host with Docker + custom SMTP (`MAILPREX_MODE=selfhost`)
- Pro billing via [Gumroad](https://gumroad.com) webhooks

## Repository structure

| Folder | Description |
|---|---|
| [`back/`](back/) | Express + MongoDB API |
| [`front/`](front/) | Next.js landing + dashboard |
| [`docs/`](docs/) | Nextra documentation site |
| [`npm/`](npm/) | `mailprex` npm package (SDK) |

Canonical product doc: [`BLUEPRINT.md`](BLUEPRINT.md)

## Quick start (website owners)

1. [Register](https://mailprex.excelso.xyz/register) and verify your email.
2. Log in → **Dashboard** → **Generate Form Token** (copy it immediately).
3. Install the SDK:

```bash
npm install mailprex
```

4. Wire a contact form:

```tsx
"use client";
import { useMailprex } from "mailprex";

export function ContactForm() {
  const { formData, handleChange, handleSubmit, response } = useMailprex({
    url: "https://api.mailprex.excelso.xyz/email/send",
    webName: "My Site",
    emailDestiny: "you@example.com", // inbox that receives form submissions
    formToken: process.env.NEXT_PUBLIC_MAILPREX_FORM_TOKEN!,
  });

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullname" value={formData.fullname} onChange={handleChange} required />
      <input name="email" type="email" value={formData.email} onChange={handleChange} required />
      <textarea name="message" value={formData.message} onChange={handleChange} required />
      <button type="submit">Send</button>
      {response.error && <p>{response.error}</p>}
    </form>
  );
}
```

Store the token in an environment variable — never commit it to git.

See [SDK v2](https://docs.mailprex.excelso.xyz/sdk-v2) for `sendMailprex()` and custom fields with `useMailprexForm()`.

## Quick start (developers / self-host)

```bash
cp back/.example.env back/.env   # edit JWT, SMTP, Mongo URI
docker compose up -d --build     # API on :5000 + MongoDB
```

Details: [Self-host guide](https://docs.mailprex.excelso.xyz/self-host) · [Deployment modes](https://docs.mailprex.excelso.xyz/deployment-modes)

Local full stack:

```bash
cd back && npm install && npm run dev
cd front && npm install && npm run dev   # NEXT_PUBLIC_API_URL=/api
```

## Plans

| Plan | Sends / month | Price |
|---|---|---|
| Free | 200 | $0 |
| Pro | 5,000 | via Gumroad |
| Business | Unlimited | via Gumroad |

Upgrade from the dashboard when Gumroad billing is enabled on the API.

## API overview

```http
POST /email/send
Content-Type: application/json

{
  "formToken": "mk_live_…",
  "webName": "My Site",
  "emailDestiny": "owner@example.com",
  "fullname": "Jane",
  "email": "jane@example.com",
  "message": "Hello"
}
```

`emailDestiny` is the recipient inbox for each send (any valid email). Rate limits still apply per account and per recipient.

Full reference: [API docs](https://docs.mailprex.excelso.xyz/mailprexAPI)

## Security

- Regenerate legacy UUID tokens from the dashboard (`mk_live_` format).
- Enable Turnstile on register, login, and `/email/send` when keys are set.
- Rotate `JWT_SECRET` and SMTP credentials before production deploy.

See [`SECURITY.md`](SECURITY.md) and [Migration v2](https://docs.mailprex.excelso.xyz/migration-v2).

## Contributing

Issues and pull requests are welcome. Please open a discussion or issue before large changes.

## License

[MIT](LICENSE.md)
