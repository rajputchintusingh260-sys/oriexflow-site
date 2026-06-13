# OriexFlow — Agency Website

Cinematic content. Shipped in 48 hours.

A production-ready agency site built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Three.js / React Three Fiber · GSAP ScrollTrigger · Framer Motion · Lenis**.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | TypeScript check (no emit) |

## Deploy

```bash
git init && git add -A && git commit -m "OriexFlow v1"
git remote add origin https://github.com/rajputchintusingh260-sys/oriexflow.git
git push -u origin main
```

Then import the repo on [vercel.com/new](https://vercel.com/new) — zero config needed. The site is built for `https://oriexflow.vercel.app`; when you attach a custom domain, update `SITE` in `src/app/layout.tsx` and the URLs in `src/app/sitemap.ts` / `src/app/robots.ts`.

## How to swap content (everything lives in `src/data/`)

| File | Controls |
| --- | --- |
| `src/data/projects.ts` | Portfolio grid + video modal. Supports `{ type: "youtube", id }`, `{ type: "vimeo", id }`, or `{ type: "file", src: "/videos/x.mp4" }` (drop files in `public/videos/`). Set `wide: true` to make a card span 2 columns. YouTube thumbnails are pulled automatically; add `thumbnail:` for Vimeo/local. |
| `src/data/services.ts` | Service cards: titles, checklists, prices, which 3D icon. |
| `src/data/testimonials.ts` | Quotes, names, optional `videoUrl` for video testimonials. |
| `src/data/faq.ts` | FAQ accordion items. |

Other copy (hero headline, about story, process steps, stats) lives directly in its section component under `src/components/`.

### Replace the founder photo
`src/components/about/About.tsx` currently renders a gradient placeholder. Drop `founder.jpg` into `public/` and swap the placeholder `<div>` for:

```tsx
<Image src="/founder.jpg" alt="Founder of OriexFlow" fill className="object-cover" />
```

### Contact form
The form opens a pre-filled email draft to `hello@oriexflow.com` so no lead is lost without a backend. To go serverless, point `onSubmit` in `src/components/contact/Contact.tsx` at Formspree, Resend, or an API route — the field names (`name`, `email`, `projectType`, `budget`, `message`) are ready. Prefer Calendly? Replace the form with its embed snippet.

## Fonts

- **Headings:** Clash Display, loaded via Fontshare's CSS API in `globals.css` (`font-display: swap`).
- **Body / mono:** Inter + JetBrains Mono via `next/font/google` (self-hosted at build, zero FOUT).

For fully self-hosted headings: download Clash Display woff2 from [fontshare.com](https://www.fontshare.com/fonts/clash-display), put it in `src/fonts/`, replace the `@import url(...)` in `globals.css` with a `next/font/local` setup in `layout.tsx`, and point `--font-display` at its variable.

## Performance & accessibility notes

- 3D hero is lazy-loaded, mounts only while on screen, drops poly count + antialiasing on mobile.
- `prefers-reduced-motion` disables Lenis, GSAP reveals, the preloader, cursor, and blob.
- Custom cursor only activates on fine-pointer devices; native cursor returns on form inputs.
- Video modal traps focus and closes on `Esc`; skip-to-content link included; focus rings in accent cyan.
- OG image auto-generated at `/opengraph-image`; sitemap + robots + Organization/Service JSON-LD included.

## Structure

```
src/
  app/          layout (fonts, metadata, JSON-LD), page, globals.css, OG image, sitemap, robots
  components/   one folder per section + ui/ primitives (MagneticButton, Reveal, Cursor, SmoothScroll, Marquee, Preloader)
  data/         projects · services · testimonials · faq  ← edit these
  lib/          motion.ts (shared easing & variants)
```
