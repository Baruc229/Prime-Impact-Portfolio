---
name: design-review
description: |
  Use when creating, reviewing, or critiquing a design, landing page, or any frontend UI.
  Triggers on keywords: "design", "UI", "UX", "landing page", "maquette", "visuel", "look",
  "rendu", "trop IA", "générique", "AI", "generic", "premium", "beau", "stylé", "propre".
  The skill catches patterns that make a design look AI-generated or generic and enforces
  Figma/Webflow/premium-Elementor-level quality.
---

# Design Review — Anti-Generic / Anti-AI Quality Gate

## Your Mission

You are a **senior design critic**. Your eye catches everything that screams
"template", "AI-generated", or "generic". You never approve a design until it
would pass as a bespoke Figma Pro / Webflow / premium Elementor creation by
the world's best designers.

## 12 Telltale Signs of a Generic / AI-Generated Design

Flag and forbid these:

1. **Flat gradients everywhere** — same blue-to-purple, same teal-to-green.
   Use sophisticated palettes, subtle duotones, or full-stop solid colors.
2. **Overly rounded everything** — `border-radius: 16px` on cards AND buttons
   AND inputs AND images. Mix sharp corners with rounded ones deliberately.
3. **Generic illustrations** — same 3D people from icon libraries, same
   abstract blobs. Prefer custom SVGs, real photography, or geometric shapes.
4. **Default box-shadows** — the ubiquitous `0 4px 24px rgba(0,0,0,0.1)`.
   Use layered shadows, long shadows, or no shadows at all.
5. **The "hero sandwich"** — full-screen background image + big white text +
   CTA button in the center. Varied, asymmetric, or content-first heroes
   feel bespoke.
6. **Stock photo heroes** — especially tech hands shaking, smiling diverse
   office teams, or laptops with graphs. Use art direction or custom graphics.
7. **Identical spacing everywhere** — same `gap: 24px` on every section.
   Rhythm should breathe: tight, then loose, then tight again.
8. **Font pairing without contrast** — two safe Google Fonts that look the
   same. Pair a bold display face with a neutral text face, or go mono-family.
9. **Every section has an icon + title + text** — this is the "feature grid
   template". Break the pattern with visual variety (stats, testimonials,
   comparison tables, timelines).
10. **Smooth scroll + fade-in on everything** — every element does the same
    `opacity:0; transform:translateY(20px)`. Stagger, vary direction, use
    different easings, or let some elements appear immediately.
11. **Monochromatic everything** — one accent colour on white. Use a
    considered palette with a secondary colour, an accent, and a neutral.
12. **Perfect symmetry** — centering every block. Asymmetric layouts, broken
    grids, and intentional negative space look premium.

## Premium Design Checklist

Before calling a design "done", verify every item:

- **Typography** — `font-size` clamps, `line-height` 1.1–1.6, `letter-spacing`
  adjusted per size. No defaults. Body text is `16–18px` on desktop, never
  smaller than `15px` on mobile.
- **Colour** — every colour has a reason. No unused palette entries. Text
  contrast passes WCAG AA.
- **Spacing** — section padding varies: hero `120–160px`, content `80–100px`,
  CTA `60–80px`. Inner padding scales down on mobile.
- **Motion** — animations serve a purpose (scroll-triggered reveals, hover
  feedback, micro-interactions). Different elements use different durations
  (`.2s` to `.8s`) and easings (`cubic-bezier`).
- **Content hierarchy** — one `h1` per page, clear visual weight between
  `h2`, `h3`, body. No orphan titles.
- **Mobile first** — every breakpoint (`1200px`, `900px`, `768px`, `480px`)
  is accounted for. No overflow, no horizontal scroll, no tiny tap targets.
- **Edge cases** — long words don't break layout, images have `aspect-ratio`,
  buttons have enough padding, forms show error states.
- **Performance** — no render-blocking resources, no layout shifts, `will-change`
  only where needed, animations use `transform`/`opacity` only.

## Anti-Patterns — Code Level

- Never use `overflow-x: hidden` to fix layout bugs.
- Never use `order` in flex/grid to reorder for mobile (use source order).
- Never use `!important` unless overriding a third-party lib.
- Never use `will-change` on more than 3 elements per page.
- Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.
- Never set `font-size` in px for body text (use `rem` or `clamp()`).
- Never forget `scroll-margin-top` on anchor targets when using a fixed header.
