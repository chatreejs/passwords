# passwords

A simple, friendly password generator with a Duolingo-inspired UI.

- Length slider (1–50)
- Toggle uppercase, lowercase, numbers, and symbols
- Copy button, live strength meter, and regenerate
- Cryptographically secure randomness (`crypto.getRandomValues`, modulo-bias free)
- Font Awesome icons throughout (no emoji)
- Responsive: capped width for ultrawide screens, tuned for mobile

## Stack

React + TypeScript + Vite. Node 24 (pinned via `.tool-versions`), Yarn Classic.
Path aliases, barrel exports, husky + commitlint + eslint + prettier — same
project conventions as the sibling `smarthome` app.

## Project structure

```
src/
├── assets/styles/global.css      design tokens + base layout
├── components/                   presentational UI (folder-per-component + .css)
│   ├── character-options/
│   ├── length-slider/
│   ├── password-output/
│   └── strength-meter/
├── enums/                        StrengthLevel
├── hooks/                        usePasswordGenerator (all state)
├── interfaces/                   PasswordOptions, PasswordStrength
├── utils/                        generatePassword, estimateStrength (pure)
├── views/generator/             the single screen
├── App.tsx
└── main.tsx
```

## Local development

```bash
asdf install          # installs Node 24 from .tool-versions
yarn install
yarn start            # http://localhost:3000
```

Other scripts:

```bash
yarn build            # type-check + production build to build/
yarn preview          # preview the production build
yarn lint             # eslint + tsc --noemit
yarn format:write     # prettier
```

## Docker

Multi-stage build that compiles the app and serves it with nginx (unprivileged,
port 8080).

```bash
docker build -t passwords .
docker run --rm -p 8080:8080 passwords   # http://localhost:8080
```
