# Mailprex — Auditoría técnica y de producto

> **Visión del proyecto**: construir un **Resend gratuito y open-source** — un servicio transaccional de email auto-hospedable, multi-tenant, con SDKs, webhooks, dominios propios y transporte SMTP pluggable.

---

## Qué es y cómo está armado hoy

Mailprex es un servicio transaccional de email con cuatro paquetes:

| Carpeta | Rol |
|---|---|
| `npm/` | SDK público (hoy un hook React orientado a formularios). |
| `back/` | API Express + TS + Mongoose + Nodemailer (Gmail). Rutas: `/auth`, `/token`, `/email/send`, `/verify`. |
| `front/` | Dashboard Next.js 16 (NextUI). |
| `docs/` | Sitio de documentación con Nextra. |

**Flujo actual**: registro → `formToken` UUID → submit desde un form externo → `POST /email/send` con el token en el body → validación + quota por plan + envío vía Nodemailer/Gmail. El `emailDestiny` debe coincidir con el `user.email` del titular del token (mitigación parcial de relay; no sustituye dominio verificado ni API keys scopadas).

**Gap con la visión**: hoy es un *form relay*; la visión pide una **plataforma transaccional** con dominios verificados, API keys, webhooks, plantillas React Email y transporte pluggable. Hay que pivotar el modelo de datos y la superficie de API.

---

## 1) Viabilidad del stack para "OSS Resend"

**Viable con cambios importantes.** El esqueleto es sano; el problema es que la base de datos y el transporte están pensados para un solo uso.

- **MongoDB** funciona, pero para dominios, API keys, eventos, supresiones y bounces la **relacional es mejor**: `User`, `Organization`, `Domain`, `ApiKey`, `Email`, `Event`, `Suppression`, `Webhook`, `Template`, `Attachment`. Recomiendo **PostgreSQL + Prisma/Drizzle** (o SQLite como fallback self-host ligero).
- **Nodemailer + Gmail** como único transporte es el techo del proyecto. Gmail es un buen *starter transport* para self-hosters, pero la arquitectura tiene que permitir **transports pluggables**: SMTP genérico, Amazon SES, Mailgun, Postmark, Resend (irónico pero válido), SendGrid, Gmail, MailHog (dev).
- **Express serverless en Vercel** limita: el envío de email es *trabajo pesado* con timeouts largos, conexiones SMTP persistentes, reintentos. Mejor **Node container** (Fly.io, Railway, Render, Docker propio) o **VPS**. Vercel solo para el dashboard.
- **Cola de envíos** ya no opcional: BullMQ + Redis (o Cloudflare Queues si vas a edge). Sin cola, un bounce puede tumbar el request del cliente.
- **Mongoose 8.4 + `@types/mongoose ^5.11.97`** → mismatch de tipos.
- ~~`uuid ^14` (ESM-only, rompía CJS en Vercel)~~ → reemplazado por `crypto.randomUUID`. ~~Dependencia espuria `"package.json": "^0.0.0"`~~ eliminada. `bcrypt@6` y `nodemailer@8` confirmados en npm.
- La organización del código (controllers / routes / models / middlewares) es **limpia**; sirve como base.

---

## 2) Primitivas que necesita un OSS Resend

Mapeo Resend → Mailprex:

| Resend | Estado actual | Acción |
|---|---|---|
| **Dominios verificados** (DKIM/SPF/DMARC) | No existe | **Core**: nueva entidad `Domain` con flujo de verificación DNS, public keys DKIM, rotación. |
| **API Keys** scopadas | `formToken` UUID plano | Renombrar a `ApiKey` con scopes (`send:email`, `read:events`, `domain:write`, etc.), prefijo identificable (`mk_live_...`), hash en DB (no plano), rotación y revocación. |
| **Audiences / Contacts** | No existe | Fase 2 (envío masivo opcional). |
| **Envío transaccional** (`POST /emails`) | `POST /email/send` con campos fijos | Generalizar payload: `from`, `to[]`, `cc`, `bcc`, `replyTo`, `subject`, `text/html/react`, `attachments[]`, `tags`, `headers`, `scheduledAt`. |
| **React Email** | HTML string inline | **Adoptar `react-email`**: componentes TSX que se renderizan a HTML/texto en backend, escapados por defecto. |
| **Webhooks** (delivered, bounced, complained, opened) | No existe | **Core**: `Webhook` entidad + dispatcher; firmado con HMAC para que el cliente verifique origen. |
| **Receiving** (inbound via MX) | No existe | Fase 3 (MX routing + parse). |
| **Templates reutilizables** | No existe | `Template` con versionado. |
| **Attachments** | No soportado | Soporte S3/local con escaneo de MIME y límite de tamaño. |
| **Idempotency-Key** | No existe | **Importante**: header `Idempotency-Key` para evitar duplicados en retries. |
| **Batch send** | No existe | `POST /emails/batch` con hasta 100 mails. |
| **Suppression list** | No existe | Auto-baja en hard-bounce y complaint; manual desde dashboard. |
| **Métricas / analytics** | `requestCount`, `lastRequest` | Reemplazar por `Email` + `Event` con series temporales. |

