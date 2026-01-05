"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formatPhone, unformatPhone } from "@/lib/phoneFormatter";

// Declaração de tipo para o RD Station
declare global {
  interface Window {
    RDCaptureForms?: {
      init: () => void;
    };
    reinitRDStation?: () => boolean;
  }
}
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Send, CheckCircle2, Mail, Phone } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().refine((val) => {
    const numbers = unformatPhone(val);
    return numbers.length >= 10 && numbers.length <= 11;
  }, "Telefone inválido (deve ter 10 ou 11 dígitos)"),
  company: z.string().optional(),
  service: z.string().min(1, "Selecione um serviço"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const contentAnimation = useScrollAnimation();
  const formAnimation = useScrollAnimation();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
    },
  });

  // Inicializa o RD Station quando o formulário estiver visível
  useEffect(() => {
    if (typeof window === "undefined" || !formAnimation.isVisible) return;

    // Verifica se está no domínio permitido
    const hostname = window.location.hostname;
    const allowedDomain = 'denzerdigital.com.br';
    if (hostname !== allowedDomain && !hostname.endsWith('.' + allowedDomain)) {
      return; // Não inicializa RD Station em domínios não permitidos
    }

    const initRDStation = () => {
      // Verifica se o formulário está no DOM
      const formElement = document.getElementById('0002');
      if (!formElement) {
        return false;
      }

      if (window.RDCaptureForms) {
        try {
          window.RDCaptureForms.init();
          console.log("RD Station Forms inicializado no formulário fixo - Form ID: 0002");
          return true;
        } catch (error) {
          console.warn("Erro ao inicializar RD Station Forms:", error);
          return false;
        }
      }
      return false;
    };

    // Usa a função global se disponível
    if (typeof window.reinitRDStation === 'function') {
      setTimeout(() => {
        window.reinitRDStation?.();
      }, 500);
    } else {
      // Aguarda o script carregar
      const checkInterval = setInterval(() => {
        if (window.RDCaptureForms) {
          initRDStation();
          clearInterval(checkInterval);
        }
      }, 100);

      const timeout = setTimeout(() => {
        clearInterval(checkInterval);
      }, 5000);

      return () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
      };
    }
  }, [formAnimation.isVisible]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Aqui você pode integrar com o webhook ou API
      // Por enquanto, apenas simula o envio
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Formulário enviado:", data);
      
      // Simula sucesso
      setIsSuccess(true);
      
      // Reseta o formulário após 3 segundos
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Content */}
            <div ref={contentAnimation.ref} className={`space-y-6 scroll-fade-in-left ${contentAnimation.isVisible ? 'visible' : ''}`}>
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Entre em <span className="text-gradient-primary">contato</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Preencha o formulário ao lado e nossa equipe entrará em contato em breve para entender suas necessidades e apresentar a melhor solução.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">E-mail</h3>
                    <p className="text-sm text-muted-foreground">comercial@denzerdigital.com.br</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Telefone</h3>
                    <p className="text-sm text-muted-foreground">(41) 99194-4761</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div ref={formAnimation.ref} className={`relative scroll-fade-in-right ${formAnimation.isVisible ? 'visible' : ''}`}>
              <div className="rounded-2xl bg-card border border-border p-8 shadow-2xl">
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                      <CheckCircle2 className="h-10 w-10 text-primary" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        Mensagem enviada com sucesso!
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Entraremos em contato em breve.
                      </p>
                    </div>
                  </div>
                ) : (
                  <Form {...form}>
                    <form 
                      id="0002"
                      onSubmit={form.handleSubmit(onSubmit)} 
                      className="space-y-6"
                      data-rd-form="0002"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome completo *</FormLabel>
                              <FormControl>
                                <Input
                                  id="nome"
                                  placeholder="Seu nome"
                                  {...field}
                                  data-rd="name"
                                  className="bg-background/50 border-input/50 focus:border-primary/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-mail *</FormLabel>
                              <FormControl>
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="seu@email.com"
                                  {...field}
                                  data-rd="email"
                                  className="bg-background/50 border-input/50 focus:border-primary/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefone *</FormLabel>
                              <FormControl>
                                <Input
                                  id="telefone"
                                  type="tel"
                                  placeholder="(00) 00000-0000"
                                  {...field}
                                  data-rd="phone"
                                  className="bg-background/50 border-input/50 focus:border-primary/50"
                                  value={field.value ? formatPhone(field.value) : ''}
                                  onChange={(e) => {
                                    const formatted = formatPhone(e.target.value);
                                    field.onChange(formatted);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Empresa</FormLabel>
                              <FormControl>
                                <Input
                                  id="empresa"
                                  placeholder="Nome da empresa (opcional)"
                                  {...field}
                                  data-rd="company"
                                  className="bg-background/50 border-input/50 focus:border-primary/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Serviço de interesse *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger 
                                  id="servico"
                                  className="bg-background/50 border-input/50 focus:border-primary/50"
                                  data-rd="service"
                                  aria-label="Selecione um serviço de interesse"
                                >
                                  <SelectValue placeholder="Selecione um serviço" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="agentes-de-ia">Agentes de IA</SelectItem>
                                <SelectItem value="automacao-integracoes">Automações e Integrações</SelectItem>
                                <SelectItem value="gestao-digital-360">Gestão Digital 360°</SelectItem>
                                <SelectItem value="tracking">Tracking e Análise</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Selecione o serviço que mais se adequa à sua necessidade.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        id="btn-submit"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary/90 glow-primary group"
                        size="lg"
                        data-rd="submit"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            Enviar mensagem
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

