# Tech stack decision (Prompt 1)

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Astro 5** | Ships plain HTML with almost no JavaScript, so pages load fast and rank well. Content collections give typed, validated copy files. |
| Content / CMS | **Markdown + YAML in Git** (`src/content/`) | Copy changes are file edits on GitHub — no developer, no database, full history and easy rollback. A visual editor (Keystatic or Decap) can be added on top later without changing the content files. |
| Styling | Hand-written CSS design system (`src/styles/global.css`) | Looks bespoke rather than template-built; no framework lock-in. |
| Hosting | **Vercel** | Already used for previous Novaamind sites; global CDN, preview URL for every change, free tier is enough to start. |
| Forms | One serverless endpoint, `/api/lead` | Handles discovery requests, gated PDFs, and newsletter sign-ups in one place. |
| Lead store | **Supabase** (`leads` table) | Already in use across your projects; free tier; becomes the pipeline (see LEADS.md). |
| Notifications | **Resend** | Instant email to the founder for every lead; free tier covers expected volume. |

## What not to use
- **WordPress + Elementor again** — slow, plugin-heavy, and the reason for the template look and Lorem Ipsum drift.
- **A headless CMS subscription (Contentful, Sanity) now** — overkill for a site with a handful of editors; adds cost and another login.
- **A heavy SPA (plain React/Vite)** — client-rendered pages are worse for SEO and slower on mobile.
- **Salesforce / HubSpot paid tiers** — premature for a 2–3 person BD team (see LEADS.md).