**Refactor del SDK `npm/`**:
- Hoy es un hook React con 5 campos hardcoded. Pivotealo a:
  - `mailprex` (core SDK, sin React) — `MailprexClient` con `client.emails.send({...})`.
  - `mailprex/react` — hook `useSendEmail` que use el client.
  - `mailprex/node` — client para server-side.
- Multi-transport: en cliente (fetch), en Node (node-fetch/undici), en edge (Web Crypto).
- Tipos: namespace por versión de API (`/v1/emails`).

---

## 3) Puntos clave a mejorar

### Resueltos en código (pendiente deploy en producción)

| Hallazgo | Estado |
|---|---|
| `emailDestiny` libre (relay) | Mitigado: debe coincidir con `user.email` |
| Mismatch `DELETE /auth/delete` | `DELETE /auth/delete` expuesto y autenticado |
| XSS en HTML del email | `escapeHtml` en `sendEmail.ts` |
| `updateUser` sin whitelist | Solo `name`, `lastName`, `photo`; dueño del recurso |
| Rate limit en login/register | `authRateLimiter` (30 req / 15 min / IP) |
| `bcrypt` cost 10 | Cost 12 en register y changePassword |
| Redirect legacy `/verify/v` | Apunta a `mailprex.excelso.xyz/login` (sigue existiendo la ruta duplicada) |
| Dependencia `"package.json"` / `uuid@14` | Eliminados / migrados |

### Abiertos

- **Whitelist de dominios de origen**: el `formToken` no se ata a un sitio. Con la visión OSS-Resend esto se cierra con **dominio verificado** + **API key con scope** + **DKIM alineado al From**.
- **Dos rutas de verify** (`GET /auth/verify` y `GET /verify/v`): flujo real del front usa `/auth/verify` vía `mailprex.excelso.xyz/verify`. Deprecar `/verify/v`.
- **`getUserById` devuelve el documento completo** (incluye `password` hasheado): sanitizar respuesta o restringir a self-only.
- **React Email** sigue siendo mejora deseable frente a strings HTML (escape manual ya aplicado).
- **Hook público rígido**: 5 campos fijos. Generalizar el payload.
- **No se persisten los envíos** → no hay historial, no hay debug, no hay webhooks posibles. Crear `Email` + `Event`.
- **No hay panel de admin** para suspender cuentas, ver abuse, gestionar transports globales.
- **Planes free/standard/business no encajan en OSS** (self-host = gratis siempre). Quitar o dejar como feature del futuro SaaS managed.
- **Migración del modelo `User`**: añadir `organizationId`, `role`, `apiKeys[]`, `domains[]` y mover `formToken` a `ApiKey` con scope.

---

## 4) Optimización para escalabilidad

- **Queue-first**: `POST /emails` encola; worker(s) consumen con concurrencia configurable. Permite reintentos exponenciales, DLQ, priorización.
- **Transport pool**: si el transport es SES/SMTP, mantener conexión abierta y round-robin entre cuentas/IPs (varios SMTP para repartir reputación).
- **Idempotency cache** (Redis) con TTL 24h para `Idempotency-Key`.
- **Event store** append-only (Postgres o ClickHouse) para métricas y webhooks.
- **Webhooks con retry**: 5 intentos con backoff, firma HMAC, log de intentos.
- **Suppression list** consultada antes de aceptar un envío (DB lookup O(1) con índice).
- **Rate limit distribuido** por API key, por dominio y por IP (Redis store para `express-rate-limit`).
- **DNS resolver cacheado** para verificaciones DKIM/SPF.
- **Edge ingestion** (Cloudflare Workers) que valide API key + rate limit y enqueue; el worker pesado corre cerca de Postgres/Redis.
- **Postgres tuning**: `pgbouncer` para pooling, índices en `Email(apiKeyId, createdAt)`, `Event(emailId)`, `Suppression(email)`.
- **Observabilidad**: OpenTelemetry, Prometheus, logs estructurados (Pino), tracing de cada email end-to-end.
- **Build del SDK** con `tsup` para ESM/CJS+types minificado.
- **Next.js dashboard**: RSC para marketing, cliente solo en `/dashboard`. ISR en `docs/`.

