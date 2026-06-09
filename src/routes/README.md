# Routes

TanStack Start uses **file-based routing**. Every `.tsx` file in this directory
is a route. Do **not** create `src/pages/`, `src/routes/_app/index.tsx`, or
`app/layout.tsx` — those are Next.js / Remix conventions. The only root layout
is `src/routes/__root.tsx`.

## Conventions

| File | URL |
| --- | --- |
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `users/index.tsx` | `/users` |
| `users/$id.tsx` | `/users/:id` (dynamic — bare `$`, no curly braces) |
| `posts/{-$category}.tsx` | `/posts/:category?` (optional segment) |
| `files/$.tsx` | `/files/*` (splat — read via `_splat` param, never `*`) |
| `_layout.tsx` | layout route (renders children via `<Outlet />`) |
| `__root.tsx` | app shell — wraps every page; preserve `<Outlet />` |

`routeTree.gen.ts` is auto-generated. Don't edit it by hand.


Optimized tool selectionInspecting manifest files for the project's stack.

Read [](file:///c%3A/Users/sathe/OneDrive/Pictures/OneDrive/Desktop/projects/beauty-bloom-studio-main/package.json)

Read [](file:///c%3A/Users/sathe/OneDrive/Pictures/OneDrive/Desktop/projects/beauty-bloom-studio-main/bunfig.toml)

## Tech stack

- **Frontend framework**: React `^19.2.0`
- **Language**: TypeScript `^5.8.3`
- **Build tool**: Vite `^7.3.1`
- **Styling**: Tailwind CSS `^4.2.1`
- **State / data**:
  - `@tanstack/react-query`
  - `@tanstack/react-router`
  - `@tanstack/react-start`
- **UI / component primitives**:
  - Radix UI packages (`@radix-ui/react-*`)
  - `framer-motion`
  - `lucide-react`
  - `cmdk`
- **Form + validation**:
  - `react-hook-form`
  - `@hookform/resolvers`
  - `zod`
- **Tooling**:
  - ESLint
  - Prettier
  - `vite-tsconfig-paths`

So this is a modern React + TypeScript app using Vite and Tailwind CSS with TanStack and Radix UI libraries.