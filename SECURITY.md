# Política de Seguridad — Change Web

## Reporte de vulnerabilidades

Si encuentras una vulnerabilidad de seguridad, repórtala de forma responsable a
**andres@change.live**. No abras un issue público. Responderemos en un plazo
razonable y coordinaremos la divulgación.

## Postura de seguridad del proyecto

Este sitio se construye con seguridad desde el primer commit.

### Cabeceras HTTP (en `next.config.ts`)
- **Content-Security-Policy** — deny por defecto, allow explícito por directiva.
- **Strict-Transport-Security** — HSTS con `preload`.
- **X-Frame-Options: DENY** + `frame-ancestors 'none'` — anti-clickjacking.
- **X-Content-Type-Options: nosniff**.
- **Referrer-Policy: strict-origin-when-cross-origin**.
- **Permissions-Policy** — cámara, micrófono, geolocalización y topics deshabilitados.
- **Cross-Origin-Opener-Policy: same-origin**.
- `poweredByHeader: false` — no exponemos la tecnología del servidor.

### Manejo de secretos
- Ningún secreto vive en el repositorio. `.gitignore` excluye `.env*`, llaves y credenciales.
- Variables de entorno requeridas (configurar en `.env.local` local y en Vercel):

  | Variable | Ámbito | Notas |
  |----------|--------|-------|
  | `NEXT_PUBLIC_SUPABASE_URL` | cliente | pública |
  | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | cliente | pública (RLS obligatorio) |
  | `SUPABASE_SERVICE_ROLE_KEY` | **servidor** | SECRETA — jamás en el cliente |
  | `NEXT_PUBLIC_SITE_URL` | cliente | URL canónica |

- La `service_role` key solo se usa en código de servidor (Route Handlers / Server Actions).

### Datos y formularios
- Toda entrada de usuario se valida con **Zod** antes de procesarse.
- Supabase con **Row Level Security (RLS)** activado en todas las tablas.
- Sin PII en logs ni en el cliente.

### Dependencias
- `dependabot` activo (`.github/dependabot.yml`) para parches de seguridad.
- `npm audit` en cada PR.

## Datos persistidos en producción
NUNCA resetear, sobrescribir ni borrar datos de producción sin confirmación explícita.
