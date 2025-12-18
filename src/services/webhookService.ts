/**
 * Serviço para comunicação com o webhook N8N
 */

const WEBHOOK_URL = "https://webhook.agentemwd.com/webhook/9de471bd-4296-4cc8-bc40-f2ea1d19f6dd";
const CHAT_API_URL = "/api/chat/messages";

export type AgentType = "sdr" | "ecommerce" | "agendamento";

export interface WebhookMessage {
  message: string;
  timestamp: string;
  sessionId: string;
  agentType: AgentType;
}

/**
 * Gera um ID único para a sessão ou recupera o existente do sessionStorage
 * O ID é único por sessão do navegador (recarrega quando a página é recarregada)
 * @returns ID único da sessão
 */
export function createSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export interface WebhookResponse {
  response?: string;
  message?: string;
  text?: string;
  status?: string;
  output?: {
    message?: string;
    response?: string;
  };
}

// Mensagens que indicam que o workflow foi iniciado mas ainda não há resposta
const WORKFLOW_STARTED_MESSAGES = [
  "workflow foi iniciado",
  "workflow iniciado",
  "workflow started",
  "processando",
  "processando sua mensagem",
  "aguarde",
  "workflow was started",
];

/**
 * Verifica se a resposta indica que o workflow foi iniciado mas ainda não há resposta final
 */
export function isWorkflowStartedResponse(response: string): boolean {
  const lowerResponse = response.toLowerCase();
  return WORKFLOW_STARTED_MESSAGES.some(msg => lowerResponse.includes(msg));
}

/**
 * Faz polling para verificar se há mensagens disponíveis
 * IMPORTANTE: Apenas verifica status, NÃO inicia novas execuções
 * @param sessionId - ID da sessão
 * @param onNewMessage - Callback chamado para cada nova mensagem recebida
 * @param maxAttempts - Número máximo de tentativas (padrão: 30 = 60 segundos)
 * @param intervalMs - Intervalo entre tentativas em ms (padrão: 2000 = 2 segundos)
 * @param emptyAttemptsToStop - Número de tentativas vazias consecutivas para parar (padrão: 2)
 * @returns true se recebeu mensagens, false se timeout
 */
async function pollForMessages(
  sessionId: string,
  onNewMessage: (message: string) => void,
  initialMessages: string[] = [], // Mensagens já recebidas na primeira resposta
  maxAttempts: number = 30,
  intervalMs: number = 2000,
  emptyAttemptsToStop: number = 2
): Promise<boolean> {
  console.log(`🔄 Iniciando polling APENAS para verificar status. SessionId: ${sessionId}, máximo ${maxAttempts} tentativas`);
  console.log(`📋 Mensagens já recebidas na primeira resposta: ${initialMessages.length}`);
  
  // Usa normalização para comparação de mensagens
  const receivedMessages = new Set<string>(initialMessages.map(normalizeMessage)); // Inclui mensagens já recebidas para evitar duplicatas
  let consecutiveEmptyAttempts = 0; // Contador de tentativas consecutivas sem novas mensagens
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Aguarda antes de fazer a próxima tentativa (exceto na primeira)
    if (attempt > 0) {
      await new Promise(resolve => setTimeout(resolve, intervalMs));
    }

    try {
      // IMPORTANTE: Apenas verifica status, NÃO envia mensagem nem agentType
      // Isso evita iniciar novas execuções do workflow
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionId,
          checkStatus: true, // Indica que é APENAS uma verificação de status
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const contentType = response.headers.get("content-type");
        let data: WebhookResponse | string | any;

        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();
          data = text;
        }

        // Processa múltiplas mensagens se vierem em array
        const messages = extractMessages(data);
        console.log(`📦 Tentativa ${attempt + 1}/${maxAttempts}: ${messages.length} mensagens extraídas`);
        
        let newMessagesCount = 0;
        
        // Chama o callback para cada nova mensagem
        messages.forEach((msg: string) => {
          const trimmedMsg = msg.trim();
          if (
            trimmedMsg.length === 0 ||
            isWorkflowStartedResponse(trimmedMsg) ||
            trimmedMsg.toLowerCase() === "null" ||
            trimmedMsg.toLowerCase() === "undefined"
          ) {
            return;
          }
          
          const normalized = normalizeMessage(trimmedMsg);
          if (!receivedMessages.has(normalized)) {
            receivedMessages.add(normalized);
            newMessagesCount++;
            console.log(`✅ Nova mensagem ${newMessagesCount} recebida na tentativa ${attempt + 1}:`, trimmedMsg.substring(0, 100));
            onNewMessage(trimmedMsg);
          } else {
            console.log(`⚠️ Mensagem duplicada ignorada na tentativa ${attempt + 1}:`, trimmedMsg.substring(0, 50));
          }
        });
        
        // Se recebeu novas mensagens, reseta o contador de tentativas vazias
        if (newMessagesCount > 0) {
          consecutiveEmptyAttempts = 0;
          console.log(`📊 Total de mensagens recebidas até agora: ${receivedMessages.size}`);
        } else {
          consecutiveEmptyAttempts++;
          console.log(`⏳ Tentativa ${attempt + 1}/${maxAttempts}: Sem novas mensagens (${consecutiveEmptyAttempts}/${emptyAttemptsToStop} tentativas vazias consecutivas)`);
        }
        
        // Para o polling se não houver novas mensagens por várias tentativas consecutivas
        if (consecutiveEmptyAttempts >= emptyAttemptsToStop) {
          if (receivedMessages.size > 0) {
            console.log(`⏹️ Parando polling: ${emptyAttemptsToStop} tentativas consecutivas sem novas mensagens. Total: ${receivedMessages.size} mensagens recebidas`);
            break;
          } else if (attempt >= 5) {
            // Se não recebeu nenhuma mensagem após 5 tentativas, também para
            console.log(`⏹️ Parando polling: Nenhuma mensagem recebida após ${attempt + 1} tentativas`);
            break;
          }
        }
      } else {
        console.warn(`⚠️ Tentativa ${attempt + 1}: Status ${response.status}`);
      }
    } catch (error) {
      console.warn(`⚠️ Erro na tentativa ${attempt + 1} de polling:`, error);
      // Continua tentando mesmo com erro
    }
  }

  const hasMessages = receivedMessages.size > 0;
  if (!hasMessages) {
    console.warn(`⏱️ Timeout: Não foi possível obter mensagens após ${maxAttempts} tentativas`);
  } else {
    console.log(`✅ Polling finalizado. Total de ${receivedMessages.size} mensagens recebidas`);
  }
  return hasMessages;
}

