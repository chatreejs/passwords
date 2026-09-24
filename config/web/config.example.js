// Runtime config template — copy this to config.local.js (and config.<mode>.js) for local dev.
// Served at /config.js by the Vite dev server for `yarn start`.
// DEV ONLY: none of these files are included in the production build (deploy injects its own config.js).
globalThis.__CONFIG__ = {
  env: 'local',
  baseUrl: 'http://localhost:3000',
};
