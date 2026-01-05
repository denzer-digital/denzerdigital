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
    RdstationFormsIntegration?: {
      Integration: {
        integrateAll: (token: string) => void;
      };
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
import { injectUTMsIntoForm } from "@/lib/utmHelper";

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

  // Inicializa o RD Station quando o formulário estiver visível ou quando o componente montar
  useEffect(() => {
    if (typeof window === "undefined") return;

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
        console.warn("Formulário 0002 não encontrado no DOM para inicialização do RD Station");
        return false;
      }

      // Verifica se todos os campos necessários estão presentes
      const nomeField = document.getElementById('nome');
      const emailField = document.getElementById('email');
      const telefoneField = document.getElementById('telefone');
      
      if (!nomeField || !emailField || !telefoneField) {
        console.warn("Alguns campos do formulário 0002 não foram encontrados no DOM");
        return false;
      }

      const token = '02b269cd38a50b7180df773a81bf966c';
      
      // Usa o método recomendado: RdstationFormsIntegration.Integration.integrateAll
      if (window.RdstationFormsIntegration && window.RdstationFormsIntegration.Integration) {
        try {
          window.RdstationFormsIntegration.Integration.integrateAll(token);
          console.log("RD Station integração forçada no formulário fixo - Form ID: 0002");
          console.log("Formulário encontrado:", formElement);
          console.log("Campos encontrados:", { nome: nomeField, email: emailField, telefone: telefoneField });
          return true;
        } catch (error) {
          console.warn("Erro ao integrar RD Station via integrateAll:", error);
        }
      }
      
      // Fallback para o método antigo
      if (window.RDCaptureForms) {
        try {
          window.RDCaptureForms.init();
          console.log("RD Station Forms inicializado no formulário fixo (fallback) - Form ID: 0002");
          return true;
        } catch (error) {
          console.warn("Erro ao inicializar RD Station Forms:", error);
          return false;
        }
      } else {
        console.warn("window.RDCaptureForms não está disponível");
        return false;
      }
    };

    // Função para tentar inicializar
    const tryInit = () => {
      // Usa a função global se disponível
      if (typeof window.reinitRDStation === 'function') {
        window.reinitRDStation();
      } else {
        // Tenta inicializar diretamente
        initRDStation();
      }
    };

    // Função para garantir que o formulário está no DOM e o script carregou antes de inicializar
    const ensureFormAndInit = (maxRetries = 50) => {
      const formElement = document.getElementById('0002');
      if (!formElement) {
        // Se o formulário ainda não estiver no DOM e ainda houver tentativas, tenta novamente
        if (maxRetries > 0) {
          setTimeout(() => ensureFormAndInit(maxRetries - 1), 200);
        }
        return;
      }

      // Formulário está no DOM, agora verifica se o script do RD Station carregou
      if (window.RDCaptureForms) {
        tryInit();
      } else if (maxRetries > 0) {
        // Script ainda não carregou, tenta novamente
        setTimeout(() => ensureFormAndInit(maxRetries - 1), 200);
      }
    };

    // Aguarda o DOM estar pronto antes de tentar inicializar
    const startInit = () => {
      // Se o script já estiver carregado, tenta inicializar imediatamente
      if (window.RDCaptureForms) {
        setTimeout(() => ensureFormAndInit(), 300);
      } else {
        // Aguarda o script carregar
        const checkInterval = setInterval(() => {
          if (window.RDCaptureForms) {
            clearInterval(checkInterval);
            ensureFormAndInit();
          }
        }, 100);

        // Limpa o intervalo após 10 segundos
        const timeout = setTimeout(() => {
          clearInterval(checkInterval);
          // Tenta uma última vez mesmo se o script não tiver carregado
          if (window.RDCaptureForms) {
            ensureFormAndInit();
          }
        }, 10000);

        return () => {
          clearInterval(checkInterval);
          clearTimeout(timeout);
        };
      }
    };

    // Inicia a inicialização quando o DOM estiver pronto
    let cleanup: (() => void) | undefined;
    
    if (document.readyState === 'loading') {
      const handler = () => {
        cleanup = startInit();
      };
      document.addEventListener('DOMContentLoaded', handler);
      return () => {
        document.removeEventListener('DOMContentLoaded', handler);
        if (cleanup) cleanup();
      };
    } else {
      // DOM já está pronto
      cleanup = startInit();
      return cleanup;
    }
  }, []); // Executa apenas uma vez quando o componente monta

  // Reinicializa quando o formulário fica visível (para garantir que captura após scroll)
  useEffect(() => {
    if (typeof window === "undefined" || !formAnimation.isVisible) return;

    // Verifica se está no domínio permitido
    const hostname = window.location.hostname;
    const allowedDomain = 'denzerdigital.com.br';
    if (hostname !== allowedDomain && !hostname.endsWith('.' + allowedDomain)) {
      return;
    }

    // Reinicializa quando fica visível para garantir captura
    const token = '02b269cd38a50b7180df773a81bf966c';
    
    if (typeof window.reinitRDStation === 'function') {
      setTimeout(() => {
        window.reinitRDStation?.();
      }, 500);
    } else if (window.RdstationFormsIntegration && window.RdstationFormsIntegration.Integration) {
      setTimeout(() => {
        try {
          window.RdstationFormsIntegration.Integration.integrateAll(token);
          console.log("RD Station integração forçada quando formulário ficou visível - Form ID: 0002");
        } catch (error) {
          console.warn("Erro ao integrar RD Station:", error);
        }
      }, 500);
    } else if (window.RDCaptureForms) {
      setTimeout(() => {
        try {
          window.RDCaptureForms.init();
          console.log("RD Station Forms reinicializado quando formulário ficou visível (fallback) - Form ID: 0002");
        } catch (error) {
          console.warn("Erro ao reinicializar RD Station Forms:", error);
        }
      }, 500);
    }
  }, [formAnimation.isVisible]);

  // Adiciona um listener de submit diretamente no formulário para garantir captura do RD
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hostname = window.location.hostname;
    const allowedDomain = 'denzerdigital.com.br';
    if (hostname !== allowedDomain && !hostname.endsWith('.' + allowedDomain)) {
      return;
    }

    // Aguarda o formulário estar no DOM
    const ensureFormAndAddListener = (maxRetries = 20) => {
      const formElement = document.getElementById('0002');
      if (!formElement) {
        if (maxRetries > 0) {
          setTimeout(() => ensureFormAndAddListener(maxRetries - 1), 200);
        }
        return;
      }

      // Listener que garante que o RD Station processe antes de qualquer preventDefault
      const handleSubmitForRD = (e: Event) => {
        // Injeta UTMs no formulário ANTES de processar
        const formElement = e.target as HTMLFormElement;
        if (formElement) {
          injectUTMsIntoForm(formElement);
        }

        // Este listener é executado ANTES do nosso handler no onSubmit
        // Então o RD Station já tem chance de capturar aqui
        const token = '02b269cd38a50b7180df773a81bf966c';
        
        // Usa o método recomendado primeiro
        if (window.RdstationFormsIntegration && window.RdstationFormsIntegration.Integration) {
          try {
            window.RdstationFormsIntegration.Integration.integrateAll(token);
            console.log("RD Station integração forçada via listener de submit (capture) - Form ID: 0002");
          } catch (error) {
            console.warn("Erro ao integrar RD Station no listener:", error);
          }
        } else if (window.RDCaptureForms) {
          try {
            window.RDCaptureForms.init();
            console.log("RD Station Forms processado via listener de submit (capture, fallback) - Form ID: 0002");
          } catch (error) {
            console.warn("Erro ao processar RD Station no listener:", error);
          }
        }
      };

      // Adiciona o listener com capture: true para executar ANTES de outros listeners
      formElement.addEventListener('submit', handleSubmitForRD, { capture: true });

      return () => {
        formElement.removeEventListener('submit', handleSubmitForRD, { capture: true });
      };
    };

    // Inicia a verificação
    const cleanup = ensureFormAndAddListener();
    return cleanup;
  }, []); // Executa quando o componente monta

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // IMPORTANTE: O RD Station captura o evento submit ANTES do preventDefault
    // Então ele já capturou os dados quando chegamos aqui
    // Apenas garantimos que está inicializado
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      const allowedDomain = 'denzerdigital.com.br';
      if ((hostname === allowedDomain || hostname.endsWith('.' + allowedDomain)) && window.RDCaptureForms) {
        try {
          // Reinicializa o RD Station para garantir que capturou
          window.RDCaptureForms.init();
          console.log("RD Station Forms reinicializado - Form ID: 0002");
        } catch (error) {
          console.warn("Erro ao reinicializar RD Station:", error);
        }
      }
    }
    
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
                      name="form-0002"
                      method="POST"
                      action="#"
                      onSubmit={async (e) => {
                        // IMPORTANTE: Injeta UTMs ANTES de qualquer outra coisa
                        const formElement = e.currentTarget;
                        injectUTMsIntoForm(formElement);

                        // Valida os campos primeiro
                        const isValid = await form.trigger();
                        
                        if (!isValid) {
                          e.preventDefault();
                          e.stopPropagation();
                          return;
                        }
                        
                        // CRÍTICO: O RD Station escuta o evento submit através de event listeners
                        // que são adicionados quando init() é chamado. Esses listeners são executados
                        // ANTES do nosso handler fazer preventDefault, então o RD já capturou.
                        // Mas para garantir, vamos chamar init() antes de processar.
                        
                        const formData = form.getValues();
                        
                        // Garante que o RD Station está inicializado e processa o formulário
                        const token = '02b269cd38a50b7180df773a81bf966c';
                        
                        if (typeof window !== "undefined") {
                          try {
                            // Usa o método recomendado primeiro
                            if (window.RdstationFormsIntegration && window.RdstationFormsIntegration.Integration) {
                              window.RdstationFormsIntegration.Integration.integrateAll(token);
                              console.log("RD Station integração forçada no submit - Form ID: 0002");
                            } else if (window.RDCaptureForms) {
                              // Fallback para o método antigo
                              window.RDCaptureForms.init();
                              console.log("RD Station Forms processado no submit (fallback) - Form ID: 0002");
                            }
                            
                            // Aguarda um pouco para garantir que o RD processou
                            await new Promise(resolve => setTimeout(resolve, 150));
                          } catch (error) {
                            console.warn("Erro ao processar RD Station:", error);
                          }
                        }
                        
                        // Previne o submit nativo (o RD já capturou neste ponto)
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Processa o formulário
                        onSubmit(formData);
                      }} 
                      className="space-y-6"
                      data-rd-form="0002"
                      noValidate
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
                                  name="name"
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
                                  name="email"
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
                                  name="phone"
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
                                  name="company"
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
                            <FormControl>
                              <>
                                {/* Input hidden para o RD Station capturar o valor do serviço */}
                                <input
                                  type="hidden"
                                  id="servico"
                                  name="service"
                                  value={field.value || ''}
                                  data-rd="service"
                                />
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <SelectTrigger 
                                    className="bg-background/50 border-input/50 focus:border-primary/50"
                                    aria-label="Selecione um serviço de interesse"
                                  >
                                    <SelectValue placeholder="Selecione um serviço" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="agentes-de-ia">Agentes de IA</SelectItem>
                                    <SelectItem value="automacao-integracoes">Automações e Integrações</SelectItem>
                                    <SelectItem value="gestao-digital-360">Gestão Digital 360°</SelectItem>
                                    <SelectItem value="tracking">Tracking e Análise</SelectItem>
                                  </SelectContent>
                                </Select>
                              </>
                            </FormControl>
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

