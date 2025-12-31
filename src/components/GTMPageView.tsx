"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, any>>;
  }
}

/**
 * Componente que monitora mudanças de rota no Next.js e dispara
 * eventos de pageview no GTM para rastreamento correto em SPAs.
 * 
 * Este componente resolve o problema de pageviews não dispararem
 * em aplicações Next.js com roteamento client-side (SPA).
 */
export function GTMPageView() {
  const pathname = usePathname();

  useEffect(() => {
    // Aguarda o GTM estar pronto
    if (typeof window === "undefined" || !window.dataLayer) {
      return;
    }

    // Constrói a URL completa incluindo query params
    const url = pathname + (window.location.search || "");

    // Dispara o evento de pageview no dataLayer do GTM
    // Este evento pode ser capturado no GTM através de um trigger
    // configurado para o evento "pageview"
    window.dataLayer.push({
      event: "pageview",
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}

