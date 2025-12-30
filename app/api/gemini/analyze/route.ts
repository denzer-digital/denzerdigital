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

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY não está configurada');
      return NextResponse.json(
        { error: 'Configuração de API não encontrada' },
        { status: 500 }
      );
    }

    const userQuery = `Atuo como estrategista da Denzer Digital. O cliente investe R$ ${adSpend} em anúncios e tem ROAS ${roas}.

    Contexto: Sem traqueamento Server-Side (apenas Pixel), ele perde cerca de 30% da atribuição das vendas devido ao iOS 14+.

    Gere um relatório curto, direto e visual ("estilo dashboard") usando EXATAMENTE este formato (mantenha os emojis):

    📊 *Faturamento Rastreado (Atual):* R$ [Calculado: Spend * ROAS]
    👻 *Faturamento Invisível (Não Atribuído):* R$ [Calculado: ~30% adicional que o pixel perdeu]
    🚀 *Potencial Real de Receita:* R$ [Soma dos dois acima]

    *Diagnóstico:*
    [Escreva apenas 2 ou 3 frases curtas e persuasivas alertando que ele está tomando decisões com dados incompletos (cegueira de dados) e como o Server-Side da Denzer traz essa receita de volta para o painel].
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userQuery }] }],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error('Erro na API Gemini:', data.error);
      return NextResponse.json(
        { error: data.error.message || 'Erro ao processar a análise' },
        { status: 500 }
      );
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json(
        { error: 'Resposta inválida da API' },
        { status: 500 }
      );
    }

    return NextResponse.json({ report: text });
  } catch (error) {
    console.error('Erro ao processar análise:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

