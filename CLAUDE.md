# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/academic website for Ian Hunt-Isaak, built with **Astro 5** + **Tailwind CSS v4**. Deployed to GitHub Pages at `www.ianhuntisaak.com` via GitHub Actions.

## Build Commands

```bash
npm run dev          # Local dev server with live reload (port 4321)
npm run build        # Production build (outputs to ./dist)
npm run preview      # Preview production build locally
```

## Deployment

Push to `main` triggers GitHub Actions (`.github/workflows/gh-pages.yml`) which runs `npm ci && npm run build` and deploys `dist/` to GitHub Pages using `actions/deploy-pages`. Repo Pages source must be set to "GitHub Actions".

## Architecture

- **astro.config.mjs** — Astro config with Tailwind v4 via `@tailwindcss/vite`
- **src/pages/** — File-based routing (`.astro` and `.md` files)
  - `index.astro` — Homepage with bio, projects, and open source work
  - `blog/` — Blog index + `[...slug].astro` dynamic route + `tags/[tag].astro`
  - `tools.astro` — Tools page with expandable cards
  - `contact.astro` — Contact page
  - `webserver-instrument-control.md` — Markdown page using BaseLayout
- **src/layouts/** — `BaseLayout.astro` (HTML shell, dark mode init, header/footer)
- **src/components/** — Astro components (Header, Footer, ThemeToggle, ProjectList, ToolCard, SocialLinks, PostList)
- **src/content/** — Astro content collections
  - `blog/` — Blog posts (markdown with frontmatter: title, date, description, tags, draft)
- **src/content.config.ts** — Content collection schema definitions
- **src/data/** — JSON data files (`projects.json`, `contributions.json`, `tools.json`)
- **src/styles/global.css** — Tailwind v4 config, custom theme colors, font imports
- **public/** — Static assets copied verbatim to build output (`CV.pdf`, `favicon.ico`, `CNAME`, `images/`)

## Key Design Decisions

- **Dark mode**: Class-based (`dark` on `<html>`), persisted to `localStorage`, falls back to `prefers-color-scheme`. Inline script in `<head>` prevents FOUC.
- **Signature colors**: Rose `#d44375` (primary/links) and emerald `#2bbc8a` (hover accent), defined as `--color-rose-brand` and `--color-emerald-brand` in Tailwind theme.
- **Icons**: Lucide via `lucide-astro` (tree-shakeable SVGs).
- **Font**: JetBrains Mono via `@fontsource/jetbrains-mono` (400/700 weights only).
- **Blog**: Content collection with Zod schema validation. Posts with `draft: true` are excluded from production builds. Tags support via dynamic routes.
