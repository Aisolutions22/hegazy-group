
# Hegazy Group — Foundation Build Plan

Scope: design tokens, RTL-ready global shell (header + footer), and homepage structural skeleton. No individual content pages. No manufacturing language. No pricing/cart. No fabricated stats.

## 1. Design tokens (`src/styles.css`)

Replace the current shadcn-default token block with an industrial token system, keeping shadcn semantic aliases wired via `@theme inline` so existing UI primitives still work.

- Add raw brand tokens under `:root`:
  - Graphite: `--graphite-900 #14181C`, `--graphite-800 #1F262C`
  - Steel: `--steel-600`, `--steel-400`, `--steel-200`, `--steel-100`
  - Surface: `--offwhite-50 #F6F7F8`, `--white #FFFFFF`
  - Accent: `--accent-700 #0B4D8C`, `--accent-600 #0F5FA8`, `--accent-100 #E6F0F9`
  - Status: `--success-600 #1E7A4C`, `--warning-600 #B9740B`, `--danger-600 #B4232C`
- Map shadcn semantic tokens to brand values (light theme only for now):
  - `--background → offwhite-50`, `--foreground → graphite-900`
  - `--card → white`, `--border/--input → steel-200`
  - `--primary → accent-700` (`--primary-foreground → white`)
  - `--muted → steel-100`, `--muted-foreground → steel-600`
  - `--ring → accent-600`, `--destructive → danger-600`
- Register brand tokens as Tailwind utilities via `@theme inline` (e.g. `--color-graphite-900`, `--color-accent-600`, `--color-steel-200`, etc.) so `bg-accent-600`, `text-graphite-900`, `border-steel-200` are usable.
- Radius scale capped at 12px: override `--radius` to `0.5rem` and clamp derived radii; use `rounded-sm/md/lg` only.
- Spacing: use Tailwind's default 4px scale (already aligned to 4/8/12/16/24/32/48/64/96/128 via 1/2/3/4/6/8/12/16/24/32). Define utility CSS vars `--section-py` using `clamp(48px, 8vw, 96px)` for section padding.
- Typography:
  - Load Inter, IBM Plex Sans Arabic, IBM Plex Mono via `<link>` in `src/routes/__root.tsx` head (preconnect + stylesheet). Never `@import` remote URLs in CSS.
  - `@theme` font families: `--font-sans: Inter, ...`, `--font-arabic: "IBM Plex Sans Arabic", ...`, `--font-mono: "IBM Plex Mono", ...`.
  - Fluid type scale via `@theme` custom text sizes using `clamp()`: `--text-display`, `--text-h1`, `--text-h2`, `--text-h3`, `--text-body` (min 16px), `--text-small` (14px), `--text-legal` (13px).
  - Base `body { font-size: 1rem; }` — enforce 16px minimum.
  - Auto-swap to Arabic font when `html[dir="rtl"]` or `[lang="ar"]`.
- Logical properties: add a `@layer base` rule guiding usage; component code uses Tailwind's logical utilities (`ps-*`, `pe-*`, `ms-*`, `me-*`, `start-*`, `end-*`, `text-start`, `border-s`, `border-e`) exclusively.
- Focus outline: base `:focus-visible { outline: 2px solid var(--accent-600); outline-offset: 2px; }` — never removed.

## 2. RTL infrastructure

- Add `LanguageContext` (`src/lib/i18n/language-context.tsx`): stores `lang: 'en' | 'ar'`, persists to `localStorage`, exposes `toggle()`. Reads value inside `useEffect` (avoid SSR hydration mismatch) and sets `document.documentElement.lang` + `dir` on change.
- Provider mounted inside `RootComponent` in `__root.tsx`.
- Minimal string dictionary (`src/lib/i18n/strings.ts`) for header/footer/homepage labels in EN + AR — all user-visible copy in the shell goes through `t(key)`.
- No third-party i18n library — a small custom hook keeps bundle lean.

## 3. Global header (`src/components/layout/site-header.tsx`)

