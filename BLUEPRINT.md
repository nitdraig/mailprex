# Mailprex — Blueprint estratégico

> **Mailprex** es un servicio de **envío de emails desde formularios de contacto**, simple de integrar (`npm install mailprex`), con tres modos de uso: **interno** (para tus propios proyectos), **público SaaS** (usuarios se registran y sacan un token free) y **self-host** (cualquiera lo corre en su VPS).

---

## 1. Definición del producto

### 1.1 One-liner
**Mailprex te da un endpoint listo para recibir formularios de contacto y mandarlos a tu casilla, sin tocar backend.** Un hook de React, un token, listo.

### 1.2 El problema
- Cada web/landing/app tiene su propio formulario de contacto y la mayoría resuelve email con `mailto:`, un backend ad-hoc, o un servicio pesado (Formspree, Netlify Forms, Resend).
- Montar **un endpoint SMTP con validación, rate-limit y sandbox de spam** para un solo formulario es desproporcionado.
- Los SaaS existentes o son cerrados y pagan-por-email, o son genéricos (Resend) y exigen aprender un SDK complejo.

### 1.3 La solución
Un **endpoint `POST /email/send`** que:
- El cliente identifica con un **`formToken`** (UUID).
- Valida el payload con campos predefinidos (`fullname`, `email`, `message`, `phone`, `service` + custom).
- Aplica **cuota mensual** por plan (free / pro / business).
- Firma y manda el email con el `webName` y remitente configurable.
- Devuelve éxito/error de forma simple.

Tres formas de consumirlo:
1. **Interno**: lo usás vos en tus proyectos, sin registrarte.
2. **Público SaaS**: cualquier usuario se registra en `mailprex.excelso.xyz`, saca un `formToken` free, instala el paquete.
3. **Self-host**: un dev/empresa lo corre en su VPS con su propio SMTP y su propia DB.

### 1.4 Nombre
**Mailprex**. No se rebrandea. El dominio, el paquete npm, el repo y la marca se mantienen. Tagline actual: *"Send Emails from your Website with Ease"*.

---

## 2. Los tres modos de uso

```
┌──────────────────────────────────────────────────────────────┐
│                        MAILPREX CORE                         │
│  API + Auth + Quotas + SMTP transport + Dashboard           │
└──────────┬──────────────┬──────────────┬────────────────────┘
           │              │              │
     ┌─────▼────┐   ┌─────▼────┐   ┌─────▼──────┐
     │ INTERNAL │   │  PUBLIC  │   │ SELF-HOST  │
     │          │   │  (SaaS)  │   │            │
     │ Tus      │   │ mailprex │   │ VPS propio │
     │ proyectos│   │ .excelso │   │ con tu SMTP│
     │          │   │  .xyz    │   │            │
     └──────────┘   └──────────┘   └────────────┘
```

Activación: `MAILPREX_MODE=internal|public|selfhost` + variables asociadas. Mismo binario, distinta config.

### 2.1 Modo `internal` (uso propio del autor)

| Aspecto | Detalle |
|---|---|
| Quién | Agustin (autor) y sus proyectos (portfolio, landings, etc.) |
| Tenancy | Single-user, multi-token. Un user "system" pre-creado, varios `formToken` (uno por proyecto). |
| Registro | Deshabilitado. El admin se crea por seed/env. |
| Auth | No se usa JWT de usuario. Los `formToken` son la única auth necesaria para `/email/send`. |
| Branding | "Mailprex — uso interno" en el dashboard (oculto del público). |
| Facturación | No. |
| Caso de uso | "Tengo 5 landings y un portfolio, todos con formulario, todos mandan a distintas casillas." |

### 2.2 Modo `public` (SaaS multi-tenant)

| Aspecto | Detalle |
|---|---|
| Quién | Mailprex (el autor) corre la instancia SaaS. |
| Tenancy | Multi-tenant. Cada `User` es un cliente. |
| Registro | Abierto con verificación de email. |
| Auth | JWT en cookie httpOnly + scopes. |
| Branding | "Mailprex Cloud" en `mailprex.excelso.xyz`. |
| Facturación | Free tier (200 emails/mes). Plan **Pro** opcional (próximamente). |
| Caso de uso | "Soy dev indie, no quiero montar SMTP, me registro, saco token, lo pego en mi form." |

