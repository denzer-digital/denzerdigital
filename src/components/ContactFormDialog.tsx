import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { formatPhone, unformatPhone } from "@/lib/phoneFormatter";
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
import { useContactDialog } from "@/contexts/ContactDialogContext";
import { Loader2, Send, CheckCircle2, X } from "lucide-react";

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

const ContactFormDialog = () => {
  const { isOpen, closeDialog } = useContactDialog();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Previne scroll do body quando o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Fecha o modal ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeDialog();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeDialog]);

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

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Aqui você pode integrar com o webhook ou API
      // Por enquanto, apenas simula o envio
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Formulário enviado:", data);
      
      // Simula sucesso
      setIsSuccess(true);
      
      // Reseta o formulário após 2 segundos e fecha o dialog
      setTimeout(() => {
        form.reset();
        setIsSuccess(false);
        closeDialog();
      }, 2000);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      onClick={(e) => {
        // Fecha ao clicar no overlay
        if (e.target === e.currentTarget) {
          closeDialog();
        }
      }}
    >
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in-0"
        onClick={closeDialog}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div className="relative z-50 w-full max-w-[600px] bg-gradient-to-br from-card via-card to-card/95 border border-primary/20 rounded-lg shadow-2xl animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="space-y-1">
            <h2 id="dialog-title" className="text-3xl font-bold text-gradient-primary">
              Entre em contato
            </h2>
            <p id="dialog-description" className="text-base text-muted-foreground">
              Preencha o formulário abaixo e nossa equipe entrará em contato em breve.
            </p>
          </div>
          <button
            onClick={closeDialog}
            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            aria-label="Fechar diálogo"
            aria-describedby="dialog-title"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4" role="status" aria-live="polite" aria-atomic="true">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center" aria-hidden="true">
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
              id="contact-form"
              onSubmit={form.handleSubmit(onSubmit)} 
              className="space-y-6 mt-4"
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
                          type="tel"
                          placeholder="(00) 00000-0000"
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
                          className="bg-background/50 border-input/50 focus:border-primary/50"
                          data-rd="service"
                        >
                          <SelectValue placeholder="Selecione um serviço" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="agentes-de-ia">Agentes de IA</SelectItem>
                        <SelectItem value="ecommerce-shopify">E-commerce Shopify</SelectItem>
                        <SelectItem value="gestao-digital-360">Gestão Digital 360°</SelectItem>
                        <SelectItem value="tracking">Tracking</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Selecione o serviço que mais se adequa à sua necessidade.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-primary hover:bg-primary/90 glow-primary group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  size="lg"
                  data-rd="submit"
                  aria-label={isSubmitting ? "Enviando formulário" : "Enviar mensagem"}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                      <span aria-live="polite">Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                      Enviar mensagem
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeDialog}
                  disabled={isSubmitting}
                  className="border-2 border-primary/50 hover:border-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  size="lg"
                  aria-label="Cancelar e fechar formulário"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </Form>
        )}
        </div>
      </div>
    </div>
  );
};

export default ContactFormDialog;

