# Mailprex — Auditoría técnica y de producto

## Qué es y cómo está armado

Mailprex es un **SaaS de envío de formularios de contacto por email** con cuatro paquetes:

| Carpeta | Rol |
|---|---|
| `npm/` | Hook React público (`useMailprex`) publicado en npm; hace `fetch` al endpoint del backend. |
| `back/` | API Express + TS + Mongoose + Nodemailer (Gmail). Rutas: `/auth`, `/token`, `/email/send`, `/verify`. |
| `front/` | Dashboard Next.js 16 (NextUI) donde el usuario se registra, ve su `formToken` y sus estadísticas. |
| `docs/` | Sitio de documentación con Nextra. |

**Flujo de negocio**: el usuario se registra → recibe un `formToken` UUID único → lo pega en cualquier sitio externo que use el hook `useMailprex` → cada submit llega a `POST /email/send` con el `formToken` en el body → el backend valida el token, aplica quota por plan (free 200 / standard 2000 / business ∞), incrementa `requestCount` y dispara el email con Nodemailer. El `emailDestiny` lo elige el cliente en cada request (no se valida contra el `user.email`).

---

## 1) Viabilidad del stack

**Viable para MVP, frágil para producción.**

- **Nodemailer + Gmail como relay** es un techo duro: Gmail limita a ~500/día (personal) o ~2.000/día (Workspace) y una sola cuenta `EMAILSEND` envía **todos** los mails de todos los clientes. Es punto único de fallo y un imán para que Gmail suspenda la cuenta por spam percibido.
- **Express serverless en Vercel** (`vercel.json` con `@vercel/node`) está bien para tráfico bajo, pero cada cold start paga conexión a Mongo, validación de JWT y arranque de Nodemailer → latencia irregular.
- **Mongoose 8.4 + `@types/mongoose ^5.11.97`** → mismatch de tipos; no estás aprovechando las definiciones reales.
- Dependencias con versiones que no parecen existir publicadas: `bcrypt ^6.0.0`, `uuid ^14.0.0`, `nodemailer ^8.0.4` y `"package.json": "^0.0.0"` como dependencia real. Hay que auditarlas y pinearlas.
- La organización del código (controllers / routes / models / middlewares) es **limpia y mantenible**; el problema no es estructural, es de **sustituciones de servicio y endurecimiento**.

---

## 2) Novedades que podrían aplicarse

- **Migrar a un proveedor transaccional** (Resend, Postmark, Amazon SES, Mailgun) con **identidad de envío por organización** (DKIM/SPF/DMARC propios), o dejar que cada cliente conecte su dominio.
- **React Email** para componer las plantillas tipadas en TSX en lugar de strings HTML inline.
- **Cola de envíos** (BullMQ + Redis o Cloudflare Queues) para no bloquear el request con `await transporter.sendMail`.
- **Server Actions / RSC** en el dashboard (hoy todo es `"use client"`); reduce bundle y mejora SEO del sitio público.
- **Edge runtime** para `/email/send` (Cloudflare Workers o Vercel Edge) → baja latencia global.
- **Webhooks de entrega / rebote / queja** hacia el cliente; **eventos** para Slack/Discord/Sheets/Airtable.
- **Anti-spam server-side**: Turnstile/hCaptcha en el formulario, firma HMAC de origen (dominio + token + timestamp), rate limit por `emailDestiny` y no solo por IP.
- **Paquete `npm/`**: publicarlo ESM+CJS+tipos con `tsup` o `unbuild`, con tree-shaking.
- **OpenTelemetry** para trazas y métricas.
- **Internacionalización** (hoy todo el HTML/JS del email está hardcodeado en español/inglés mezclado).

---

## 3) Puntos clave a mejorar