### 2.3 Modo `selfhost` (VPS propio)

| Aspecto | Detalle |
|---|---|
| Quién | Cualquier dev/empresa que quiera correr su propia instancia. |
| Tenancy | Single-tenant por defecto (un user admin), multi-tenant opcional. |
| Registro | Deshabilitado o abierto según flag (`MAILPREX_ALLOW_SIGNUP=true`). |
| Auth | Cookie httpOnly. |
| Branding | Neutro, o el que el operador configure (`WARDEN_*` env). |
| Facturación | No (es su infra). |
| Caso de uso | "Soy empresa y no quiero mandar emails de mis clientes por servidores de terceros." |

Activación típica self-host:
```bash
docker run -d --name mailprex \
  -e MAILPREX_MODE=selfhost \
  -e MAILPREX_SMTP_HOST=smtp.gmail.com \
  -e MAILPREX_SMTP_USER=me@gmail.com \
  -e MAILPREX_SMTP_PASS=xxxx \
  -e DATABASE_URL=mongodb://mongo:27017/mailprex \
  -p 3000:3000 \
  mailprex/api
```

---

## 3. Estrategia de producto

### 3.1 Personas y propuesta de valor por modo

| Persona | Modo | Necesidad | Propuesta |
|---|---|---|---|
| **Agustin (autor)** | internal | Manejar emails de 5+ landings propias sin reinventar backend. | Endpoint unificado, tokens por proyecto, una sola DB. |
| **Dev indie / startup** | public | Form-to-email sin montar SMTP propio, free hasta 200/mes. | Registro → token → `npm install mailprex` → listo. |
| **Empresa mediana** | selfhost | Cumplimiento, control de datos, no mandar leads por Gmail. | Docker compose en su VPC, su SMTP corporativo. |
| **MSP / agencia** | selfhost | Ofrecer servicio branded a sus clientes. | Whitelabel del dashboard, multi-tenant opcional. |

### 3.2 Free vs Pro (solo en modo `public`)

| Plan | Emails/mes | Tokens | Webhooks | Custom SMTP | Precio |
|---|---|---|---|---|---|
| **Free** | 200 | 1 | No | No | $0 |
| **Pro** (futuro) | 5.000 | 10 | Sí | Sí | $5/mes |
| **Business** (futuro) | 50.000 | Ilimitados | Sí | Sí | $25/mes |

El modo `internal` y `selfhost` no tienen plan — son tuyos, no hay cuota que pagar.

### 3.3 Diferenciadores

- **Simplicidad brutal**: 1 hook, 1 token, 0 backend.
- **Funciona en cualquier framework** (no solo React) si instalás el core.
- **Misma API en los 3 modos** — el día de mañana migrás de SaaS a self-host sin tocar el código de tus sitios.
- **Sin vendor lock-in**: si te cansás de Mailprex, el `formToken` es solo un endpoint HTTP — podés reimplementarlo en 30 líneas.

---

## 4. Definición técnica

### 4.1 Arquitectura objetivo (la misma para los 3 modos)

```
┌─────────────────────────────────────────────────────────────┐
│                          SITIOS                              │
│  React/Vue/Svelte/HTML estático → useMailprex / mailprex.js │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS + formToken
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                       apps/api  (Node)                       │
│  Express/Fastify + express-validator + Helmet + rate limit  │
│  /email/send (público, con formToken)                       │
│  /auth /token /user (privado, JWT)                          │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  MongoDB (o Postgres en futuro)              │
│  Users, ApiKeys (formToken), Sends, AuditLog                │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    SMTP transport (Nodemailer)               │
│  Default: Gmail (configurable) — usuario puede traer        │
│  su propio SMTP en Pro o selfhost                            │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                apps/dashboard  (Next.js)                     │
│  Login, profile, generate/list/delete tokens, stats         │
│  (en selfhost: solo admin)                                  │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Modelo de datos

Mantener Mongo (suficiente para el caso de uso). Migrar a Postgres solo si hace falta SQL.

```ts
// User
{
  _id, name, lastName, email, password (bcrypt),
  userType: 'free' | 'pro' | 'business' | 'admin',
  requestCount, lastRequest, verified,
  // opcional self-host single-tenant:
  isSystem?: boolean
}