---

## 5) Multi-institución (multi-tenancy) — ahora es CORE

En un OSS Resend la multi-tenancy no es opcional: cada "institución" es una organización con sus dominios, keys, miembros, facturación (si hay managed), audit log.

**Modelo de datos propuesto**

```
Organization { _id, name, slug, plan, createdAt }
Member       { orgId, userId, role: 'owner'|'admin'|'developer'|'viewer' }
Domain       { _id, orgId, name, status, dkimPrivateKey, dkimPublicKey,
               spfRecord, dmarcRecord, verifiedAt }
ApiKey       { _id, orgId, name, hash, prefix, scopes[], lastUsedAt, createdAt }
Email        { _id, orgId, apiKeyId, from, to, subject, status,
               messageId, error, idempotencyKey, createdAt }
Event        { _id, emailId, type: 'queued'|'sent'|'delivered'|'bounced'|'complained'|'opened'|'clicked',
               payload, createdAt }
Webhook      { _id, orgId, url, events[], secret, createdAt }
DeliveryAttempt { _id, emailId, transport, response, triedAt }
Suppression  { _id, orgId, email, reason, createdAt }
Template     { _id, orgId, name, reactSource, version, publishedAt }
```

**Reglas**
- Toda query filtrada por `orgId` del usuario autenticado (middleware de tenant).
- API keys **scopadas** (`emails:send`, `emails:read`, `domains:write`, `webhooks:write`).
- Quota por organización, no por usuario.
- Subdominios (`acme.mailprex.app`) o routing por path.
- SSO opcional por org (SAML/OIDC); MFA obligatoria para `owner`.
- Audit log: cada acción administrativa queda registrada (quién, qué, cuándo, IP, key usada).
- Facturación por org (Stripe) **solo en la versión managed**; self-host = gratis total.
- API key visible solo una vez al crearla; después solo prefijo y hash.

**SDK**
- `client.emails.send({ from, to, subject, react, ... })` con `from` validado contra dominios verificados.
- `client.domains.create({ name })` devuelve registros DNS a configurar.
- `client.webhooks.create({ url, events })`.

---

## 6) Seguridad

### Urgentes (rotar YA)

- **Secretos expuestos en historial o documentación**: versiones anteriores de este archivo y/o `back/.env` contuvieron `MONGODB_URI`, Gmail app password y `JWT_SECRET` en texto plano. **Rotar los tres valores**, purgar historial con `git filter-repo` o BFG si estuvieron en git, y **nunca volver a pegar secretos en markdown**. Hoy `back/.env` está en `.gitignore` y no aparece en el índice de git.
- **JWT en `localStorage`** (`AuthContext.tsx`): XSS roba sesión de 30 días. Migrar a cookie `httpOnly` + `sameSite=strict` + CSRF token.
- ~~**Sin rate limit en login/register**~~ → `authRateLimiter` en código; en serverless sigue siendo in-memory (ver Importantes).
- **No hay CAPTCHA** en registro/login ni en `/email/send`.
- ~~**Stored-XSS en el email**~~ → `escapeHtml` aplicado; React Email sigue siendo mejora de mantenimiento.
- **Relay de phishing parcialmente mitigado**: `emailDestiny` atado a `user.email`; sin dominios verificados, API keys scopadas ni DKIM el riesgo de reputación persiste.
- **`/email/send` con CORS `*`** (intencional para el hook desde sitios externos): sin firma HMAC, quien capture un `formToken` puede abusar. CORS en `/auth` ya está restringido a orígenes conocidos.

### Importantes (esta semana)

- **JWT de 30 días sin rotación ni revocación**: crear tabla `RevokedToken` o usar JWT con `jti` y blacklist en Redis.
- **JWT de verificación en URL** del email → usar códigos cortos de un solo uso guardados en DB.
- **API keys en plano en DB** (hoy `formToken` está plano): hashear con `bcrypt`/`argon2`, mostrar prefijo y último uso, nunca el secreto.
- **`morgan("combined")`** → PII bajo GDPR; pasar a logger estructurado (Pino) con redacción.
- **Helmet CSP** solo en Express, no en Next.js. Añadir middleware de seguridad al front.
- **`SECURITY.md` es la plantilla por defecto de GitHub**: completar con proceso de reporte, SLA, Supported Versions reales, contacto de seguridad.
- ~~**`bcrypt` cost 10**~~ → cost 12 en register y changePassword (o migrar a `argon2id` a futuro).
- ~~**`updateUser` sin whitelist**~~ → solo `name`, `lastName`, `photo`; requiere ser el dueño del recurso.
- **Falta `helmet.hsts`** y `force HTTPS` en backend.
- **No hay rate limit por destinatario** → un atacante con una API key puede bombear a un mismo `to` miles de veces. Necesario.

