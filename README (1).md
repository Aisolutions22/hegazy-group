# Hegazy Group — Corporate Website

Official corporate B2B website for **Hegazy Group**, an aluminum supply & distribution company. The site targets enterprise-grade design and UX comparable to industry leaders (ABB, Hilti, Schneider Electric, Bosch Professional).

> ⚠️ Hegazy Group **distributes** aluminum — it does **not** manufacture it. This distinction is core to the brand and must be respected in any content or copy changes.

---

## 🌐 Live Preview

Built and iterated in [Lovable](https://lovable.dev), synced automatically to this GitHub repository.

- **Live preview:** [hegazy-group.lovable.app](https://hegazy-group.lovable.app/)
- **Production URL:** _not yet deployed to a permanent domain — pending client server setup_

---

## ✨ What This Site Does

- Presents Hegazy Group's product catalog, industries served, and company profile to B2B buyers.
- Every conversion path leads to a **Request for Quote (RFQ)** or direct contact — there is intentionally **no shopping cart, checkout, or public pricing**.
- Built bilingual from the ground up: **English / Arabic**, with full right-to-left (RTL) layout support.

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React + [TanStack Router](https://tanstack.com/router) |
| Styling | Tailwind CSS (custom design-token theme, no hardcoded values) |
| UI Primitives | Radix UI / shadcn-ui |
| Backend / Data | Supabase (data storage; no authenticated admin layer yet) |
| Form Validation | Zod |
| Hosting (current) | Lovable → GitHub |
| Hosting (planned) | Client's own production server |

---

## 📄 Project Status

This project is under active development. A detailed, running log of what's actually implemented (vs. originally planned) is maintained internally in the project's requirements documentation — ask the project owner if you need the full status log.

**High-level status:**
- ✅ All primary routes are live (Home, About, Products, Product Detail, Industries, Projects, Resources, Contact, Quote/RFQ, legal pages).
- ✅ Header/navigation, mega-menu, mobile drawer, and design system tokens are fully implemented.
- ✅ RFQ form is functional and validated server-side (Zod), with basic persistence.
- ⚠️ Several sections still use **placeholder content** (product images, certifications, real contact details, project case studies) pending real assets from the client.
- ⚠️ Language toggle (EN/AR) exists in the UI but full bilingual content + RTL runtime verification is still in progress.
- ⚠️ Site search is not yet functional (icon is currently decorative).
- ❌ No admin/CMS login — all content changes go through the development workflow (Lovable → GitHub), not a client-facing dashboard.

---

## 🚀 Getting Started (Local Development)

```bash
# 1. Clone the repository
git clone <this-repo-url>
cd <repo-folder>

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

The app will start locally (check the terminal output for the exact port, typically `http://localhost:5173` or `http://localhost:8080`).

### Environment Variables

This project uses Supabase. You'll need a `.env` file (never commit this) with your own Supabase project credentials:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## 📁 Project Structure (high level)

```
src/
  components/     → Reusable UI components (header, footer, product cards, forms, etc.)
  routes/         → TanStack Router route files (one file per page/route)
  lib/            → Utilities, data helpers, catalog data
  integrations/   → Supabase client setup
  styles/         → Global styles & design tokens
```

---

## 🛠️ Making Changes

- Preferred workflow: make changes in **Lovable**, which syncs automatically to this repo.
- If editing directly in GitHub or locally: work on a feature branch, then open a pull request rather than pushing straight to `main`, so changes stay reviewable.

---

## 📌 Known Limitations / Next Steps

- Replace all placeholder content (images, certifications, contact info, project case studies) with real client-supplied assets.
- Complete full RTL verification across all interactive components.
- Wire RFQ submissions to a real email/CRM destination.
- Build real site search.
- Add SEO polish: canonical tags, `og:url`, `Organization`/`Product` structured data.

---

## 📜 License

Private/proprietary — all rights reserved by Hegazy Group. Not licensed for public reuse or redistribution.

## 📞 Contact

For questions about this codebase, contact the development team or project owner.
