import type { Metadata } from "next";
import { generatePageMetadata } from "../metadata";

export const metadata: Metadata = generatePageMetadata({
  title: "E-commerce Shopify | Loja Online com IA Integrada",
  description: "Desenvolvimento de loja Shopify completa e personalizada com integração nativa de agentes de IA. Checkout otimizado, gestão automatizada e alta performance desde o primeiro dia.",
  path: "/ecommerce-shopify",
  keywords: [
    "Shopify",
    "e-commerce",
    "loja online",
    "Shopify Plus",
    "desenvolvimento e-commerce",
    "loja virtual",
    "vendas online",
  ],
});

export default function EcommerceShopifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

