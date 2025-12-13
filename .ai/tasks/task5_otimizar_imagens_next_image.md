---
id: 5
title: 'Otimizar imagens com next/image'
status: completed
priority: high
feature: Performance e SEO
dependencies: []
assigned_agent: null
created_at: "2025-12-12T22:07:03Z"
started_at: "2025-12-12T22:08:03Z"
completed_at: "2025-12-12T22:09:34Z"
error_log: null
---

## Description
Substituir todas as tags `<img>` por `next/image` para otimização automática, lazy loading e melhor performance.

## Details
- Identificar todas as ocorrências de tags `<img>` no projeto
- Substituir por componente `next/image` do Next.js
- Adicionar width e height explícitos para evitar CLS (Cumulative Layout Shift)
- Configurar lazy loading para imagens abaixo da dobra
- Otimizar imagens de background (usar next/image ou CSS otimizado)
- Verificar componentes em `src/components/` e `app/`
- Garantir que imagens em `/public/assets/` sejam referenciadas corretamente
- Adicionar alt text descritivo para todas as imagens

## Test Strategy
- Executar `npm run build` e verificar que não há erros
- Verificar no navegador que todas as imagens carregam corretamente
- Usar DevTools para verificar que next/image está otimizando as imagens
- Verificar Core Web Vitals (especialmente CLS) no Lighthouse
- Testar em diferentes tamanhos de tela para garantir responsividade

