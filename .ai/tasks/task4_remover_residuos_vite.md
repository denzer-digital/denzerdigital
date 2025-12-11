---
id: 4
title: "Remover resíduos Vite e ajustar imports"
status: completed
priority: medium
feature: "Migração Next.js"
dependencies:
  - 3
assigned_agent: null
created_at: "2025-12-11T14:42:45Z"
started_at: "2025-12-11T14:57:31Z"
completed_at: "2025-12-11T15:02:12Z"
error_log: null
---

## Description
Remover artefatos Vite/React Router e alinhar imports/aliases para Next.

## Details
- Remover `index.html`, `main.tsx`, `App.tsx`, `pages/` do React Router e `vite` configs.
- Ajustar aliases `@/` e caminhos estáticos conforme Next.
- Limpar configs excedentes (`vite.config.ts`, `tsconfig.*` redundantes) após migração.
- Verificar que scripts Vite não restam no `package.json`.

## Test Strategy
- `npm run lint` e `npm run build` para garantir que não há referências a Vite/React Router.

