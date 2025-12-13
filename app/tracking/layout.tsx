import type { Metadata } from "next";
import { generatePageMetadata } from "../metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Tracking e Analytics | Rastreamento de Conversões e Eventos",
  description: "Rastreamento completo de conversões e eventos com integração GTM, GA4, Meta Ads e Google Ads. Análise de jornada do cliente em múltiplos canais com relatórios em tempo real.",
  path: "/tracking",
  keywords: [
    "tracking",
    "Google Tag Manager",
    "GTM",
    "Google Analytics",
    "GA4",
    "Meta Pixel",
    "conversões",
    "analytics",
    "rastreamento",
  ],
});

export default function TrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

