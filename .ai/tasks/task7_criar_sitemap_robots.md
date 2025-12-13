---
id: 7
title: 'Criar sitemap.xml e melhorar robots.txt'
status: completed
priority: medium
feature: Performance e SEO
dependencies: []
assigned_agent: null
created_at: "2025-12-12T22:07:03Z"
started_at: "2025-12-12T22:11:44Z"
completed_at: "2025-12-12T22:12:25Z"
error_log: null
---

## Description
Gerar sitemap.xml dinâmico e atualizar robots.txt com referência ao sitemap.

## Details
- Criar `app/sitemap.ts` para gerar sitemap.xml dinamicamente usando Next.js 14
- Incluir todas as rotas públicas do site
- Adicionar lastmod, changefreq e priority para cada rota
- Atualizar `public/robots.txt` para referenciar o sitemap
- Garantir que robots.txt permita indexação de todas as páginas públicas
- Verificar que sitemap.xml é acessível em `/sitemap.xml`
- Adicionar sitemap index se necessário (para múltiplos sitemaps)

## Test Strategy
- Acessar `/sitemap.xml` e verificar que está acessível e bem formatado
- Validar sitemap.xml com Google Search Console ou ferramentas online
- Verificar que robots.txt referencia o sitemap corretamente
- Testar que bots podem acessar o sitemap
- Executar `npm run build` e verificar que sitemap é gerado corretamente

