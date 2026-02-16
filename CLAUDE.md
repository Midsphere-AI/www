# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Production marketing website for **midsphere.ai** — an autonomous AI agent platform. Built with Astro.js, TypeScript, and Tailwind CSS v4. Includes a Markdown-based blog optimized for SEO and GEO (Generative Engine Optimization).

Reference `DESIGN.md` for design philosophy, tokens, and component guidelines (note: DESIGN.md describes the Zen Browser site this design was adapted from — not all packages listed there are used here).

## Commands

```bash
npm run dev       # Start dev server (localhost:4321)
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

No test runner or linter is configured.

## Architecture

**Astro 5.x static site** with islands architecture. Zero client-side JS by default — interactivity uses `is:inline` scripts in BaseLayout for theme toggle, scroll-triggered animations, and an IntersectionObserver.

### Layout Chain

```
Page (e.g. index.astro)
  → PageLayout (adds Navbar, skip-to-content, <main>, Footer)
    → BaseLayout (adds <html>, SEOHead, global.css, theme/animation scripts)
```

Blog posts use `BlogLayout` which wraps `BaseLayout` directly (no Navbar/Footer from PageLayout).

### Landing Page Section Order

Defined in `src/pages/index.astro`:
```
Navbar → Hero → Features → Finetune → Integrations → Benchmarks → Pricing → FAQ → Footer
```

FAQ data is defined in `index.astro` frontmatter and passed through `PageLayout → BaseLayout → SEOHead` for JSON-LD generation.

### Content Collections (Blog)

- Schema: `src/content.config.ts` using Astro 5 `glob()` loader pattern
- Posts: `src/content/blog/*.{md,mdx}`
- Routes: `src/pages/blog/[...id].astro` (uses `id`, not `slug`)
- Draft posts are excluded in production (`import.meta.env.PROD`)
- Frontmatter fields: `title`, `description`, `pubDate`, `updatedDate` (optional), `author`, `image` (optional), `tags`, `draft`

### SEO/JSON-LD System

`src/utils/seo.ts` exports schema generators: `organizationSchema`, `blogPostingSchema`, `breadcrumbSchema`, `faqSchema`. These are consumed by `SEOHead.astro` which renders them as `<script type="application/ld+json">`.

## Key Technical Details

### Tailwind CSS v4

Uses `@tailwindcss/vite` plugin (**not** `@astrojs/tailwind`). All design tokens are in `src/styles/global.css` inside `@theme {}` — this is where colors, fonts, and keyframe animations are defined.

### Dark Mode

- Attribute-based: `[data-theme="dark"]` on `<html>`
- CSS custom properties toggle in `global.css` (`:root` vs `[data-theme="dark"]`)
- Detected via `localStorage.getItem('theme')` → `prefers-color-scheme` → `'light'` fallback
- Inline script in BaseLayout runs before paint to prevent flash

### Animation System

CSS-only animations triggered by IntersectionObserver (no JS animation library):

- `[data-animate]` → `zenReveal` (blur + translate + opacity)
- `[data-animate="fade"]` → `zenFade` (blur + opacity)
- `[data-animate="scale"]` → `zenScale` (blur + scale + opacity)
- `[data-delay="1-6"]` → staggered animation delays (0.15s increments)
- `.hero-child` with `--hero-delay` CSS var → hero entrance on page load
- All animations respect `prefers-reduced-motion: reduce`

### Colors

| Token | Light | Dark |
|-------|-------|------|
| `paper` | `#f2f0e3` | `#1f1f1f` |
| `dark` | `#2e2e2e` | `#d1cfc0` |
| `coral` | `#F76F53` | — |
| `zen-blue` | `#6287f5` | — |
| `zen-green` | `#63f78b` | — |

### Typography

- **Body**: Bricolage Grotesque (variable, weights 400–700) via `@fontsource`
- **Display headings**: Junicode (self-hosted woff2 in `public/fonts/`), Roman + Italic variants
- Italic headings use `h1 .italic` with baked-in italic font file (`font-style: normal`)

## Coding Standards

- **Zero JS by default** — use Astro components, only `is:inline` for essential interactivity
- **Tailwind only** — no inline styles or per-component CSS (except `global.css`)
- **Semantic HTML** — `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<header>`
- **Type safety** — strict TypeScript, typed `Props` interfaces on all components
- **Class merging** — use `cn()` from `src/utils/merge.ts` (clsx + tailwind-merge) when components accept class overrides

## Key Content

- **Site URL**: `https://midsphere.ai`
- **Platform URL**: `https://platform.midsphere.ai` (CTA destination)
- **Company**: Hazel Communications Private Limited, India
- **Pricing tiers**: Free ($0), Lite ($9/mo), Pro ($19/mo) — defined in `Pricing.astro`

## GEO (Generative Engine Optimization)

For blog posts: use clear H2/H3 headings, entity-rich writing, FAQ sections with `<details>`/`<summary>`, specific statistics, JSON-LD schema on every post, internal cross-links, and `updatedDate` in frontmatter for freshness signals.
