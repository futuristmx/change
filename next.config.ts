import type { NextConfig } from "next";

/**
 * Content Security Policy — restrictive baseline.
 * - default deny, explicit allow per directive
 * - fonts: self-hosted (Postea) + Adobe Typekit (BD Orange) + Google Fonts (IBM Plex Mono)
 * - styles: 'unsafe-inline' required for ported inline styles + Next runtime
 * - connect: self + Supabase (set NEXT_PUBLIC_SUPABASE_URL host when wired)
 */
const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin
  : "";

const csp = [
  `default-src 'self'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'none'`,
  `object-src 'none'`,
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}`,
  `style-src 'self' 'unsafe-inline' https://use.typekit.net https://fonts.googleapis.com`,
  `font-src 'self' https://use.typekit.net https://fonts.gstatic.com data:`,
  `img-src 'self' data: blob:`,
  `connect-src 'self' https://use.typekit.net https://fonts.googleapis.com https://fonts.gstatic.com ${supabaseHost}`.trim(),
  `manifest-src 'self'`,
  `upgrade-insecure-requests`,
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the tracing root to this app (the ecosystem has other lockfiles above).
  outputFileTracingRoot: __dirname,
  // Lint runs in CI (.github/workflows/ci.yml); don't block production builds on it.
  eslint: { ignoreDuringBuilds: true },
  // TypeScript stays strict — type errors DO block the build.
  typescript: { ignoreBuildErrors: false },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // 301/302 de rutas heredadas → rutas vigentes (evita 404 silenciosos).
  async redirects() {
    return [
      { source: "/services", destination: "/capacidades", permanent: true },
      { source: "/projects", destination: "/casos", permanent: true },
      { source: "/about", destination: "/equipo", permanent: true },
      { source: "/contact", destination: "/contacto", permanent: true },
      { source: "/signals", destination: "/#metodo", permanent: false },
    ];
  },
};

export default nextConfig;
