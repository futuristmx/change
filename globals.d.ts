// Ambient declarations so side-effect style imports (`import "./globals.css"`)
// always type-check, independent of next-env.d.ts regeneration or dependency
// version bumps. Next.js normally provides these via its generated types, but
// declaring them here makes the build resilient to toolchain changes.
declare module "*.css";
declare module "*.scss";
