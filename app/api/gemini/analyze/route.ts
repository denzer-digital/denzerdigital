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

    // Lista de modelos para tentar (em ordem de preferência)
    // Tenta modelos mais estáveis primeiro
    const modelsToTry = [
      { name: 'gemini-pro', version: 'v1beta' },
      { name: 'gemini-1.5-pro', version: 'v1beta' },
      { name: 'gemini-1.5-flash', version: 'v1beta' },
      { name: 'gemini-pro', version: 'v1' },
    ];

    let lastError: any = null;
    let response: Response | null = null;

    // Tenta cada modelo até encontrar um que funcione
    for (const model of modelsToTry) {
      try {
        const apiUrl = `https://generativelanguage.googleapis.com/${model.version}/models/${model.name}:generateContent?key=${apiKey}`;
        
        response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userQuery }] }],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
          }),
        });

        // Se a resposta foi bem-sucedida, sai do loop
        if (response.ok) {
          console.log(`Modelo ${model.name} (${model.version}) funcionou!`);
          break;
        }

        // Se não foi bem-sucedida, tenta o próximo modelo
        const errorData = await response.json().catch(() => ({ error: { message: response.statusText } }));
        lastError = errorData;
        console.warn(`Modelo ${model.name} (${model.version}) falhou:`, errorData);
        response = null;
      } catch (error) {
        console.warn(`Erro ao tentar modelo ${model.name} (${model.version}):`, error);
        lastError = error;
        response = null;
      }
    }

    // Se nenhum modelo funcionou, retorna erro
    if (!response || !response.ok) {
      console.error('Todos os modelos falharam. Último erro:', lastError);
      return NextResponse.json(
        { error: lastError?.error?.message || 'Nenhum modelo disponível funcionou. Verifique sua API key e os modelos disponíveis.' },
        { status: 500 }
      );
    }

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
      console.error('Resposta inválida da API Gemini:', data);
      return NextResponse.json(
        { error: 'Resposta inválida da API. Verifique os logs do servidor.' },
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

