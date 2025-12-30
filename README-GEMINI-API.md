# Configuração da API Gemini

Para proteger a chave da API do Gemini, ela deve ser configurada como variável de ambiente.

## Configuração Local

1. Crie um arquivo `.env.local` na raiz do projeto:

```bash
GEMINI_API_KEY=sua_chave_api_aqui
```

2. Obtenha sua chave da API em: https://makersuite.google.com/app/apikey

3. Reinicie o servidor de desenvolvimento após adicionar a variável.

## Configuração na Vercel

1. Acesse o dashboard da Vercel: https://vercel.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** > **Environment Variables**
4. Adicione uma nova variável:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Sua chave da API do Gemini
   - **Environments**: Selecione Production, Preview e Development (ou apenas Production)
5. Clique em **Save**
6. Faça um novo deploy para aplicar as mudanças

## Verificação

Após configurar, a API route `/api/gemini/analyze` usará automaticamente a variável de ambiente `GEMINI_API_KEY` do servidor, mantendo a chave segura e nunca exposta no código do cliente.

