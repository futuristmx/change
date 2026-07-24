"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * StickyCta — barra inferior mobile (<=768px) con CTA primario.
 * Se oculta cuando el footer entra en viewport (no estorbar contacto principal)
 * y completamente en /contacto (el usuario ya está en la experiencia de CTA).
 * Respeta safe-area-inset-bottom (iOS).
 */
export default function StickyCta() {
  const [footerVisible, setFooterVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const footers = document.querySelectorAll("footer");
    const footer = footers[footers.length - 1];
    if (!footer) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setFooterVisible(entry.isIntersecting);
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  // Oculto en /contacto — el usuario ya está en la experiencia principal de CTA
  if (pathname === "/contacto") return null;

  return (
    <div
      className="ch-sticky-cta"
      data-footer-visible={footerVisible ? "true" : "false"}
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        background: "rgba(255,255,255,.96)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        backgroundImage: "var(--divider-ethereal)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 1px",
        backgroundPosition: "top",
        paddingTop: 10,
        paddingBottom: "calc(10px + env(safe-area-inset-bottom, 0px))",
        paddingLeft: 16,
        paddingRight: 16,
        gap: 12,
        alignItems: "center",
      }}
    >
      <Link
        href="/contacto"
        className="btn btn-primary"
        style={{ flex: 1, minHeight: 44, height: 44, fontSize: 15 }}
      >
        Iniciar la conversación
      </Link>
      <style>{`
        .ch-sticky-cta { display: none; }
        @media (max-width: 768px) {
          .ch-sticky-cta { display: flex; }
          .ch-sticky-cta[data-footer-visible="true"] { display: none; }
        }
      `}</style>
    </div>
  );
}
