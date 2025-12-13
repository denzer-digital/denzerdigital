import type { Metadata } from "next";
import { generatePageMetadata } from "../metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "Facebook Login | Integração com Facebook",
  description: "Página de integração e login com Facebook para serviços da Denzer Digital.",
  path: "/facebook",
  keywords: [
    "Facebook",
    "login",
    "integração Facebook",
    "Meta",
  ],
});

export default function FacebookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

