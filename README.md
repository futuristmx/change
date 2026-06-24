# Change — Web

Sitio corporativo de **Change** · Inteligencia estratégica serena para decisiones complejas.

> La claridad no aparece. Se diseña.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4**
- **Motion** (animaciones / scroll reveals)
- **Zod** (validación de formularios, cliente + servidor)
- **Supabase** (Fase 2 — Field Notes / formularios)
- Deploy en **Vercel**

## Design System

Change UI DS — tokens en [`styles/ds/tokens/`](styles/ds/tokens) (color, tipografía,
spacing, elevación, gradientes, motion, iconos). Tipografía **Postea** auto-hospedada
(`public/fonts/`), **BD Orange Variable** (Typekit) y **IBM Plex Mono** (Google).
Geometría sharp (radius 0), violeta `#6D3BFF` como firma, dominante claro.

## Desarrollo

```bash
npm install
# crea .env.local con las variables documentadas en SECURITY.md
npm run dev
```

Scripts: `dev` · `build` · `start` · `lint` · `typecheck`.

## Estructura

```
app/                 rutas (App Router) + globals.css + api/
components/           Header, Footer, Reveal, widgets interactivos, ContactForm
lib/                  esquemas Zod compartidos
styles/ds/tokens/     tokens del Design System (CSS)
public/fonts|assets/  Postea + logos/SVG de marca
```

## Seguridad

Ver [SECURITY.md](SECURITY.md). Cabeceras CSP/HSTS en `next.config.ts`, secretos fuera
del repo, validación Zod en todo input, dependabot + CI activos.

## Páginas (V1)

Home · Capacidades (Método) · Mission Control · Equipo · Field Notes · Casos (Decisiones) · Contacto.
Las páginas internas tienen hero real; el contenido completo se porta en Fase 2.

---
© 2026 Change · Inteligencia estratégica · México
