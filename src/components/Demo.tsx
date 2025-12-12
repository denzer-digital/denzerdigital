import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { sendMessageToWebhook, createSessionId, isWorkflowStartedResponse } from "@/services/webhookService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AgentType = "sdr" | "ecommerce" | "agendamento";

const AGENT_TYPES: { value: AgentType; label: string }[] = [
  { value: "sdr", label: "SDR" },
  { value: "ecommerce", label: "E-commerce suporte" },
  { value: "agendamento", label: "Agendamento de consultas/serviços" },
];

const Demo = () => {
  const [message, setMessage] = useState("");
  const [agentType, setAgentType] = useState<AgentType>("sdr");
  const [sessionId, setSessionId] = useState<string>(createSessionId());
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "assistant", content: "Envie uma mensagem para começar a conversar com nossa IA e descobrir como ela pode ajudar sua empresa!" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const queueRef = useRef<Promise<void>>(Promise.resolve()); // garante animação/entrega em sequência
  const firstResponsePendingRef = useRef<boolean>(false); // indica se a primeira resposta ainda não foi exibida

  // Auto-scroll para a última mensagem apenas no container do chat
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      // Usa setTimeout para garantir que o DOM foi atualizado
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Mantém o foco no input após o loading terminar
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  // Reseta sessão e histórico
  const resetChat = (newAgent?: AgentType) => {
    setSessionId(createSessionId());
    setMessages([
      { role: "assistant", content: "Envie uma mensagem para começar a conversar com nossa IA e descobrir como ela pode ajudar sua empresa!" },
    ]);
    setIsLoading(false);
    setMessage("");
    if (newAgent) {
      setAgentType(newAgent);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");
    // Mantém o foco no input após enviar
    inputRef.current?.focus();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    // Sempre marca que estamos aguardando a primeira resposta se ainda não recebemos nenhuma
    if (!firstResponsePendingRef.current) {
      firstResponsePendingRef.current = true;
      // A animação já está aparecendo ao enviar; não precisamos ligar aqui para a primeira resposta
    }

    console.log("Iniciando envio de mensagem:", userMessage);

    try {
      await sendMessageToWebhook(
        userMessage,
        agentType,
        sessionId,
        (newMessage) => {
          // Callback chamado para cada nova mensagem recebida
          console.log("Nova mensagem recebida:", newMessage);
          if (isWorkflowStartedResponse(newMessage)) {
            return;
          }
          queueRef.current = queueRef.current.then(async () => {
            const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
            if (firstResponsePendingRef.current) {
              // primeira resposta: já estamos animando desde o envio; só entrega e encerra
              firstResponsePendingRef.current = false;
              // Pequena folga opcional para suavizar (curta)
              await delay(200);
              setMessages(prev => [...prev, { 
                role: "assistant", 
                content: newMessage
              }]);
              setIsLoading(false); // encerra animação da primeira resposta
            } else {
              // demais respostas: liga digitando só antes de entregar
              setIsLoading(true);
              await delay(1200);
              setMessages(prev => [...prev, { 
                role: "assistant", 
                content: newMessage
              }]);
              setIsLoading(false);
            }
          });
        }
      );

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente." 
      }]);
      
      toast({
        title: "Erro",
        description: `Não foi possível enviar a mensagem: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      // Garante que o loading seja desativado ao final
      setIsLoading(false);
    }
  };

  return (
    <section id="experimente-ia" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container relative mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Experimente nossa <span className="text-gradient-primary">IA agora mesmo</span>
                </h2>
                <p className="text-xl text-muted-foreground">
                  Converse com um agente de IA que entende seu negócio e responde em tempo real.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 animate-pulse-glow" />
                  <div>
                    <h3 className="font-semibold mb-1">Respostas instantâneas 24/7</h3>
                    <p className="text-sm text-muted-foreground">Atendimento automático sem espera</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 animate-pulse-glow" />
                  <div>
                    <h3 className="font-semibold mb-1">Integração total com seu negócio</h3>
                    <p className="text-sm text-muted-foreground">Conectado a produtos, estoque e pedidos</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 animate-pulse-glow" />
                  <div>
                    <h3 className="font-semibold mb-1">Aprendizado contínuo</h3>
                    <p className="text-sm text-muted-foreground">Fica mais inteligente a cada interação</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right side - Chat Demo */}
            <div className="relative">
              {/* Bola azul (como estava antes) */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-pulse-glow z-0" />
              
              {/* Bola laranja atrás do chat */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse-glow z-[1]" />
              
              <div className="rounded-2xl bg-card border border-border p-6 shadow-2xl relative z-[2]">
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">Agente IA Denzer</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Online
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">Tipo:</span>
                    <Select value={agentType} onValueChange={(value) => setAgentType(value as AgentType)}>
                      <SelectTrigger className="w-[200px] h-8 text-xs">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {AGENT_TYPES.map((type) => (
                          <SelectItem
                            key={type.value}
                            value={type.value}
                            onClick={() => {
                              resetChat(type.value as AgentType);
                            }}
                          >
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Chat Messages */}
                <div 
                  ref={messagesContainerRef}
                  className="py-6 space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto scrollbar-hide"
                >
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
                      )}
                      <div className={`rounded-2xl p-4 max-w-[80%] ${
                        msg.role === 'user' 
                          ? 'bg-primary text-white rounded-tr-none' 
                          : 'bg-secondary rounded-tl-none'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex-shrink-0" />
                      <div className="bg-secondary rounded-2xl rounded-tl-none p-4">
                        <div className="flex items-center gap-1.5">
                          <span className="flex gap-1 items-center">
                            <span className="w-1.5 h-1.5 bg-foreground/70 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.4s' }} />
                            <span className="w-1.5 h-1.5 bg-foreground/70 rounded-full animate-bounce" style={{ animationDelay: '200ms', animationDuration: '1.4s' }} />
                            <span className="w-1.5 h-1.5 bg-foreground/70 rounded-full animate-bounce" style={{ animationDelay: '400ms', animationDuration: '1.4s' }} />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Digite sua mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    disabled={isLoading}
                    className="flex-1 bg-secondary rounded-full px-4 py-3 text-sm"
                  />
                  <Button 
                    size="icon" 
                    className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90"
                    onClick={handleSendMessage}
                    disabled={isLoading}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
