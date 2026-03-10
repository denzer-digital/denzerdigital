/**
 * Helper para enviar dados de formulários para o webhook da Denzer Digital
 */

export interface FormWebhookData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  formId: string;
  pageUrl: string;
  pageTitle: string;
  timestamp: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
}

const WEBHOOK_URL = "https://webhook.denzerdigital.com.br/webhook/e4be518d-4380-4b41-bc1f-18cbcc615793";

/**
 * Envia os dados do formulário para o webhook
 * @param formData - Dados do formulário
 * @param formId - ID do formulário que foi enviado
 * @returns Promise<boolean> - true se enviado com sucesso, false caso contrário
 */
export async function sendFormToWebhook(
  formData: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    service: string;
  },
  formId: string
): Promise<boolean> {
  try {
    if (typeof window === "undefined") {
      console.warn("Webhook não pode ser enviado no servidor");
      return false;
    }

    // Coleta UTMs do localStorage
    const utms: Record<string, string> = {};
    const utmKeys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "gclid",
      "fbclid",
    ];

    utmKeys.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value) {
        utms[key] = value;
      }
    });

    // Prepara os dados para o webhook
    const webhookData: FormWebhookData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company || "",
      service: formData.service,
      formId: formId,
      pageUrl: window.location.href,
      pageTitle: document.title,
      timestamp: new Date().toISOString(),
      ...utms,
    };

    console.log("Enviando formulário para webhook:", {
      url: WEBHOOK_URL,
      data: webhookData,
    });

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(webhookData),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      console.error("Erro ao enviar para webhook:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      return false;
    }

    console.log("Formulário enviado para webhook com sucesso");
    return true;
  } catch (error) {
    console.error("Erro ao enviar formulário para webhook:", error);
    return false;
  }
}
