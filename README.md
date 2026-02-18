<div align="center">

# midsphere.ai

**The marketing site for an autonomous AI agent platform.**

Built with Astro, TypeScript, and Tailwind CSS v4 — zero client-side JavaScript by default.

[![Deploy to DigitalOcean](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/Midsphere-AI/www/tree/master)

[![Astro](https://img.shields.io/badge/Astro-5.x-bc52ee?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-F76F53?style=flat-square)](LICENSE)

</div>

---

## Overview

This is the production website for [midsphere.ai](https://midsphere.ai) — a platform for building, deploying, and managing autonomous AI agents. The site is a static Astro build with islands architecture, Markdown-based blog with full SEO/JSON-LD support, and a warm, minimal design system.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | [Astro 5.x](https://astro.build) — static output, islands architecture |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` |
| **Typography** | Bricolage Grotesque (body) + Junicode (display headings) |
| **Content** | Markdown/MDX content collections with draft support |
| **SEO** | JSON-LD schemas (Organization, BlogPosting, FAQ, Breadcrumb) |
| **Deployment** | Static files — works on any CDN, edge, or container host |

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server at localhost:4321
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── global/          # Navbar, Footer, MobileMenu
│   ├── sections/        # Hero, Features, Pricing, FAQ, etc.
│   └── ui/              # Reusable UI primitives
├── content/
│   └── blog/            # Markdown/MDX blog posts
├── layouts/             # BaseLayout → PageLayout → BlogLayout
├── pages/               # File-based routing
│   ├── index.astro      # Landing page
│   └── blog/            # Blog routes
├── styles/
│   └── global.css       # Tailwind v4 @theme tokens, custom properties
└── utils/
    ├── seo.ts           # JSON-LD schema generators
    └── merge.ts         # cn() — clsx + tailwind-merge
public/
├── fonts/               # Self-hosted Junicode woff2
└── images/              # Static assets
```

## Design System

The site uses a warm, minimal aesthetic with an off-white paper tone, generous whitespace, and CSS-only animations triggered by `IntersectionObserver`.

| Token | Light | Dark |
|:------|:-----:|:----:|
| **Paper** | `#f2f0e3` | `#1f1f1f` |
| **Dark** | `#2e2e2e` | `#d1cfc0` |
| **Coral** | `#F76F53` | — |
| **Blue** | `#6287f5` | — |
| **Green** | `#63f78b` | — |

Dark mode is attribute-based (`[data-theme="dark"]`) with `localStorage` persistence and `prefers-color-scheme` fallback. An inline script runs before paint to prevent flash.

## Blog

Posts live in `src/content/blog/` as Markdown or MDX. Frontmatter schema:

```yaml
title: "Post Title"
description: "A short summary for SEO."
pubDate: 2026-01-15
author: "Author Name"
tags: ["ai", "agents"]
draft: false            # Excluded in production when true
image: "/images/og.png" # Optional
updatedDate: 2026-02-01 # Optional — freshness signal
```

Posts are optimized for **GEO** (Generative Engine Optimization) with structured headings, entity-rich content, FAQ sections, and JSON-LD on every page.

## Deploy

### DigitalOcean App Platform

Click the button at the top of this README, or:

```bash
doctl apps create --spec .do/app.yaml
```

### Any Static Host

The production build outputs to `dist/`. Deploy it anywhere that serves static files — Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3 + CloudFront, or your own Nginx.

```bash
npm run build
# Upload dist/ to your host
```

## License

[MIT](LICENSE) — Hazel Communications Private Limited