### Reputación / anti-abuse (nuevo, crítico para OSS Resend)

Un OSS Resend sin controles se convierte en **botnet de spam en horas**. Esto no es opcional:

- **Verificación de dominio obligatoria** antes de poder enviar desde un `from@dominio.com`.
- **DKIM firmado por Mailprex** (generar par de claves, publicar la pública como DNS TXT, firmar cada email saliente).
- **SPF y DMARC** publicados y validados antes de activar.
- **Suppression list** con auto-baja en hard-bounce y FBL (complaint). Bloqueo de envíos a esa dirección.
- **Warmup por dominio nuevo** (límite bajo inicial que crece con la reputación).
- **Límite de destinatarios únicos por dominio/día** para evitar patterns de spam.
- **Análisis de contenido**: rechazar payloads que parezcan phishing obvio (links acortados, adjuntos .exe/.zip con password, display name mismatch).
- **Abuse contact** (RFC 2142: `abuse@tu-dominio`) y **abuse reporting pipeline**.
- **Audit log público-mínimo** por org (quién creó qué key, desde qué IP).

### A futuro

- **GDPR / derecho al olvido** real: borrar `Email`, `Event`, `DeliveryAttempt` por org o por dirección.
- **CSP report-uri** en el front.
- **Recibir emails** (MX) implica manejo de storage de adjuntos y PII — modelar aparte.
- **End-to-end encryption** de adjuntos sensibles (S3 SSE-KMS).
- **HSM / KMS** para DKIM private keys en producción (AWS KMS, GCP KMS).
- **Modelo de amenaza** documentado y threat modeling por cada nueva primitiva.

---

## Roadmap sugerido hacia "OSS Resend"

### Fase 0 — Higiene (1-2 semanas)
1. ⬜ Rotar secretos y purgar historial de git si hubo leak.
2. ⬜ JWT en cookie httpOnly, CSRF token, CAPTCHA. ✅ Rate limit en auth (código).
3. ✅ Escapar HTML del email (`escapeHtml`). ⬜ React Email (opcional).
4. ✅ `DELETE /auth/delete`. ⬜ Deprecar `/verify/v` y unificar flujo.
5. ✅ Quitar `"package.json": "^0.0.0"` y migrar `uuid` → `crypto.randomUUID`.
6. ⬜ Deploy backend a Vercel para que los fixes lleguen a producción.

### Fase 1 — Núcleo transaccional (4-6 semanas)
6. Migrar a **PostgreSQL** (o mantener Mongo si preferís) con modelo multi-tenant.
7. `Organization`, `Member`, `Domain`, `ApiKey`, `Email`, `Event`, `Webhook`, `Suppression`.
8. `POST /v1/emails` con payload completo + **Idempotency-Key**.
9. **Cola BullMQ + Redis** con worker de envío.
10. **Transportes pluggables** (SMTP genérico primero, luego SES, etc.).
11. SDK nuevo: `mailprex` core + `mailprex/react` + `mailprex/node`.
12. React Email para plantillas.

### Fase 2 — Dominios y webhooks (3-4 semanas)
13. Flujo de verificación de dominio (DNS TXT challenge).
14. Generación y rotación de claves DKIM.
15. Webhooks firmados HMAC con retry.
16. Suppression list + integración con FBL.
17. Dashboard para todo lo anterior.

### Fase 3 — Templates y batch (2-3 semanas)
18. `Template` con versionado y editor.
19. `POST /v1/emails/batch`.
20. API pública documentada (OpenAPI).

### Fase 4 — Inbound y advanced (después)
21. Receiving (MX + parse).
22. Audiences / contacts.
23. Managed SaaS opcional (facturación, soporte, SLA).

---

## Posicionamiento

- **Tagline**: *"The open-source Resend. Self-hostable transactional email with React Email, domains, and webhooks."*
- **Diferenciadores**:
  - 100% open-source (MIT/AGPL) y self-hostable.
  - **React Email first-class** (mismo stack mental que Resend).
  - **Transportes intercambiables** (no te casa con un vendor).
  - **Sin vendor lock-in** de datos, plantillas ni reputación.
  - **Multi-tenant real** desde el día uno.
  - **Webhooks firmados** out-of-the-box.
- **A evitar** (mensaje claro en el README): "No lo uses para spam; la verificación de dominio es obligatoria; los hard-bounces y complaints apagan la cuenta".