/**
 * Extrai múltiplas mensagens do formato retornado pelo N8N
 * Suporta arrays de mensagens ou mensagem única
 */
function extractMessages(data: any): string[] {
  console.log("🔍 extractMessages chamado com:", typeof data, Array.isArray(data) ? `array[${data.length}]` : data);
  
  // Se for string, tenta parsear como JSON
  if (typeof data === "string") {
    try {
      const parsed = JSON.parse(data);
      return extractMessages(parsed);
    } catch {
      // Se não for JSON válido, retorna como array com uma mensagem
      return data.trim() ? [data] : [];
    }
  }

  // Se for um array, processa cada item
  if (Array.isArray(data)) {
    console.log(`📦 Processando array com ${data.length} itens`);
    const messages: string[] = [];
    data.forEach((item, index) => {
      console.log(`🔍 Processando item ${index + 1}/${data.length}:`, item);
      const extracted = extractResponse(item);
      console.log(`📝 Item ${index + 1} extraído:`, extracted?.substring(0, 100));
      if (extracted && extracted.trim()) {
        messages.push(extracted);
        } else {
        console.log(`⚠️ Item ${index + 1} não tinha conteúdo válido`);
      }
    });
    console.log(`✅ Total de ${messages.length} mensagens extraídas do array`);
    return messages;
  }

  // Se for objeto, extrai a mensagem
  if (data && typeof data === "object") {
    const extracted = extractResponse(data);
    console.log(`📝 Objeto extraído:`, extracted?.substring(0, 100));
    return extracted && extracted.trim() ? [extracted] : [];
    }

  console.log("⚠️ Tipo de dados não reconhecido, retornando array vazio");
  return [];
}

/**
 * Envia uma mensagem para o webhook N8N e recebe múltiplas mensagens separadas
 * Se a resposta inicial for "workflow iniciado", faz polling até receber as mensagens
 * @param message - A mensagem do usuário
 * @param agentType - Tipo do agente IA (sdr, ecommerce, agendamento)
 * @param onNewMessage - Callback chamado para cada nova mensagem recebida da IA
 * @param onPolling - Callback chamado durante o polling (para animação)
 */
