"use client";

import { useLayoutEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Quem somos",
    items: [
      "Denzer Digital LTDA — CNPJ 54.231.176/0001-83.",
      "Empresa de tecnologia focada em automação, integrações, IA aplicada, comunicação digital e operação de dados.",
      "Contato oficial de privacidade: privacidade@denzerdigital.com.br.",
    ],
  },
  {
    title: "Dados coletados",
    items: [
      "Dados fornecidos diretamente: nome, telefone, e-mail, empresa e informações enviadas em formulários ou atendimentos.",
      "Dados coletados automaticamente: IP e dados técnicos, cookies essenciais e logs necessários ao funcionamento das integrações.",
      "Dados processados para clientes: leads, históricos de conversas, eventos e interações em automações, sempre pertencentes ao cliente.",
    ],
  },
  {
    title: "Finalidade do uso dos dados",
    items: [
      "Executar automações e integrações solicitadas pelo cliente.",
      "Processar contatos e atendimentos via sistemas conectados.",
      "Operar chatbots, fluxos de qualificação e agentes de IA.",
      "Integrar CRMs, WhatsApp, Meta e serviços externos.",
      "Emitir relatórios e análises necessárias ao cliente. Nunca usamos dados para marketing próprio sem permissão ou para finalidades não autorizadas.",
    ],
  },
  {
    title: "Tratamento em nome dos clientes (Meta)",
    items: [
      "Agimos como operadora: tratamos dados apenas conforme instruções do cliente, que é o controlador.",
      "Não reutilizamos, enriquecemos, vendemos ou compartilhamos dados entre clientes.",
      "Não tomamos decisões autônomas sobre dados nem iniciamos usos fora do escopo contratado.",
    ],
  },
  {
    title: "Conformidade com Meta e WhatsApp Business API",
    items: [
      "Seguimos Meta Business Terms, WhatsApp Business Terms, Data Protection Addendums e requisitos de Tech Providers.",
      "Não enviamos mensagens não solicitadas, não usamos dados da API para benefícios próprios, não armazenamos além do necessário e não treinamos IA externa com conversas.",
    ],
  },
  {
    title: "Compartilhamento de dados",
    items: [
      "Somente com plataformas necessárias à execução do serviço (Meta, WhatsApp, CRMs, automação, hospedagem) e fornecedores essenciais de infraestrutura.",
      "Sempre restrito ao mínimo necessário e nunca para fins comerciais externos.",
    ],
  },
  {
    title: "Segurança e proteção",
    items: [
      "Armazenamento seguro em servidores criptografados e ambientes segregados por cliente.",
      "Controles de acesso, logs e auditorias; não retenção de dados desnecessários.",
      "Compromisso com sigilo, integridade e disponibilidade das informações.",
    ],
  },
  {
    title: "Retenção e exclusão",
    items: [
      "Manutenção apenas pelo tempo necessário à execução do serviço, obrigações legais ou auditorias exigidas pelas plataformas integradas.",
      "Após o período, dados são excluídos ou anonimizados.",
    ],
  },
  {
    title: "Cookies",
    items: [
      "Uso de cookies essenciais e analíticos mínimos, não invasivos.",
      "Você pode ajustar permissões de cookies no navegador a qualquer momento.",
    ],
  },
  {
    title: "Direitos do titular",
    items: [
      "Solicitar acesso, correção, exclusão, portabilidade e informações sobre uso.",
      "Revogar consentimentos e gerenciar preferências de comunicação.",
      "Canal: privacidade@denzerdigital.com.br. Para solicitar exclusão de dados, acesse nossa página dedicada.",
    ],
  },
  {
    title: "Alterações nesta política",
    items: [
      "Podemos atualizar este documento por motivos legais, técnicos ou operacionais.",
      "A versão mais recente estará sempre disponível nesta página.",
    ],
  },
  {
    title: "Contato",
    items: [
      "Para dúvidas ou solicitações: privacidade@denzerdigital.com.br.",
      "Canal adicional: contato@denzerdigital.com.br.",
      "Última atualização: 11/12/2025.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  // Garante que a página comece no topo
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-primary/10 via-background to-background pt-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute right-0 top-12 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
              Transparência e proteção de dados
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Política de <span className="text-gradient-primary">Privacidade</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Política em conformidade com a LGPD e requisitos de tecnologia da Meta.
              Explicamos como tratamos, armazenamos e protegemos dados em nossas integrações
              (WhatsApp Business API, Meta, CRMs e fluxos automatizados).
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/">Voltar para a página inicial</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/40 hover:border-primary">
                <a href="mailto:privacidade@denzerdigital.com.br">Falar com o time de privacidade</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-border bg-card/80 p-8 shadow-lg shadow-primary/5 backdrop-blur"
            >
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                {section.items.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary/70 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2 max-w-2xl">
              <h3 className="text-2xl font-semibold">Dúvidas ou solicitações?</h3>
              <p className="text-muted-foreground">
                Estamos prontos para apoiar você em qualquer demanda relacionada a privacidade,
                governança e proteção de dados.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/excluir-dados">Solicitar exclusão de dados</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary/40 hover:border-primary">
                <Link href="/">Retornar ao site</Link>
              </Button>
              <Button asChild variant="outline" className="border-primary/40 hover:border-primary">
                <a href="mailto:privacidade@denzerdigital.com.br">Enviar um e-mail</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

