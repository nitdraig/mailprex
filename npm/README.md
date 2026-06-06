<p align="center">
  <a href="https://mailprex.excelso.xyz/">
    <img src="https://mailprex.excelso.xyz/logo.webp" alt="Mailprex Logo" width="160" height="160">
  </a>
</p>

<h3 align="center">mailprex — npm SDK</h3>

<p align="center">
  <a href="https://docs.mailprex.excelso.xyz/sdk-v2"><strong>SDK v2 docs »</strong></a>
  ·
  <a href="https://www.npmjs.com/package/mailprex">npm</a>
</p>

# mailprex

Client SDK for [Mailprex](https://mailprex.excelso.xyz) form-to-email.

**Current version:** `2.0.0-alpha.1`

## Install

```bash
npm install mailprex
```

## v2 — `sendMailprex()` (any environment)

No React required. Works in browsers, Node 18+, and edge runtimes with `fetch`.

```ts
import { sendMailprex } from "mailprex";

const result = await sendMailprex({
  url: "https://api.mailprex.excelso.xyz/email/send",
  formToken: process.env.MAILPREX_FORM_TOKEN!,
  webName: "My Portfolio",
  emailDestiny: "you@example.com",
  fields: {
    fullname: "Ada Lovelace",
    email: "ada@example.com",
    message: "Hello!",
    phone: "",
    service: "",
  },
});

if (!result.ok) {
  console.error(result.error);
}
```

## v2 — `useMailprexForm()` (custom fields)

```tsx
"use client";
import { useMailprexForm } from "mailprex";

export function ContactForm() {
  const { fields, handleChange, handleSubmit, response } = useMailprexForm({
    url: "https://api.mailprex.excelso.xyz/email/send",
    webName: "My App",
    emailDestiny: "you@example.com",
    formToken: process.env.NEXT_PUBLIC_MAILPREX_FORM_TOKEN!,
    initialFields: { fullname: "", email: "", message: "", company: "" },
  });

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullname" value={fields.fullname} onChange={handleChange} />
      <input name="email" value={fields.email} onChange={handleChange} />
      <textarea name="message" value={fields.message} onChange={handleChange} />
      <button type="submit">Send</button>
      {response.error && <p>{response.error}</p>}
    </form>
  );
}
```

## v1 compatible — `useMailprex()`

Fixed fields: `fullname`, `email`, `message`, `phone`, `service`.

```tsx
import { useMailprex } from "mailprex";

const { formData, handleChange, handleSubmit, response } = useMailprex({
  url: "https://api.mailprex.excelso.xyz/email/send",
  webName: "My Site",
  emailDestiny: "you@example.com",
  formToken: "mk_live_…",
});
```

## Form token

1. Register at [mailprex.excelso.xyz](https://mailprex.excelso.xyz).
2. Dashboard → **Generate Form Token**.
3. Copy the full `mk_live_…` token immediately — it is only shown once.
4. Store it in `.env` (e.g. `MAILPREX_FORM_TOKEN` or `NEXT_PUBLIC_MAILPREX_FORM_TOKEN`).

`emailDestiny` is the recipient inbox for form notifications (any valid email).

## API reference

### `sendMailprex(options)`

| Option | Required | Description |
|---|---|---|
| `url` | Yes | `POST /email/send` endpoint |
| `formToken` | Yes | Dashboard token |
| `webName` | Yes | Site name in email subject |
| `emailDestiny` | Yes | Recipient inbox |
| `fields` | Yes | Payload key/value map |
| `captchaToken` | No | Turnstile token if API requires CAPTCHA |

Returns `{ ok, status, data?, error? }`.

### `useMailprex` / `useMailprexForm`

See [full SDK docs](https://docs.mailprex.excelso.xyz/sdk-v2).

## Build

```bash
npm run build   # outputs dist/
```

## Migration from v1

See [Migration v2](https://docs.mailprex.excelso.xyz/migration-v2).

## License

MIT