// ApiKey (ex formToken) — varios por usuario
{
  _id, userId, name, prefix, hash, scopes: ['forms:send'],
  lastUsedAt, createdAt
}

// Send (opcional, para auditoría y futuro webhook)
{
  _id, apiKeyId, from, to, subject, payload,
  status, messageId, error, createdAt
}

// AuditLog (básico, para modo selfhost multi-tenant)
{
  _id, userId, action, ip, ua, createdAt
}
```

### 4.3 API

```
# Público (con formToken en header o body)
POST   /email/send              envía email (rate-limited, validado)

# Privado (con JWT)
POST   /auth/register           solo si MAILPREX_ALLOW_SIGNUP=true
POST   /auth/login
GET    /auth/verify?token=...
GET    /auth/user
PUT    /auth/user/:id
PUT    /auth/changePassword
DELETE /auth/user/:id

POST   /token/generate
GET    /token/list
DELETE /token/:id
```

### 4.4 SDK `mailprex` (refactor del actual)

**Core vanilla (`mailprex`)** — funciona en browser, node, edge, sin React:

```ts
import { sendMailprex } from 'mailprex'

await sendMailprex({
  apiKey: 'mk_...',
  formName: 'Contact',
  to: 'hello@acme.com',
  data: { fullname: 'Ada', email: 'a@b.com', message: 'Hi' },
})
```

**React (`mailprex/react`)** — reemplazo directo del hook actual, con esteroides:

```ts
import { useMailprexForm } from 'mailprex/react'

const { formData, handleChange, handleSubmit, status, error } = useMailprexForm({
  apiKey: 'mk_...',
  to: 'hello@acme.com',
  formName: 'Contact',
  fields: ['fullname', 'email', 'message', 'phone', 'service'],
  recaptcha: 'turnstile-sitekey',   // opcional
})
```

**Mejoras concretas al hook actual**:
- Aceptar campos custom (`fields: string[]`).
- Validación cliente con Zod (opcional, peer-dep).
- Soporte de **CAPTCHA** (Turnstile/hCaptcha) como prop.
- **Retry** automático con backoff en errores 5xx / red.
- Mensajes de error i18n (es, en, pt).
- `onSuccess` y `onError` callbacks.
- `reset()` para limpiar el form.
- `pending` y `cooldown` (rate-limit cliente-side opcional).
- Type-safe con generics: `useMailprexForm<{ fullname: string; ... }>(...)`.

### 4.5 Seguridad (la que ya había en AUDITORIA.md, aplicada a este alcance)

Urgente:
- **Rotar secretos** del `.env` commiteado (Mongo, Gmail app password, JWT secret).
- **JWT en cookie httpOnly** (no localStorage).
- **Rate limit en `/auth/login` y `/auth/register`**.
- **CAPTCHA** en `/auth/register`, `/auth/login` y `/email/send` (Turnstile, free).
- **Escape HTML** en el template de email (no más `message` crudo).
- **Whitelist de `emailDestiny`** opcional por `formToken` (el admin puede limitarlos a 1-5 casillas).

Importante:
- **API key hasheada** en DB, no plana como `formToken` actual. Mostrar prefijo y fecha de creación; nunca el secreto después de creado.
- **HTTPS forzado** + HSTS.
- **bcrypt cost 12**.
- **Logout real** (revocación de JWT en Redis).
- **`/email/send` con scope**: cada `formToken` puede tener un `allowedDestinations: string[]` opcional.
- **Log de envíos** persistente para auditoría y futuro webhook.

---

## 5. NPM package — diseño detallado

### 5.1 Estructura del paquete

```
mailprex/
├── src/
│   ├── core.ts            # sendMailprex() — sin React
│   ├── types.ts
│   ├── validators.ts
│   ├── i18n.ts
│   └── index.ts           # re-export core
└── react/
    ├── useMailprexForm.ts
    ├── MailprexForm.tsx   # componente opcional
    └── index.ts
```

### 5.2 API pública (versión 2.x)

```ts
// mailprex (core)
export interface SendMailprexOptions {
  apiKey: string
  formName: string
  to: string | string[]
  from?: string                       // opcional, default = system
  data: Record<string, string>
  replyTo?: string
  metadata?: Record<string, string>
  idempotencyKey?: string
  recaptchaToken?: string
}

