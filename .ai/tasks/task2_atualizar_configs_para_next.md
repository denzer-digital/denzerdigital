---
id: 2
title: "Atualizar configs para Next"
status: completed
priority: high
feature: "Migração Next.js"
dependencies:
  - 1
assigned_agent: null
created_at: "2025-12-11T14:42:45Z"
started_at: "2025-12-11T14:54:02Z"
completed_at: "2025-12-11T14:55:16Z"
error_log: null
---

## Description
Ajustar configurações para build Next: `package.json`, `tsconfig`, `tailwind.config.ts` e `next.config.mjs`.

## Details
- Atualizar scripts `dev/build/start/lint` e deps para Next 14 (App Router).
- Criar/ajustar `next.config.mjs` com `images`/`transpilePackages` se necessário.
- Ajustar `tsconfig.json/tsconfig.app.json` para baseUrl/paths compatíveis com Next.
- Ajustar `tailwind.config.ts` `content` para `./app/**/*.{ts,tsx}` e caminhos usados.

## Test Strategy
- `npm install` para garantir deps corretas.
- `npm run lint` e `npm run build` para validar config.

