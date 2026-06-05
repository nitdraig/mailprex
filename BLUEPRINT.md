# Mailprex — Blueprint y auditoría unificados

> Documento único de **producto, arquitectura, estado actual y roadmap**.  
> Sustituye y fusiona el antiguo `BLUEPRINT.md` y `AUDITORIA.md`.

---

## 0. Resumen ejecutivo

**Mailprex** es un servicio **form-to-email**: registrate, sacá un token, instalá el paquete npm y tu formulario de contacto manda emails a tu casilla **sin backend propio**.

**North star (v1 → v2):** simplicidad — *1 hook, 1 token, 0 backend*. Tres modos con el mismo binario: **internal** (proyectos del autor), **public** (SaaS en `mailprex.excelso.xyz`) y **self-host** (Docker + SMTP propio).

**Horizonte lejano (v3+, opcional):** evolucionar hacia una plataforma transaccional tipo Resend (dominios DKIM, webhooks, colas). **No es el foco actual**; solo tiene sentido si el SaaS form-to-email ya tiene tracción y equipo para mantenerlo.

**Tagline:** *Send Emails from your Website with Ease*.

---

## 1. Visión en capas (una sola estrategia, tres horizontes)

| Horizonte | Qué es | Cuándo |
|---|---|---|
| **Ahora (MVP)** | Form relay: `POST /email/send` + hook React + dashboard + cuotas | ✅ En producción parcial |
| **v2 (6–10 semanas)** | Seguridad endurecida, SDK modular, self-host Docker, API keys hasheadas, log de envíos | Objetivo inmediato |
| **v3+ (opcional)** | Plataforma transaccional OSS: dominios, webhooks, colas, Postgres multi-org | Solo si v2 escala |

```
                    ┌─────────────────────────────────────┐
                    │  v3+ Plataforma transaccional       │  ← opcional, largo plazo
                    │  (dominios, webhooks, colas)        │
                    └──────────────────▲──────────────────┘
                                       │ hereda Send, ApiKey, auth
                    ┌──────────────────┴──────────────────┐
                    │  v2 Mailprex Core                   │  ← foco del blueprint
                    │  form-to-email · 3 modos · Docker   │
                    └──────────────────▲──────────────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    │  MVP actual                         │  ← estado del repo hoy
                    │  back/ front/ docs/ npm/            │
                    └─────────────────────────────────────┘
```

---

## 2. Definición del producto

### 2.1 One-liner

**Mailprex te da un endpoint listo para recibir formularios de contacto y mandarlos a tu casilla, sin tocar backend.**

### 2.2 El problema

- Cada web/landing resuelve contacto con `mailto:`, backend ad-hoc o SaaS pesado (Formspree, Resend).
- Montar SMTP + validación + rate-limit + anti-spam para **un solo formulario** es desproporcionado.
- Alternativas: cerradas y caras, o genéricas y con SDK complejo.

### 2.3 La solución (v2)

Un **`POST /email/send`** que:

- Identifica al cliente con un **`formToken`** (hoy UUID; objetivo: API key con prefijo `mk_live_...` hasheada en DB).
- Valida payload (`fullname`, `email`, `message`, `phone`, `service` + campos custom en SDK v2).
- Aplica **cuota mensual** por plan (free / pro / business).
- Envía vía Nodemailer (Gmail por defecto; SMTP configurable en self-host y Pro).
- Devuelve éxito/error simple.

### 2.4 Tres modos de uso

Activación: `MAILPREX_MODE=internal|public|selfhost` + variables asociadas. **Implementado** en `back/src/config/mailprexMode.ts`.

```
┌──────────────────────────────────────────────────────────────┐
│                        MAILPREX CORE                         │
│  API + Auth + Quotas + SMTP transport + Dashboard           │
└──────────┬──────────────┬──────────────┬────────────────────┘
           │              │              │
     ┌─────▼────┐   ┌─────▼────┐   ┌─────▼──────┐
     │ INTERNAL │   │  PUBLIC  │   │ SELF-HOST  │
     │ Tus      │   │  SaaS    │   │ VPS propio │
     │ proyectos│   │ .xyz     │   │ + tu SMTP  │
     └──────────┘   └──────────┘   └────────────┘
```

