---
id: 8
title: 'Otimizar scripts e carregamento'
status: completed
priority: medium
feature: Performance e SEO
dependencies: []
assigned_agent: null
created_at: "2025-12-12T22:07:03Z"
started_at: "2025-12-12T22:13:39Z"
completed_at: "2025-12-12T22:14:12Z"
error_log: null
---

## Description
Mover scripts inline para estratégias apropriadas do Next.js e implementar lazy loading de scripts não críticos.

## Details
- Analisar scripts inline em `app/layout.tsx` (especialmente o script de scroll e GTM)
- Mover scripts para componente `Script` do Next.js com estratégias apropriadas
- Usar `strategy="afterInteractive"` para scripts não críticos
- Usar `strategy="lazyOnload"` para scripts que podem ser carregados após interação
- Manter `strategy="beforeInteractive"` apenas para scripts absolutamente críticos
- Otimizar script de scroll removendo código desnecessário ou movendo para estratégia apropriada
- Verificar que GTM carrega corretamente com nova estratégia
- Remover scripts inline desnecessários

## Test Strategy
- Verificar que todos os scripts funcionam corretamente após mudanças
- Testar carregamento da página e verificar ordem de execução dos scripts
- Verificar que GTM está funcionando corretamente
- Executar Lighthouse e verificar melhoria na métrica de scripts
- Testar em diferentes navegadores

