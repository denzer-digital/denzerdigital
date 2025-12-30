import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Automação e Integrações Inteligentes | Denzer Digital",
  description: "Otimize processos e reduza erros com automação baseada em dados. A Denzer Digital integra todas as suas plataformas em um único fluxo inteligente, gerando mais inteligência para o seu ecossistema e garantindo operações mais ágeis e precisas.",
  keywords: [
    "automação",
    "integrações",
    "API",
    "webhooks",
    "n8n",
    "make",
    "zapier",
    "integração de sistemas",
    "automação de processos",
    "fluxos automatizados",
    "CRM",
    "ERP",
    "marketing automation",
    "denzer digital"
  ],
  openGraph: {
    title: "Automação e Integrações Inteligentes | Denzer Digital",
    description: "Otimize processos e reduza erros com automação baseada em dados. Integre todas as suas plataformas em um único fluxo inteligente.",
    type: "website",
    locale: "pt_BR",
    siteName: "Denzer Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automação e Integrações Inteligentes | Denzer Digital",
    description: "Otimize processos e reduza erros com automação baseada em dados.",
  },
};

export default function AutomacaoIntegracoesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
