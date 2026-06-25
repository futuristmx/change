/* Change DS — Badge.
   Tipográfico mono uppercase + dot semántico. Usa tokens --badge-{tone}-*.
   Sin hex crudos. Hereda --badge-text del theme (claro/oscuro). */
import type { ReactNode } from "react";

export type BadgeTone =
  | "violet"
  | "signal"
  | "success"
  | "opportunity"
  | "error"
  | "neutral";

interface BadgeProps {
  tone: BadgeTone;
  children: ReactNode;
  icon?: ReactNode;
  size?: "sm" | "md";
}

export default function Badge({ tone, children, icon, size = "sm" }: BadgeProps) {
  const padding = size === "md" ? "7px 13px" : "6px 10px";
  const fontSize = size === "md" ? 12 : 11;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding,
        background: `var(--badge-${tone}-bg)`,
        border: `1px solid var(--badge-${tone}-border)`,
        color: "var(--badge-text)",
        font: `600 ${fontSize}px/1.0 var(--font-mono)`,
        letterSpacing: ".12em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: `var(--badge-${tone}-dot)`,
          flexShrink: 0,
        }}
      />
      {icon && (
        <span aria-hidden="true" style={{ display: "inline-flex", alignItems: "center" }}>
          {icon}
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