- **El `emailDestiny` lo manda el cliente en el body sin validación**: un usuario con `formToken` puede usarlo como relay de phishing con la reputación de tu Gmail. Hay que **vincular `formToken` ↔ dominio de origen** (whitelist) y/o ↔ `emailDestiny` permitido.
- **No hay whitelist de dominios** en el hook: cualquier web puede embeber el formulario y entregar al `emailDestiny` configurado, sin acreditar propiedad.
- **El frontend llama `${API}/auth/delete` (DELETE)** pero el backend expone `DELETE /auth/user/:id` → **el botón de eliminar cuenta no funciona** (mismatch real).
- **Dos rutas de verificación distintas** (`/auth/verify` en `authController.ts` y `/verify/v` en `routes/emailVerify.ts`) y la segunda redirige a `https://mailprex.top/login` (dominio muerto, distinto al front `mailprex.excelso.xyz`). Limpiar.
- **XSS en el HTML del email**: `fullname`, `message`, `phone`, `service` se interpolan crudos. Sanitizar (escape HTML) o construir el mail con `React Email` que escapa por defecto.
- **Hook público demasiado rígido**: solo 5 campos fijos. Debería aceptar `Record<string, string>` y validaciones declarativas.
- **No hay `useForm` real** (no integración con RHF/Zod); cualquier validación la hace el cliente.
- **Plantilla de email** no es parametrizable por el cliente; el "asunto" y el "from" no se pueden customizar.
- **Dashboard sin paginación / búsqueda** de los envíos (de hecho, **no se guardan** los submits; deberías persistirlos para que el cliente vea historial, replies, etc.).
- **No hay panel de admin** para gestionar planes, suspender cuentas, ver abuso.

---

## 4) Optimización para escalabilidad

- **Cache de `formToken → user` en Redis** (TTL 5 min) para evitar un roundtrip a Mongo en cada `/email/send`.
- **Rate limit distribuido** (Redis store para `express-rate-limit`) — hoy el limiter es **in-memory** y en serverless no comparte estado entre instancias.
- **Pool de Mongoose** (`maxPoolSize`, `minPoolSize`) y `lean()` en lecturas (`User.findOne(...).lean()` en `checkRequestLimit` y `authMiddleware`).
- **Queue asíncrona** para envío: el endpoint solo encola, un worker procesa → latencia uniforme y reintentos.
- **Reemplazar Gmail** por un proveedor con **pool de IPs** dedicado y **webhooks de bounce/complaint** para auto-suprimir.
- **Edge runtime + KV/Redis** para `checkRequestLimit` y validación de token (lectura muy caliente).
- **Eliminar `body-parser`** y usar `express.json()` nativo; eliminar `morgan` en prod o enviar a un agregador (Datadog/Loki).
- **Build del hook** con `tsup` para ESM/CJS y minificado.
- **Next.js**: activar `experimental.serverActions`, mover marketing a RSC, ISR en `docs/`.
- **MongoDB**: índices en `User.email`, `User.formToken` (ya está por `unique`), `User.lastRequest`; considerar sharding si pasa de 100k usuarios.
- **CDN + cache-control** agresivo en assets y en la landing.

---

## 5) Cómo hacerlo multi-institución

Hoy es **single-tenant**: `User` ↔ 1 `formToken` ↔ 1 `emailDestiny`. Para soportar varias instituciones en la misma plataforma:

**Modelo de datos**
- Nueva entidad `Organization { _id, name, plan, members:[{userId, role}], domains:[...], branding, smtpIdentity, createdAt }`.
- Añadir `organizationId` en `User` y en `FormToken` (que pasa a ser colección aparte: `{ token, organizationId, allowedDomains, allowedDestinations, scopes, expiresAt }`).
- `Role` enum: `owner | admin | agent | viewer`.
- `Invitation { orgId, email, role, token, expiresAt }`.

**Lógica**
- `formToken` validado por **`(token, originDomain, emailDestiny)`** en whitelist.
- Quota agregada **por organización**, no por usuario.
- Branding por organización: logo, color, "from" del email, reply-to, plantillas propias.
- Subdominios (`acme.mailprex.io`) o routing por path (`mailprex.io/acme/...`).
- SSO opcional (SAML/OIDC) por org; MFA obligatoria para owners.
- Audit log por organización: quién envió qué, cuándo, IP, token usado.
- Facturación por organización (Stripe), no por usuario.
- Aislamiento de datos: cada query filtra por `organizationId` del usuario logueado; middleware de tenant.
- API keys **scopadas** (`forms:send`, `forms:read`, `org:admin`).

**Cambios en el hook**
- `formToken` por dominio (no global).
- Aceptar `orgId` o leerlo del token.
- Soporte de attachments / campos custom por org.

---

## 6) Agujeros de seguridad

### Urgentes (rotar YA)