| Modo | Tenancy | Registro | Auth objetivo | Facturación |
|---|---|---|---|---|
| **internal** | Single-user, multi-token | Off (seed admin) | Solo `formToken` para send | No |
| **public** | Multi-tenant por `User` | On + verify email | JWT cookie httpOnly | Free 200/mes; Pro futuro |
| **selfhost** | Single-tenant default | Flag `MAILPREX_ALLOW_SIGNUP` | Cookie httpOnly | No (infra propia) |

Self-host objetivo:

```bash
docker run -d --name mailprex \
  -e MAILPREX_MODE=selfhost \
  -e MAILPREX_SMTP_HOST=smtp.example.com \
  -e MAILPREX_SMTP_USER=user \
  -e MAILPREX_SMTP_PASS=secret \
  -e DATABASE_URL=mongodb://mongo:27017/mailprex \
  -p 3000:3000 \
  mailprex/api
```

### 2.5 Personas y planes (modo public)

| Persona | Necesidad | Propuesta |
|---|---|---|
| Autor / landings propias | Varios forms, una infra | Modo **internal** |
| Dev indie | Form-to-email sin SMTP | Registro → token → npm |
| Empresa / agencia | Control de datos | **Self-host** + SMTP corporativo |

| Plan | Emails/mes | Tokens | Webhooks | Custom SMTP | Precio |
|---|---|---|---|---|---|
| **Free** | 200 | 1 | No | No | $0 |
| **Pro** (futuro) | 5.000 | 10 | Sí | Sí | ~$5/mes |
| **Business** (futuro) | 50.000 | Ilimitados | Sí | Sí | ~$25/mes |

`internal` y `selfhost` no tienen plan de pago.

### 2.6 Diferenciadores

- **Simplicidad brutal:** 1 hook, 1 token, 0 backend.
- **Misma API en 3 modos** — migrar de SaaS a self-host sin tocar sitios.
- **Sin vendor lock-in** — el token es un HTTP POST reimplementable en pocas líneas.
- **Open-source y self-hostable** (v2) como ventaja frente a Formspree cerrado.

---

## 3. Estado actual del repositorio

### 3.1 Estructura

| Carpeta | Rol | Stack |
|---|---|---|
| `back/` | API REST | Express, MongoDB, Mongoose, Nodemailer, JWT |
| `front/` | Landing + dashboard | Next.js 16, NextUI, Tailwind |
| `docs/` | Documentación | Nextra |
| `npm/` | SDK cliente | Hook React (`usemailprex-react`), 5 campos fijos |

**Producción:** `https://mailprex.excelso.xyz` · API `https://api.mailprex.excelso.xyz`

### 3.2 Flujo implementado hoy

Registro → verificación email → login → generar `formToken` → submit externo → `POST /email/send` → cuota por `userType` → Nodemailer/Gmail.

Mitigación relay: `emailDestiny` debe coincidir con `user.email` del titular del token.

### 3.3 Gap blueprint vs código

| Blueprint v2 | Estado |
|---|---|
| Modo `public` SaaS | ✅ Auth cookie, tokens hasheados, cuotas, dashboard, docs |
| Modo `internal` | ✅ Seed admin, registro deshabilitado |
| Modo `selfhost` + Docker | ✅ `docker-compose.yml`, SMTP por env |
| `MAILPREX_MODE` | ✅ `internal` \| `public` \| `selfhost` |
| Monorepo `apps/` + `packages/` | ❌ Carpetas planas (pendiente opcional) |
| SDK v2 (`sendMailprex` + `useMailprexForm`) | ✅ `mailprex@2.0.0-alpha.1` |
| API keys hasheadas (`mk_live_`) | ✅ Hash bcrypt + compat UUID legacy |
| JWT cookie httpOnly + revocación | ✅ Cookie + blacklist Mongo (`jti`) |
| Log persistente `Send` | ✅ Modelo + rate limit por destinatario |
| Pro/Business + Gumroad | ✅ Checkout URL + ping webhook |
| Migración tokens UUID | ✅ Banner dashboard + script `report-legacy-tokens` |

