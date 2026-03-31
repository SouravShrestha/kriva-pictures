# Kriva Pictures

A photography portfolio website showcasing creative visual storytelling through a modern, responsive web experience.

## Tech Stack

- **Frontend** — Next.js 15, React 19
- **Styling** — Tailwind CSS
- **Media** — Cloudinary
- **Hosting** — Cloudflare Pages, GitHub Pages
- **CI/CD** — GitHub Actions

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Opens the app at [http://localhost:3000](http://localhost:3000) with hot reload enabled.

## Environment Configuration

The project supports multiple environments via `env-cmd`:

| Environment | Config File  | Dev Command           | Build Command         |
| ----------- | ------------ | --------------------- | --------------------- |
| Test        | `.env.test`  | `pnpm preview:test`   | `pnpm build:test`     |
| QA          | `.env.qa`    | `pnpm preview:qa`     | `pnpm build:qa`       |
| Production  | `.env.prod`  | `pnpm preview:prod`   | `pnpm build:prod`     |

## Deployment

| Target           | Command              | Description                        |
| ---------------- | -------------------- | ---------------------------------- |
| Cloudflare Pages | `pnpm deploy:cf`     | Builds and deploys via OpenNext    |
| GitHub Pages     | `pnpm deploy:gh`     | Builds static export to `out/`     |

CI/CD via GitHub Actions:

- **Test** — Triggered on pushes to `main` and `f/**` feature branches
- **QA** — Triggered on release creation
- **Production** — Manual deployment using a specific release tag

## License

All rights reserved © Kriva Pictures
