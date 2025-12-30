import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agentes de IA | Denzer Digital",
  description:
    "Automatize Atendimento, Vendas e Backoffice com Agentes de IA. Transforme sua empresa em uma máquina autônoma de crescimento com funcionários digitais que trabalham 24/7.",
  keywords: [
    "agentes de ia",
    "inteligência artificial",
    "automação",
    "whatsapp business",
    "chatbot inteligente",
    "atendimento automatizado",
    "vendas automatizadas",
    "backoffice",
    "business intelligence",
    "ia conversacional"
  ],
};

export default function AgentesDeIaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