### 3.4 Salud del stack (auditoría técnica)

**Adecuado para v2 form-to-email:**

- Express + controllers/routes/models — organización clara.
- MongoDB — suficiente para usuarios, tokens y log de envíos v2.
- Next.js dashboard + Nextra docs — correcto; Vercel OK para front/docs.

**Limitaciones conocidas:**

- **Vercel serverless** para API de email: timeouts, SMTP persistente, reintentos → preferir **container/VPS** para `back/` en producción seria.
- **Rate limit in-memory** en auth: no distribuido; OK en single instance, insuficiente multi-réplica sin Redis.
- **Gmail único** como transporte SaaS: riesgo de suspensión; mitigar con SMTP custom (Pro/self-host).
- Migrar a **Postgres** solo si se avanza a v3 multi-org; no es prerequisito de v2.

---

## 4. Arquitectura

### 4.1 Diagrama objetivo (v2)

```
┌─────────────────────────────────────────────────────────────┐
│  Sitios: React / Vue / HTML → useMailprex / sendMailprex()  │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS + formToken / apiKey
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  back/ (Express)                                            │
│  Helmet · rate limit · /email/send · /auth · /token         │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  MongoDB — User, ApiKey, Send, AuditLog                     │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  SMTP (Nodemailer) — Gmail default · configurable por env   │
└──────────────────────────┬──────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────┐
│  front/ (Next.js) — login, profile, tokens, stats           │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 Modelo de datos

**Hoy (Mongo):**

```ts
User {
  _id, name, lastName, email, password, photo,
  userType: 'free' | 'standard' | 'business',
  requestCount, lastRequest, verified, formToken
}
```

**Objetivo v2:**

```ts
User {
  _id, name, lastName, email, password (bcrypt 12), photo,
  userType, requestCount, lastRequest, verified,
  isSystem?: boolean  // modo internal
}

ApiKey {  // ex formToken
  _id, userId, name, prefix, hash, scopes: ['forms:send'],
  allowedDestinations?: string[], lastUsedAt, createdAt
}

Send {
  _id, apiKeyId, from, to, subject, payload,
  status, messageId, error, createdAt
}