export interface SendMailprexResult {
  ok: boolean
  id?: string
  error?: { code: string; message: string }
}

export function sendMailprex(opts: SendMailprexOptions): Promise<SendMailprexResult>

// mailprex/react
export interface UseMailprexFormOptions<T extends Record<string, string>> {
  apiKey: string
  formName: string
  to: string | string[]
  fields: (keyof T)[]
  recaptcha?: { provider: 'turnstile' | 'hcaptcha'; siteKey: string }
  validate?: (data: T) => Record<string, string> | null
  onSuccess?: (res: SendMailprexResult) => void
  onError?: (err: SendMailprexResult['error']) => void
  resetOnSuccess?: boolean
}

export function useMailprexForm<T>(opts: UseMailprexFormOptions<T>): {
  formData: T
  errors: Partial<Record<keyof T, string>>
  handleChange: (e) => void
  handleSubmit: (e?: FormEvent) => Promise<void>
  status: 'idle' | 'sending' | 'success' | 'error'
  reset: () => void
}
```

### 5.3 Compatibilidad

- **CJS + ESM** (build con `tsup`).
- **Tree-shakeable** (named exports).
- **Types first** (`dist/index.d.ts`).
- **Zero deps** en el core. React solo como peer.
- **Browser bundle < 3kb** gzipped.
- **Node 18+** (usa `fetch` nativo).

### 5.4 Plan de release

- **2.0.0-alpha** — refactor a la nueva API con breaking change del hook.
- **2.0.0** — estable. Publica con un CHANGELOG claro y guía de migración.
- Mantener **1.x** con parches de seguridad durante 6 meses.

---

## 6. Migración desde el código actual

### 6.1 Mapeo archivo a archivo

| Actual | Destino | Acción |
|---|---|---|
| `back/src/index.ts` | `apps/api/src/server.ts` | Reusar estructura; añadir cookie auth, scopes, rate limit en auth, CAPTCHA. Flag `MAILPREX_MODE`. |
| `back/src/connectDB.ts` | `packages/db/src/connect.ts` | Mantener Mongo; abstraer para futuro Postgres. |
| `back/src/models/userModel.ts` | `packages/db/models/{User,ApiKey,Send,AuditLog}.ts` | Añadir `ApiKey` (varios por user), `Send` (log), `AuditLog`. |
| `back/src/controllers/authController.ts` | `apps/api/src/modules/auth/*` | Migrar a cookie httpOnly, MFA opcional, verificación con código de un solo uso. |
| `back/src/controllers/formTokenController.ts` | `apps/api/src/modules/tokens/*` | Renombrar a tokens. Hash en DB, prefijo `mk_live_...`, scopes. |
| `back/src/controllers/userController.ts` | `apps/api/src/modules/users/*` | Whitelist de campos actualizables. |
| `back/src/controllers/email/sendEmail.ts` | `apps/api/src/modules/email/send.ts` | Escapar HTML, validar `emailDestiny` contra whitelist opcional, log a `Send`. |
| `back/src/middlewares/authMiddleware.ts` | `apps/api/src/middleware/auth.ts` | Cookie-based, scopes. |
| `back/src/middlewares/requestLimitMiddleware.ts` | `apps/api/src/middleware/quota.ts` | Cuota por user, consultar de Mongo/Redis. |
| `back/src/config/transporterConfig.ts` | `apps/api/src/config/smtp.ts` | Hacer configurable por env (host/user/pass/port). Default Gmail. |
| `back/src/routes/*` | `apps/api/src/routes/*` | Versionado `/v1` interno, mantener compat con rutas actuales durante 6 meses. |
| `front/src/app/dashboard/*` | `apps/dashboard/app/(authed)/dashboard/*` | Mejorar UX: lista de tokens, gráficos de uso, settings. |
| `front/src/app/api/AuthContext.tsx` | `apps/dashboard/lib/auth.ts` | Server actions + cookies. |
| `front/src/app/hook/useDarkMode.ts` | `apps/dashboard/hooks/useDarkMode.ts` | Mover a `hooks/`. |
| `docs/` | `apps/docs/` | Mantener. Agregar guía de self-host. |
| `npm/src/useMailprex.ts` | `packages/core/src/core.ts` + `packages/react/src/useMailprexForm.ts` | Refactor a la nueva API. |
| `npm/types/index.d.ts` | `packages/core/src/types.ts` | Tipos compartidos. |
| `back/.env` | `.env.example` (raíz) | Plantilla, sin secretos. |
| `back/vercel.json` | `Dockerfile` + `docker-compose.yml` + `deploy/` | Self-host primero, Vercel opcional para el dashboard. |
| `back/package.json` | `package.json` (raíz monorepo) + `apps/*/package.json` | Opcional: pnpm workspaces. |
| `SECURITY.md` | reescrito con proceso real | |
| `README.md` | rebrand suave, mantiene Mailprex | |

### 6.2 Plan por semanas

| Semana | Acción |
|---|---|
| 1 | Monorepo (workspaces). Mover `front`, `docs` a `apps/`. Reescribir `README.md` con la nueva narrativa. |
| 2 | **Seguridad urgente**: rotar `.env` con `git filter-repo`. JWT en cookie. Rate limit + CAPTCHA en auth. Escapar HTML del email. Arreglar mismatch de `deleteUser` y unificar `/verify`. |
| 3 | `ApiKey` model. `formToken` → API key con hash y prefijo. Backwards compatible. |
| 4 | Refactor del hook: `mailprex` core + `mailprex/react`. Publicar 2.0.0-alpha. |
| 5 | SMTP configurable por env. Modo `internal` y `selfhost` operativos. |
| 6 | Dashboard pulido: lista de tokens, stats, settings, dark mode, multi-idioma. |
| 7 | Docker + docker-compose + guía de self-host en `apps/docs/`. |
| 8 | Beta con 5 usuarios externos. Recolectar feedback. Polish. |
| 9 | Lanzamiento público: Show HN, Reddit, Dev.to. |
| 10+ | Pro plan + Stripe. Webhooks. Self-host enterprise. |

---

## 7. Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| `.env` filtrado con credenciales reales | Alta | Crítico | Rotar YA. Doppler/Vault. |
| Relay de spam/phishing desde `/email/send` | Media | Alto | Whitelist de `emailDestiny` por token, CAPTCHA, rate-limit por destinatario. |
| Free tier abusado | Alta | Medio | CAPTCHA obligatorio, rate limit estricto, eventual verificación de identidad en Pro. |
| Gmail suspende la cuenta del SaaS | Media | Crítico | Permitir SMTP custom en Pro; documentar SPF/DKIM/DMARC para self-host. |
| Mantenimiento de 3 modos en mismo binario | Media | Medio | Feature flags por modo; tests por modo. |
| Adopción baja del SaaS | Media | Alto | SEO ("form to email", "contact form API"), contenido, partnerships. |
| Migración rompe a usuarios del hook v1 | Alta | Medio | Mantener v1 con parches de seguridad 6 meses. Guía de migración clara. |
| Burnout | Media | Alto | Co-maintainers, sponsorships, contribuciones bienvenidas. |

---

## 8. Resumen ejecutivo (1 párrafo)

**Mailprex** sigue siendo **el servicio simple de form-to-email**: registrate, sacá un token free, instalá `npm install mailprex`, y tu formulario de contacto manda emails a tu casilla sin que toques backend. Corre en **tres modos** con el mismo binario: **interno** (los proyectos del autor, con un admin pre-creado y tokens ilimitados), **público SaaS** (cualquiera se registra en `mailprex.excelso.xyz`, free hasta 200 emails/mes), y **self-host** (cualquier dev o empresa corre un Docker en su VPS con su propio SMTP y su DB). El **npm package** evoluciona de un hook React con 5 campos fijos a un **SDK modular** (`mailprex` core + `mailprex/react`) con campos custom, validación, CAPTCHA, retry, i18n y type-safety. La **arquitectura** se mantiene simple: Express + Mongo + Nodemailer + Dashboard Next.js; lo único que se endurece es la **seguridad** (rotar secretos ya filtrados, JWT en cookie, rate limit, CAPTCHA, hash de tokens, escape HTML) y se **documenta el self-host** con Docker. El plan: **6-8 semanas** para un v2 estable y self-host pulido; **Pro plan** y webhooks después. El diferenciador no es técnico — es **la promesa de "lo instalás y funciona"**.
