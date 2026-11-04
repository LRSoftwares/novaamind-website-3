# Novaamind Website 3.0

Rebuild of novaamind.com (previously WordPress + Elementor), built from
`docs/Novaamind Website Content — Change Brief.md` and `docs/Website Rebuild Prompts.md`.

- **Stack:** Astro 5 (static HTML), plain CSS design system, one Vercel serverless function for forms. See [docs/STACK.md](docs/STACK.md).
- **Pages:** see [docs/SITEMAP.md](docs/SITEMAP.md).
- **Forms & leads:** see [docs/LEADS.md](docs/LEADS.md).

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build into dist/ + .vercel/output
```

## Changing copy (no developer needed)

All copy lives in `src/content/`. Edit the file, commit, push — Vercel rebuilds in about a minute.
The build fails with a clear message if a required field is missing or an SEO title is too long.

| To change… | Edit |
| --- | --- |
| A solution page (7) | `src/content/solutions/<slug>.md` — card copy is `summary`, SEO is `seo` |
| An industry page (3) | `src/content/industries/<slug>.md` |
| A resource title / description | `src/content/resources/<category>/<slug>.md` |
| Resource categories | `src/content/resource-categories.yaml` |
| FAQs | `src/content/faqs.yaml` |
| Insights (blog) | add a `.md` file to `src/content/insights/` (`draft: true` hides it in production) |
| Homepage hero, framework, "Why Novaamind" | `src/pages/index.astro` (copy is at the top of the file) |
| Email, LinkedIn, CTA label | `src/lib/site.ts` |
| Privacy / Terms | `src/pages/privacy-policy.md`, `src/pages/terms-of-use.md` |

### Publishing a resource
1. Put the PDF in `public/downloads/` (e.g. `public/downloads/ai-readiness-guide.pdf`).
2. In its `.md` file set `status: published` and `file: /downloads/ai-readiness-guide.pdf`.
3. Optionally write a body under the frontmatter — it appears on the page once published.

Gated PDFs ask for name, email, company and role, record the lead, then start the download.
Until a title is published, the same form becomes "notify me when it's published".

## Deploy (Vercel)

Import the folder as a new Vercel project (framework preset: Astro). Add the environment
variables from `.env.example`, point the novaamind.com domain at it, and you're live.
Old WordPress URLs (`/contact-us/`, `/salon/`, `/blogs/`) redirect to their new pages.