export async function sendMessageToWebhook(
  message: string,
  agentType: AgentType,
  sessionId: string,
  onNewMessage: (message: string) => void,
  onPolling?: (isPolling: boolean) => void
): Promise<void> {
  try {
    if (!sessionId) {
      throw new Error("sessionId é obrigatório para enviar mensagens");
    }

    const payload: WebhookMessage = {
      message: message.trim(),
      timestamp: new Date().toISOString(),
      sessionId: sessionId,
      agentType: agentType,
    };

    // Log para debug
    console.log("Enviando mensagem para webhook:", {
      url: WEBHOOK_URL,
      method: "POST",
      payload: payload,
    });

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log("Resposta do webhook:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      console.error("Erro na resposta do webhook:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
    }

    // Tenta parsear como JSON, mas também suporta texto simples
    let data: WebhookResponse | string;
    const contentType = response.headers.get("content-type");
    
    try {
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = text;
      }
    } catch (parseError) {
      console.error("Erro ao parsear resposta:", parseError);
      throw new Error("Erro ao processar resposta do webhook");
    }

    console.log("Dados parseados:", data);

    // Extrai as mensagens do formato retornado pelo N8N
    const messages = extractMessages(data);
    console.log("Mensagens extraídas:", messages);
    
    // Verifica se o workflow foi iniciado (indica que mais mensagens podem vir)
    const isWorkflowStarted = messages.some(msg => isWorkflowStartedResponse(msg));
    const validMessages = messages.filter(msg => !isWorkflowStartedResponse(msg));
    
    console.log(`📊 Workflow iniciado? ${isWorkflowStarted}, Mensagens válidas na resposta inicial: ${validMessages.length}`);
    
    // Processa mensagens da resposta inicial primeiro (se houver)
    if (validMessages.length > 0) {
      console.log(`📨 Processando ${validMessages.length} mensagens da resposta inicial`);
      validMessages.forEach((msg, index) => {
        console.log(`📤 Enviando mensagem ${index + 1}/${validMessages.length} da resposta inicial:`, msg.substring(0, 100));
        onNewMessage(msg);
        console.log(`✅ Callback onNewMessage chamado para mensagem ${index + 1}`);
      });
      console.log(`✅ Todas as ${validMessages.length} mensagens da resposta inicial foram enviadas`);
    } else {
      console.log(`⚠️ Nenhuma mensagem válida encontrada na resposta inicial`);
    }
    
    // Sempre fazemos polling na API interna de mensagens para trazer as respostas que o fluxo enviou via HTTP Request1
    console.log("🔄 Iniciando polling na API interna /api/chat/messages para buscar respostas do fluxo");
    if (onPolling) onPolling(true);
    // Passa mensagens originais, a normalização será feita dentro da função para comparação
    await pollChatMessages(sessionId, onNewMessage, validMessages);
    if (onPolling) onPolling(false);
  } catch (error) {
    console.error("Erro completo ao enviar mensagem para webhook:", {
      error,
      message: error instanceof Error ? error.message : "Erro desconhecido",
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }
}

/**
 * Faz polling na API interna (/api/chat/messages) para buscar mensagens persistidas pelo fluxo
 */
// Normaliza mensagem para comparação (remove espaços extras, quebras de linha, etc)
function normalizeMessage(msg: string): string {
  return msg.trim().replace(/\s+/g, ' ').toLowerCase();
}

async function pollChatMessages(
  sessionId: string,
  onNewMessage: (message: string) => void,
  initialMessages: string[] = [],
  maxAttempts: number = 80,          // ~160s no pior caso (80 * 2s)
  intervalMs: number = 2000,         // 2s entre tentativas
  emptyAttemptsToStop: number = 8,   // para após 8 tentativas vazias seguidas
  minAttemptsBeforeStop: number = 6  // garante ao menos 6 tentativas antes de parar
): Promise<void> {
  let cursor = -1;
  let consecutiveEmpty = 0;
  // Usa normalização para comparação de mensagens
  const received = new Set<string>(initialMessages.map(normalizeMessage));
  // Rastreia mensagens pendentes por índice para garantir ordem
  const pendingMessages = new Map<number, { text: string; idx: number }>();

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // espera entre tentativas, exceto na primeira
    if (attempt > 0) {
      await new Promise((r) => setTimeout(r, intervalMs));
    }

    try {
      const url = `${CHAT_API_URL}?sessionId=${encodeURIComponent(sessionId)}&cursor=${cursor}`;
      const resp = await fetch(url, { method: "GET" });
      if (!resp.ok) {
        console.warn(`⚠️ Polling chat API status ${resp.status} na tentativa ${attempt + 1}`);
        continue;
      }

      const data = await resp.json();
      const messages: { text?: string; idx?: number }[] = data?.messages ?? [];
      const lastIdx: number = typeof data?.lastIdx === "number" ? data.lastIdx : cursor;

      let newCount = 0;
      
      // Primeiro, coleta todas as novas mensagens e ordena por índice
      messages.forEach((m) => {
        const txt = (m?.text ?? "").trim();
        if (!txt || txt.toLowerCase() === "null" || isWorkflowStartedResponse(txt)) {
          return;
        }
        
        const normalized = normalizeMessage(txt);
        const msgIdx = typeof m.idx === "number" ? m.idx : cursor + 1;
        
        if (!received.has(normalized)) {
          // Adiciona à lista de pendentes se ainda não foi processada
          if (!pendingMessages.has(msgIdx)) {
            pendingMessages.set(msgIdx, { text: txt, idx: msgIdx });
            newCount++;
            console.log(`📥 Mensagem ${msgIdx} adicionada à fila de processamento:`, txt.substring(0, 100));
          }
        } else {
          console.log(`⚠️ Mensagem duplicada ignorada no polling:`, txt.substring(0, 50));
        }
      });

      // Processa mensagens pendentes em ordem de índice
      // Encontra o próximo índice esperado (cursor + 1)
      let nextExpectedIdx = cursor + 1;
      let processedAny = false;
      
      while (pendingMessages.has(nextExpectedIdx)) {
        const msg = pendingMessages.get(nextExpectedIdx)!;
        const normalized = normalizeMessage(msg.text);
        
        // Verifica novamente se não foi processada (proteção extra)
        if (!received.has(normalized)) {
          received.add(normalized);
          console.log(`✅ Processando mensagem ${msg.idx} em ordem:`, msg.text.substring(0, 100));
          onNewMessage(msg.text);
          processedAny = true;
        }
        
        pendingMessages.delete(nextExpectedIdx);
        cursor = msg.idx; // Atualiza cursor apenas após processar
        nextExpectedIdx++;
      }

      if (processedAny || newCount > 0) {
        consecutiveEmpty = 0;
      } else {
        consecutiveEmpty++;
      }

      if (consecutiveEmpty >= emptyAttemptsToStop && attempt + 1 >= minAttemptsBeforeStop) {
        // Antes de parar, tenta processar qualquer mensagem pendente
        if (pendingMessages.size > 0) {
          console.log(`⚠️ Parando polling mas há ${pendingMessages.size} mensagens pendentes. Tentando processar...`);
          const sortedPending = Array.from(pendingMessages.entries()).sort((a, b) => a[0] - b[0]);
          sortedPending.forEach(([idx, msg]) => {
            const normalized = normalizeMessage(msg.text);
            if (!received.has(normalized)) {
              received.add(normalized);
              console.log(`✅ Processando mensagem pendente ${idx}:`, msg.text.substring(0, 100));
              onNewMessage(msg.text);
              cursor = idx;
            }
          });
        }
        break;
      }
    } catch (err) {
      console.warn(`⚠️ Erro ao fazer polling da chat API na tentativa ${attempt + 1}:`, err);
      // continua tentando
    }
  }
}

