import type { CSSProperties } from "react";

interface EtherealDividerProps {
  dark?: boolean;
  style?: CSSProperties;
}

/**
 * EtherealDivider — 1px gradient separator between sections.
 * Uses --divider-ethereal (light) or --divider-ethereal-dark (dark backgrounds).
 * Decorative: role="separator" + aria-hidden so screen readers skip it.
 */
export default function EtherealDivider({ dark = false, style }: EtherealDividerProps) {
  return (
    <div
      role="separator"
      aria-hidden="true"
      className="ch-etherdiv"
      style={{
        height: 1,
        width: "100%",
        background: dark ? "var(--divider-ethereal-dark)" : "var(--divider-ethereal)",
        ...style,
      }}
    />
  );
}