- **`.env` commiteado en el repo** (`back/.env`): expone `MONGODB_URI` con credenciales `agustin2051:P8QwywDDzvIbmj2F`, `PASS` (app password de Gmail `atey jsap nntr yiky`) y `JWT_SECRET` `4693032f19dcfaaf98bcecedeaee45c0f1de3deb6e58b679ff54097f313f9a27`. **Rotar las tres cosas hoy, purgar con `git filter-repo` o BFG, y forzar push.** El `.gitignore` existe pero el archivo ya estaba tracked.
- **JWT en `localStorage`** (`AuthContext.tsx:25,61,220`): cualquier XSS roba sesión de 30 días. Migrar a cookie `httpOnly`, `secure`, `sameSite=strict` + CSRF token.
- **No hay rate limit en `/auth/login` ni `/auth/register`** → credential stuffing y creación masiva de cuentas.
- **No hay CAPTCHA** en registro/login ni en `/email/send`.
- **Stored-XSS en el email**: `message`, `fullname`, etc. se inyectan crudos en `sendEmail.ts:88-94` → si el cliente abre el mail en un cliente vulnerable (Outlook desktop, algunos webmails), ejecuta JS.
- **Plataforma usable como relay de phishing**: `emailDestiny` libre + `webName` libre + remitente `EMAILSEND` de Gmail. Hoy no hay forma de auditar ni frenar abuso.
- **`/email/send` no valida origen (CORS `*`) ni firma** → cualquier script externo puede usarlo si captura un `formToken`.

### Importantes (esta semana)

- **JWT de 30 días sin rotación ni revocación** (no hay blacklist de tokens en logout). Logout no invalida el JWT.
- **JWT de verificación en la URL** del email → se loguea en proxies, web servers, referrers; usar códigos cortos o magic-link con token de un solo uso en una tabla.
- **`morgan("combined")`** registra IPs y User-Agents → PII bajo GDPR. Redactar o pasar a logger estructurado.
- **Helmet CSP** define `scriptSrc 'self' trusted-cdn.com` pero el front en sí no usa ese CDN y, además, **helmet solo se aplica en el Express, no en el Next.js del front**.
- **`SECURITY.md` es la plantilla por defecto de GitHub** (menciona versiones `5.1.x`/`4.0.x` que no existen en este repo). Inconsistente y da mala imagen; complétalo con el proceso real de reporte, SLA y Supported Versions reales.
- **`bcrypt` cost 10** → subir a 12 en prod.
- **Login devuelve 400 con mensaje idéntico** cuando el usuario no existe y cuando la contraseña es incorrecta → bien, no hay user enumeration.
- **`updateUser` (`PUT /auth/user/:id`)** permite sobreescribir `userType`, `requestCount`, `verified`, etc. si el body los trae. **Nunca confíes en campos sensibles desde el cliente**; usar whitelist de campos actualizables (`name`, `lastName`, `photo`).
- **Misma ruta, dos significados**: `verifyAccount` usa `userId` del JWT, pero nada impide que un atacante con un JWT propio re-verifique su propio mail (bajo impacto, pero redundante).
- **Falta `helmet.hsts`** y `force HTTPS` en backend.

### A futuro

- **GDPR**: implementar derecho al olvido real (borrar submissions, logs, emails). Hoy `deleteUser` borra el User pero no su historial (que, de hecho, no se persiste: punto a favor).
- **Sin CSP report-uri** ni monitor de XSS.
- **Sin DKIM/SPF/DMARC propios** del dominio `excelso.xyz` para el From de los emails → mala deliverability y abre puerta a suplantación.
- **Logs no redactan PII** (email del visitante queda en `morgan` y en los logs del worker de Nodemailer).
- **No hay rate limit por `emailDestiny`** → un atacante con un solo `formToken` puede enviar miles de mails a un mismo destinatario.
- **No hay blacklist de emails / disposable email detection** en registro.
- **Abuse reporting pipeline** ausente.
- **Modelo de amenaza no documentado** (qué protegés, contra quién, hasta dónde).

---

## Recomendación inmediata priorizada

1. **Rotar secretos del `.env` y limpiar historial de git** (#1 urgente).
2. **Mover JWT a cookie httpOnly** y agregar rate limit + CAPTCHA en auth.
3. **Sanitizar HTML del email** y **vincular `formToken` ↔ dominio** para cortar el relay de phishing.
4. **Arreglar el bug de `deleteUser`** (mismatch front/back) y **unificar las dos rutas de verify**.
5. **Reemplazar Gmail por Resend/SES** antes de tener más de 100 usuarios activos.
6. **Cachear `formToken` y mover el envío a una cola** para sostener crecimiento.
7. **Modelar `Organization`** desde ya; aunque arranques single-tenant, dejar la FK lista en el schema evita una migración dolorosa.
