import type { Metadata } from "next";
import { generatePageMetadata } from "../metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Gestão Digital 360° | Estratégia, Mídia e Automação Baseadas em Dados",
  description: "Planejamento completo e execução de campanhas digitais com inteligência artificial. Gestão de mídia paga, automações de marketing e análise de dados em tempo real.",
  path: "/gestao-digital-360",
  keywords: [
    "gestão digital",
    "marketing digital",
    "mídia paga",
    "Meta Ads",
    "Google Ads",
    "RD Station",
    "automação de marketing",
    "performance marketing",
  ],
});

export default function GestaoDigital360Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

