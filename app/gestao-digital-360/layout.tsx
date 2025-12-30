import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestão Estratégica do Ecossistema Digital | Denzer Digital",
  description: "A Denzer Digital unifica IA, tracking e automações em um ecossistema guiado por dados. Resultado: decisões mais rápidas, planos de ação claros, processos mais eficientes e vendas otimizadas de ponta a ponta.",
  keywords: [
    "gestão digital",
    "ecossistema digital",
    "estratégia digital",
    "consultoria digital",
    "transformação digital",
    "gestão 360",
    "growth marketing",
    "performance digital",
    "inteligência de dados",
    "automação empresarial",
    "denzer digital"
  ],
  openGraph: {
    title: "Gestão Estratégica do Ecossistema Digital | Denzer Digital",
    description: "Unificamos IA, tracking e automações em um ecossistema guiado por dados para decisões mais rápidas e vendas otimizadas.",
    type: "website",
    locale: "pt_BR",
    siteName: "Denzer Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gestão Estratégica do Ecossistema Digital | Denzer Digital",
    description: "Unificamos IA, tracking e automações em um ecossistema guiado por dados.",
  },
};

export default function GestaoDigital360Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