/**
 * Extrai a resposta do formato retornado pelo N8N
 * Suporta diferentes formatos de resposta, incluindo arrays JSON
 */
function extractResponse(data: WebhookResponse | string): string {
  // Se for string, tenta parsear como JSON primeiro
  if (typeof data === "string") {
    // Tenta parsear como JSON
    try {
      const parsed = JSON.parse(data);
      // Se parseou com sucesso, processa o objeto/array
      return extractResponse(parsed);
    } catch {
      // Se não for JSON válido, retorna a string como está
      return data;
    }
  }

  // Se for um array, pega o primeiro elemento
  if (Array.isArray(data) && data.length > 0) {
    const firstItem = data[0];
    // Se o primeiro item tiver campo "output", retorna ele
    if (firstItem && typeof firstItem === "object" && "output" in firstItem) {
      return String(firstItem.output || "");
    }
    // Se não, tenta extrair do primeiro item
    return extractResponse(firstItem);
  }

  // Se for objeto, tenta diferentes campos comuns de resposta
  if (data && typeof data === "object") {
    // Prioriza o campo "text" (formato comum do N8N)
    if ("text" in data && data.text) {
      console.log(`📝 Campo "text" encontrado:`, String(data.text).substring(0, 100));
      return String(data.text);
    }
    
    // Prioriza o campo "output" se existir
    if ("output" in data && data.output) {
      return String(data.output);
    }
    
    // Tenta outros campos comuns
    if (data.response) return String(data.response);
    if (data.message) return String(data.message);
    
    // Tenta campos aninhados
    if (data.output && typeof data.output === "object") {
      if ("message" in data.output) return String(data.output.message);
      if ("response" in data.output) return String(data.output.response);
      if ("text" in data.output) return String(data.output.text);
    }
  }

  // Se não encontrar nenhum campo conhecido, retorna o JSON stringificado
  return JSON.stringify(data);
}

