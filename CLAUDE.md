# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Overview

`passwords` is a small, frontend-only React SPA that generates random passwords.
It has no backend, no authentication, and no network calls — all generation
happens in the browser using the Web Crypto API. The UI is intentionally simple
and Duolingo-inspired.

## Commands

Package manager is **yarn** (see `yarn.lock`, Dockerfile). Node 24 is pinned via
`.tool-versions` (asdf).

```bash
yarn                      # install dependencies
yarn start                # dev server on :3000
yarn build                # tsc type-check + vite build -> build/
yarn preview              # preview a production build

yarn lint                 # eslint + check-types (tsc --noemit) — run together
yarn eslint               # eslint only
yarn check-types          # tsc --noemit only
yarn format:check         # prettier check
yarn format:write         # prettier write
```

There is **no test framework** configured in this project.

## Git / commits

Husky hooks enforce:

- **pre-commit**: runs `yarn lint` and `yarn format:check` (commits fail on
  lint/type/format errors).
- **commit-msg**: commitlint with conventional-commit rules. Allowed types:
  `build, ci, chore, docs, feat, fix, perf, refactor, revert, style, test`.

## Architecture

**Stack:** React 18 + TypeScript + Vite, Font Awesome for icons, plain CSS for
styling (no UI framework). State is local component state via a custom hook — no
Redux/router needed for a single-screen app.

**Path aliases** (defined in `tsconfig.json`, resolved by `vite-tsconfig-paths`):
`@components`, `@views`, `@hooks`, `@interfaces`, `@enums`, `@utils`. Each of
these directories has an `index.ts` barrel — import from the alias root (e.g.
`import { PasswordOutput } from '@components'`), not deep paths.

**Directory roles:**

- `views/` — page-level screens. `generator/Generator.tsx` is the only screen; it
  wires the hook to the presentational components.
- `components/` — reusable, presentational UI (folder-per-component, PascalCase
  `.tsx` + matching `.css`, kebab-case folder). None hold app state; they take
  props.
- `hooks/` — `usePasswordGenerator` owns all state (length, options, password,
  copied) and exposes actions plus the `MIN_LENGTH`/`MAX_LENGTH` constants.
- `utils/` — pure functions: `generatePassword` (crypto-backed, modulo-bias free
  via rejection sampling) and `estimateStrength` (Shannon entropy → level).
- `interfaces/` — TypeScript domain types (`PasswordOptions`, `PasswordStrength`,
  `CharacterType`).
- `enums/` — shared enums (`StrengthLevel`).

**Styling:** each component owns a sibling `.css` file using BEM-ish class names;
`src/assets/styles/global.css` holds design tokens (CSS custom properties) and
the base layout. The card is capped at `max-width: 440px` so it never stretches
on ultrawide displays and collapses options to one column under 380px.

**Icons:** Font Awesome via `@fortawesome/react-fontawesome` — import individual
solid icons from `@fortawesome/free-solid-svg-icons` and render with
`<FontAwesomeIcon icon={...} />`. No emojis in the UI.

## Build & deploy

`vite build` outputs to `build/` (not `dist/`). The Dockerfile is a two-stage
build (node:24-alpine → nginx-unprivileged) that serves the static site on port
**8080**; nginx config lives in `config/nginx/`. A Jenkins pipeline lives in
`ci/jenkinsfiles/` and SonarQube config in `sonar-project.properties`.
