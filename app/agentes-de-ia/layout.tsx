import type { Metadata } from "next";
import { generatePageMetadata } from "../metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Agentes de IA | Atendimento Automatizado com Inteligência Artificial",
  description: "Atendimento automatizado via WhatsApp, site e redes sociais com agentes de IA que aprendem continuamente. Qualificação automática de leads e transferência inteligente para humanos.",
  path: "/agentes-de-ia",
  keywords: [
    "agentes de IA",
    "chatbot",
    "WhatsApp Business",
    "atendimento automatizado",
    "inteligência artificial",
    "assistente virtual",
    "automação de atendimento",
  ],
});

export default function AgentesDeIaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

