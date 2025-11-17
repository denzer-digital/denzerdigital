import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Demo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([
    { role: "assistant", content: "Olá! 👋 Sou o assistente IA da Denzer Digital. Como posso ajudar sua empresa a crescer hoje?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-n8n', {
        body: { message: userMessage }
      });

      if (error) {
        throw error;
      }

      // Adiciona a resposta do N8N ao chat
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: data?.response || "Resposta recebida com sucesso!" 
      }]);

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      toast({
        title: "Erro",
        description: "Não foi possível enviar a mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
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

              <Button 
                size="lg"
                className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 glow-accent group"
                onClick={() => setIsOpen(!isOpen)}
              >
                <MessageSquare className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Testar o agente
              </Button>
            </div>

            {/* Right side - Chat Demo */}
            <div className="relative">
              <div className="rounded-2xl bg-card border border-border p-6 shadow-2xl">
                {/* Chat Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-border">
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

                {/* Chat Messages */}
                <div className="py-6 space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto">
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
                        <p className="text-sm">Digitando...</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="flex gap-2 pt-4 border-t border-border">
                  <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isLoading}
                    className="flex-1 bg-secondary rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-2xl animate-pulse-glow" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl animate-pulse-glow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