AuditLog {
  _id, userId, action, ip, ua, createdAt
}
```

**Horizonte v3 (solo si se pivoteara a plataforma transaccional):**

`Organization`, `Member`, `Domain`, `Email`, `Event`, `Webhook`, `Suppression`, `Template` — ver sección 10.

### 4.3 API

**Implementada hoy:**

```
POST   /email/send              público (formToken)
POST   /auth/register | /login
GET    /auth/verify
GET    /auth/user
PUT    /auth/user/:id
PUT    /auth/changePassword
DELETE /auth/delete
POST   /token/generate
GET    /token/getFormToken
DELETE /token/deleteToken
GET    /verify/v                 legacy — deprecar
```

**Objetivo v2 (compat 6 meses):**

```
POST   /email/send
POST   /auth/*                   solo si MAILPREX_ALLOW_SIGNUP
GET    /token/list
DELETE /token/:id
```

Versionado interno `/v1` cuando se generalice el payload.

### 4.4 SDK npm (v1 → v2)

**Hoy:** hook React, campos fijos (`fullname`, `email`, `message`, `phone`, `service`).

**v2 objetivo:**

```
mailprex/           → sendMailprex() — sin React, zero deps
mailprex/react      → useMailprexForm() — fields custom, CAPTCHA, retry, i18n
```

Release: `2.0.0-alpha` → `2.0.0`; mantener 1.x con parches de seguridad 6 meses.

---

## 5. Seguridad y anti-abuse

### 5.1 Resuelto en código

| Hallazgo | Estado |
|---|---|
| Relay libre (`emailDestiny`) | ✅ Atado a `user.email` |
| XSS en template email | ✅ `escapeHtml` |
| `updateUser` sin whitelist | ✅ Solo `name`, `lastName`, `photo`; dueño del recurso |
| Avatares de perfil | ✅ Whitelist URLs locales |
| Rate limit login/register | ✅ `authRateLimiter` (30/15min/IP) |
| bcrypt cost | ✅ Cost 12 |
| `DELETE /auth/delete` | ✅ Expuesto y autenticado |
| uuid / deps espurias | ✅ `crypto.randomUUID` |
| CORS en `/auth` | ✅ Orígenes restringidos |

### 5.2 Pendiente — urgente (v2 semanas 1–2)

| Item | Riesgo | Acción |
|---|---|---|
| Secretos en historial git | Crítico | Rotar Mongo, Gmail, JWT; `git filter-repo` si hubo leak |
| JWT en `localStorage` | Alto (XSS) | ✅ Cookie `httpOnly` + revocación |
| Sin CAPTCHA | Alto (abuse) | Turnstile en register, login, `/email/send` |
| `formToken` en claro en DB | Alto | ✅ Hash + prefijo `mk_live_`; banner migración legacy |
| CORS `*` en `/email/send` | Medio | Intencional para hook; mitigar con CAPTCHA + rate limit + token rotation |
| `/verify/v` duplicado | Bajo | Deprecar; unificar en `/auth/verify` |
| `getUserById` expone password hash | Medio | Sanitizar o restringir a self |
| `SECURITY.md` plantilla GitHub | Bajo | Proceso real de reporte |
| Deploy fixes a producción | — | Pipeline backend actualizado |

### 5.3 Importante (v2 semanas 3–6)

- [x] JWT revocable (`jti` + MongoDB blacklist).
- [ ] Verificación email con código OTP en DB (no JWT largo en URL).
- [x] Log de envíos `Send` persistente.
- [x] Rate limit por destinatario y por API key.
- [x] HSTS + force HTTPS en API.
- [ ] Logger estructurado (Pino) en lugar de `morgan("combined")`.
- [x] SMTP configurable por env (self-host + Pro path).

### 5.4 Anti-abuse avanzado (v3 — plataforma transaccional)

Solo necesario si Mailprex evoluciona más allá de form-to-email:

- Dominio verificado + DKIM/SPF/DMARC obligatorios.
- Suppression list (bounces, complaints).
- Warmup por dominio, análisis de contenido, abuse contact.
- Cola BullMQ + Redis, webhooks firmados HMAC.

---

## 6. Roadmap unificado

### Fase 0 — Higiene y producción (1–2 semanas)

- [ ] Rotar secretos; purgar historial si aplica.
- [x] JWT en cookie httpOnly + revocación `jti`.
- [x] CAPTCHA (Turnstile).
- [x] Deprecar `/verify/v`.
- [x] Completar `SECURITY.md`.
- [ ] Deploy backend con fixes actuales.

### Fase 1 — Core v2 (semanas 3–6)

- [x] Tokens hasheados (`mk_live_`) + compat legacy UUID.
- [x] Entidad `Send` + rate limit destinatario.
- [x] SDK `sendMailprex` + `useMailprexForm` (2.0.0-alpha).
- [x] `MAILPREX_MODE` + SMTP por env.
- [x] Modos `internal` y `selfhost` operativos.
- [ ] Monorepo opcional (`apps/`, `packages/`).

### Fase 2 — Producto y lanzamiento (semanas 7–10)

- [x] Docker + docker-compose + guía self-host en docs.
- [ ] Dashboard: lista tokens, gráficos uso, settings.
- [ ] Beta 5 usuarios externos → polish.
- [ ] Lanzamiento: Show HN, Dev.to, SEO ("form to email API").

### Fase 3 — Monetización (10+ semanas)

- [x] Gumroad + planes Pro/Business (backend + dashboard).
- [ ] Webhooks básicos (sent/failed) sobre entidad `Send`.
- [ ] SMTP custom por usuario (Pro).

### Fase 4 — Horizonte transaccional (opcional, no comprometido)

Solo evaluar con tracción y equipo:

- Postgres + `Organization` multi-tenant.
- `POST /v1/emails` payload completo, attachments, batch.
- Dominios verificados, DKIM, suppression list.
- Colas, transportes pluggables (SES, Mailgun…).
- React Email, OpenAPI, inbound MX.

**Mapeo Resend → Mailprex (referencia v3):**

| Capacidad | v2 form-to-email | v3 transaccional |
|---|---|---|
| Enviar formulario | ✅ | ✅ |
| API keys scopadas | Parcial (hash v2) | Completo |
| Dominios DKIM | ❌ | ✅ |
| Webhooks | Básico v3 fase | Completo |
| Cola + retry | Opcional v2 | Obligatorio |
| Templates React Email | ❌ | ✅ |

---

## 7. Migración desde el código actual

| Actual | Destino v2 | Acción |
|---|---|---|
| `back/src/index.ts` | `apps/api` o `back/` | `MAILPREX_MODE`, cookie auth, CAPTCHA |
| `formTokenController.ts` | `modules/tokens` | ApiKey hasheada, list/delete |
| `sendEmail.ts` | `modules/email/send` | Log `Send`, whitelist destinos |
| `AuthContext.tsx` | server actions + cookies | Eliminar localStorage |
| `npm/useMailprex.ts` | `mailprex` + `mailprex/react` | SDK v2 |
| `back/vercel.json` | Dockerfile + compose | Self-host first |
| `front/public/avatars/` | perfil usuario | ✅ Hecho |

---

## 8. Riesgos

| Riesgo | Prob. | Impacto | Mitigación |
|---|---|---|---|
| Secretos filtrados | Alta | Crítico | Rotar YA; vault |
| Spam relay vía `/email/send` | Media | Alto | CAPTCHA, rate limit, hash tokens |
| Free tier abusado | Alta | Medio | CAPTCHA, cuotas, suspensión manual |
| Gmail suspende cuenta SaaS | Media | Crítico | SMTP custom Pro/self-host |
| 3 modos en un binario | Media | Medio | Feature flags + tests por modo |
| Scope creep hacia "OSS Resend" | Alta | Alto | **Fase 4 explícitamente opcional** |
| Hook v1 breaking change | Alta | Medio | 1.x con parches 6 meses + guía migración |
| Burnout | Media | Alto | Contribuciones, sponsorships |

---

## 9. Posicionamiento

**Mensaje v2 (usar ahora):**

> Mailprex — form-to-email open-source. Registrate, sacá un token, instalá el hook. Self-host cuando quieras.

**No prometer aún:**

> "The open-source Resend" — reservado para Fase 4 si alguna vez se construye.

**Evitar en README:** uso para spam; dejar claro que el abuso suspende cuentas.

---

## 10. Anexo — Modelo transaccional (v3, referencia)

Si en el futuro Mailprex pivoteara a plataforma transaccional, el modelo objetivo sería:

```
Organization, Member, Domain, ApiKey, Email, Event,
Webhook, DeliveryAttempt, Suppression, Template
```

Primitivas adicionales: dominios verificados, idempotency-key, batch send, receiving MX, audiences, observabilidad (OpenTelemetry, Pino, Prometheus).

**Decisión explícita:** esto **no reemplaza** el north star form-to-email; es una **extensión opcional** que comparte `ApiKey`, auth y transporte SMTP pero exige Postgres, colas y meses de desarrollo adicional.

---

## 11. Resumen en una frase

**Mailprex v2 = form-to-email simple, seguro y self-hostable en tres modos; v3 transaccional = horizonte opcional, no paralelo.**

---

*Última revisión unificada: junio 2026. Documento canónico del proyecto.*
