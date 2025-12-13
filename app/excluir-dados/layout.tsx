import type { Metadata } from "next";
import { generatePageMetadata } from "../metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Exclusão de Dados | Solicitação de Remoção de Dados Pessoais",
  description: "Solicite a exclusão de seus dados pessoais. Denzer Digital — conformidade com LGPD e políticas da Meta. Envie sua solicitação para exclusão dos dados tratados.",
  path: "/excluir-dados",
  keywords: [
    "exclusão de dados",
    "LGPD",
    "direito ao esquecimento",
    "remoção de dados",
    "privacidade",
  ],
  robots: {
    index: true,
    follow: true,
  },
});

export default function ExcluirDadosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

