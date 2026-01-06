import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { adSpend, roas } = await req.json();

    if (!adSpend || !roas) {
      return NextResponse.json(
        { error: 'adSpend e roas são obrigatórios' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('OPENAI_API_KEY não está configurada');
      return NextResponse.json(
        { error: 'Configuração de API não encontrada' },
        { status: 500 }
      );
    }

    const userQuery = `Atuo como estrategista da Denzer Digital. O cliente investe R$ ${adSpend} em anúncios e tem ROAS ${roas}.

Contexto: Sem traqueamento Server-Side (apenas Pixel), ele perde cerca de 30% da atribuição das vendas devido ao iOS 14+.

Gere um relatório curto, direto e visual ("estilo dashboard") usando EXATAMENTE este formato (mantenha os emojis, mas NÃO use asteriscos ou outros caracteres para negrito):

📊 Faturamento Rastreado (Atual): R$ [Calculado: Spend * ROAS]
👻 Faturamento Invisível (Não Atribuído): R$ [Calculado: ~30% adicional que o pixel perdeu]
🚀 Potencial Real de Receita: R$ [Soma dos dois acima]

Diagnóstico:
[Escreva apenas 2 ou 3 frases curtas e persuasivas alertando que ele está tomando decisões com dados incompletos (cegueira de dados) e como o Server-Side da Denzer traz essa receita de volta para o painel].
`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Você é um estrategista de marketing digital especializado em análise de dados e atribuição de vendas. Responda de forma direta, objetiva e persuasiva.'
            },
            {
              role: 'user',
              content: userQuery
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: { message: response.statusText } }));
        console.error('Erro na API OpenAI:', errorData);
        return NextResponse.json(
          { error: errorData?.error?.message || `Erro ao processar a análise (${response.status})` },
          { status: response.status }
        );
      }

      const data = await response.json();

      if (data.error) {
        console.error('Erro na resposta da API OpenAI:', data.error);
        return NextResponse.json(
          { error: data.error.message || 'Erro ao processar a análise' },
          { status: 500 }
        );
      }

      const text = data.choices?.[0]?.message?.content;

      if (!text) {
        console.error('Resposta inválida da API OpenAI:', data);
        return NextResponse.json(
          { error: 'Resposta inválida da API. Verifique os logs do servidor.' },
          { status: 500 }
        );
      }

      return NextResponse.json({ report: text });
    } catch (fetchError) {
      console.error('Erro ao fazer requisição para OpenAI:', fetchError);
      return NextResponse.json(
        { error: 'Erro ao conectar com a API do ChatGPT' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erro ao processar análise:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

