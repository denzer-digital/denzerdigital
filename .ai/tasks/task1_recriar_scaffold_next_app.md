---
id: 1
title: "Recriar scaffold Next.js App Router"
status: completed
priority: critical
feature: "Migração Next.js"
dependencies: []
assigned_agent: null
created_at: "2025-12-11T14:42:45Z"
started_at: "2025-12-11T14:45:24Z"
completed_at: "2025-12-11T14:47:17Z"
error_log: null
---

## Description
Preparar estrutura base do Next.js App Router com `app/`, `layout.tsx`, `page.tsx`, `globals.css`, `providers` e metadata (favicon).

## Details
- Criar pasta `app/` com `layout.tsx` (metadata, Providers, html/body).
- Adicionar `globals.css` e carregar no layout.
- Incluir favicon/metadados no `metadata` do layout.
- Criar `app/providers.tsx` se necessário para contextos (toast/query/theme).
- Garantir `app/page.tsx` inicial renderizando placeholder simples.

## Test Strategy
- `npm run lint` (ou `pnpm lint`) para validar estrutura inicial.
- `npm run dev` e acessar `/` para checar renderização básica e favicon.

