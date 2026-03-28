# Kriva Pictures

A photography portfolio website showcasing creative visual storytelling through a modern, responsive web experience.

## Tech Stack

- **Frontend** — React 19, React Router
- **Build Tool** — Create React App
- **Hosting** — Cloudflare Pages
- **CI/CD** — GitHub Actions

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Opens the app at [http://localhost:3000](http://localhost:3000) with hot reload enabled.

## Environment Configuration

The project supports multiple environments via `env-cmd`:

| Environment | Config File | Build Command        |
| ----------- | ----------- | -------------------- |
| Test        | `.env.test` | `npm run build:test` |
| QA          | `.env.qa`   | `npm run build:qa`   |
| Production  | `.env.prod` | `npm run build:prod` |

## Deployment

Deployments are handled through GitHub Actions workflows:

- **Test** — Triggered on pushes to `main` and `f/**` feature branches
- **QA** — Triggered on release creation
- **Production** — Manual deployment using a specific release tag

## License

All rights reserved © Kriva Pictures
