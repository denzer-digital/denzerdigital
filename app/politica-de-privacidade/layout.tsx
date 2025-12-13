import type { Metadata } from "next";
import { generatePageMetadata } from "../metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Política de Privacidade | Denzer Digital",
  description: "Política de privacidade da Denzer Digital. Informações sobre coleta, uso e proteção de dados pessoais em conformidade com a LGPD.",
  path: "/politica-de-privacidade",
  keywords: [
    "política de privacidade",
    "LGPD",
    "privacidade",
    "proteção de dados",
    "dados pessoais",
  ],
  robots: {
    index: true,
    follow: true,
  },
});

export default function PoliticaPrivacidadeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

