- [x] **ID 1: Recriar scaffold Next.js App Router** (Priority: critical)
> Preparar estrutura `app/` com `layout.tsx`, `page.tsx`, `providers`, `globals.css`, metadata e favicon.

- [x] **ID 2: Atualizar configs para Next** (Priority: high)
> Ajustar `package.json` (scripts/deps), `tsconfig` (paths), `tailwind.config.ts` e `next.config.mjs` para build Next.

- [x] **ID 3: Migrar páginas/componentes para Next** (Priority: high)
> Adaptar home para `app/page.tsx`, aplicar Providers/contextos e manter seções existentes.
> Dependencies: 1, 2

- [x] **ID 4: Remover resíduos Vite e ajustar imports** (Priority: medium)
> Excluir `index.html`, `main.tsx`, `App.tsx`, rotas do React Router e corrigir imports/aliases.
> Dependencies: 3