Composition:
- `UtilityBar`: phone (`tel:`), WhatsApp (`https://wa.me/…` placeholder), Locations link, EN/AR toggle. Aligned to `end` via `ms-auto` (auto-mirrors).
- `MainHeader`: logo (start), primary nav (center, desktop only), search icon button + "Request a Quote" `Button` (end).
- `MegaMenu` (desktop, ≥1024px): built on shadcn `NavigationMenu`. Products panel = 4 columns (Profiles / Flat / Long / Catalog CTA). Industries, Projects, Resources, About render as simple links or small panels.
- Sticky behavior via `useScrollDirection` hook: scroll-down → hide utility bar + reduce main header height (`h-20 → h-14`) with `transition-all`; scroll-up → restore. Uses `position: sticky; top: 0`.
- Transparent-over-hero variant: header accepts `variant="transparent" | "solid"`; homepage passes `transparent` and switches to `solid` after `window.scrollY > 80`.
- Mobile (<1024px): hamburger button opens `Sheet` from `side="start"` (mirrors under RTL). Accordion sections via shadcn `Accordion`. A fixed bottom bar (`fixed bottom-0 inset-inline-0`) shows "Request a Quote" CTA.
- Accessibility:
  - First DOM child of `<body>` is a `SkipToContent` link → `#main-content`.
  - All interactive elements use shadcn primitives (Radix — ARIA correct).
  - Icon-only buttons get explicit `aria-label`.
  - Focus outline inherits from base rule.

## 4. Global footer (`src/components/layout/site-footer.tsx`)

- 5-column grid at `lg:` (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-5`): Products, Industries, Company, Resources, Contact.
- Links are placeholders to future routes (`/products`, `/industries`, etc.) — created as anchors now, converted to `<Link>` once routes exist.
- Bottom bar: legal links (Privacy / Terms / Cookies), copyright line, certification badge placeholders (`[BADGE-PLACEHOLDER]` boxes with `aria-label`).
- All text ≥14px except legal line (13px).

## 5. Homepage skeleton (`src/routes/index.tsx`)

Rewrite the placeholder index. Sections, each a small local component in `src/components/home/`:

1. `<SiteHeader variant="transparent" />` (fixed at top).
2. `HomeHero`: full-viewport-minus-header, static background `<img>` (responsive `srcset` + `width`/`height` to prevent CLS — placeholder image reference, actual asset TBD), H1 + value-prop subhead, primary CTA "Request a Quote", secondary CTA "Explore Products". No slider.
3. `TrustStrip`: horizontal row — 4 certification badge placeholders + 3 stat blocks with values shown as `[CLIENT-INPUT-REQUIRED]` in mono font.
4. `ProductCategoryGrid`: 4 tiles (Profiles, Sheets & Plates, Bars & Rods, Coils & Foils). Each tile: image placeholder, title, one-line desc, "Explore" affordance.
5. `IndustriesGrid`: 4 tiles (Construction & Facade, Industrial Manufacturing, Marine, Automotive & Transport).
6. `WhyHegazy`: 4-column value props (distribution scale, inventory availability, technical support, logistics reach — copy phrased strictly as a distributor).
7. `FinalCTABand`: dark graphite band, "Request a Quote" primary + phone/WhatsApp secondary.
8. `<SiteFooter />`.

Section wrapper component enforces max-width 1280px, 12-col grid, `py-[var(--section-py)]`.

Update `__root.tsx` `head()` with real title/description/OG/Twitter tags for Hegazy Group.

## 6. Guardrails encoded in code

- Copy audited: no "manufacture", "factory", "produce", "we make" anywhere. Descriptions frame Hegazy as a distributor/supplier.
- No pricing, no cart, no "Add to cart" UI anywhere.
- No fabricated numbers — every stat/number/testimonial slot shows `[CLIENT-INPUT-REQUIRED]`.
- Accent color usage audited per section to stay ≤ ~15% of viewport area (CTAs + small highlights only; large surfaces stay graphite/steel/off-white).

## Technical notes

- Stack: TanStack Start + Tailwind v4 + shadcn (already installed). No new frameworks.
- New dependencies: none required (fonts via `<link>`, icons via existing `lucide-react`).
- File additions:
  - `src/lib/i18n/{language-context.tsx,strings.ts,use-translation.ts}`
  - `src/hooks/use-scroll-direction.ts`
  - `src/components/layout/{site-header.tsx,site-footer.tsx,utility-bar.tsx,mega-menu.tsx,mobile-nav.tsx,skip-to-content.tsx,section.tsx}`
  - `src/components/home/{hero.tsx,trust-strip.tsx,product-grid.tsx,industries-grid.tsx,why-hegazy.tsx,final-cta.tsx}`
- File edits: `src/styles.css`, `src/routes/__root.tsx`, `src/routes/index.tsx`.
- Verification after build: view rendered homepage at 390px (current viewport) and 1440px via Playwright, confirm RTL mirror by toggling language, confirm sticky header collapse, confirm focus outlines visible.

## Out of scope (future steps)

- Product listing / detail pages, Industries pages, Projects, Resources, About, Contact/Quote form.
- Real imagery, real certifications, real stats (client-supplied).
- Dark mode (not requested; industrial brand ships light-first).
