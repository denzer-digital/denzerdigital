import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automação e Integrações Inteligentes",
  description: "Otimize processos e reduza erros com automação baseada em dados. A Denzer Digital integra todas as suas plataformas em um único fluxo inteligente.",
  keywords: [
    "automação de processos",
    "integração de sistemas",
    "automação inteligente",
    "integração CRM",
    "integração ERP",
    "integração e-commerce",
    "automação de vendas",
    "sincronização de dados",
    "fluxos automatizados",
    "redução de erros",
  ],
  openGraph: {
    title: "Automação e Integrações Inteligentes | Denzer Digital",
    description: "Otimize processos e reduza erros com automação baseada em dados. Integre todas as suas plataformas em um único fluxo inteligente.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automação e Integrações Inteligentes | Denzer Digital",
    description: "Otimize processos e reduza erros com automação baseada em dados. Integre todas as suas plataformas em um único fluxo inteligente.",
  },
};

export default function AutomacaoIntegracoesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

