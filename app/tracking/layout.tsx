import type { Metadata } from "next";
import { generatePageMetadata } from "../metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Tracking e Analytics | Server-Side Tracking Anti-Bloqueio iOS 14+",
  description: "Recupere até 30% dos dados perdidos com Server-Side Tracking. Implementação de GTM Server-Side, CAPI (Conversion API) e Data Layer Avançado. Aumente sua Nota de Atribuição e reduza CPA em até 40%.",
  path: "/tracking",
  keywords: [
    "tracking server-side",
    "Server-Side Tracking",
    "GTM Server-Side",
    "Conversion API",
    "CAPI",
    "Meta CAPI",
    "Google Tag Manager",
    "GTM",
    "Google Analytics",
    "GA4",
    "iOS 14 tracking",
    "anti-bloqueio",
    "atribuição",
    "conversões",
    "analytics",
    "rastreamento",
    "redução CPA",
    "nota de atribuição",
  ],
});

export default function TrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

