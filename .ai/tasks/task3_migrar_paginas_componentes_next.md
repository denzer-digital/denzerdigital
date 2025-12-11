---
id: 3
title: "Migrar páginas/componentes para Next"
status: completed
priority: high
feature: "Migração Next.js"
dependencies:
  - 1
  - 2
assigned_agent: null
created_at: "2025-12-11T14:42:45Z"
started_at: "2025-12-11T14:54:02Z"
completed_at: "2025-12-11T14:57:31Z"
error_log: null
---

## Description
Adaptar home para `app/page.tsx` usando componentes existentes e Providers/contextos.

## Details
- Reaproveitar seções (`Navbar`, `Hero`, etc.) compondo `app/page.tsx`.
- Garantir Providers (QueryClient, Tooltip, ContactDialog, Toasters) via `app/providers.tsx` ou layout.
- Ajustar imports de assets para trabalhar com `next/image` onde aplicável (ou manter estático inicialmente).
- Validar rota 404 (`app/not-found.tsx`) se necessário.

## Test Strategy
- `npm run dev` e acessar `/` para validar seções renderizadas e navegação interna.
- `npm run lint` para checar imports/JSX.

