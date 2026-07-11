#!/usr/bin/env bash
# Preflight estándar — change-web (instalado on-touch 2026-07-11)
# Orden fail-fast: lint del código que embarca → typecheck estricto → build de producción.
# Veredicto final explícito. Este gate no se rodea: sin PREFLIGHT ✓ no hay "listo", ni cierre
# de sprint, ni PR. Estándar completo: Ecosistema/PREFLIGHT-ESTANDAR.md
set -uo pipefail

cd "$(dirname "$0")"

fail() {
  echo ""
  echo "PREFLIGHT ✗ — falló: $1"
  exit 1
}

echo "── [1/3] Lint (next lint) ──────────────────────────"
npm run lint || fail "lint"

echo "── [2/3] Typecheck (tsc --noEmit, strict) ──────────"
npm run typecheck || fail "typecheck"

echo "── [3/3] Build de producción (next build) ──────────"
npm run build || fail "build"

echo ""
echo "PREFLIGHT ✓"
