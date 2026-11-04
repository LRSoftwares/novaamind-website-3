# Website Rebuild Prompts

Use these prompts in sequence to rebuild the Novaamind website as a dynamic, modern site. Each prompt is self-contained — paste it into Claude with the relevant context and it will produce the output described.

---

## How to use this

1. Work through prompts in order — each builds on the previous
2. Paste the prompt exactly, then add any specific details asked for
3. Each prompt produces either code, copy, or a decision — noted in the label

---

## Prompt 1 — Site Architecture & Tech Stack

*Output: Decision document*

```
I am rebuilding the Novaamind website (novaamind.com) as a dynamic, modern site. Novaamind is a 6-month-old enterprise AI transformation company based in Chennai, India. Current site is WordPress + Elementor.

Recommend the best tech stack for a dynamic site that:
- Is fast, SEO-friendly, and easy to update without a developer for copy changes
- Supports a Resources section with gated PDF downloads
- Supports a Blog/Insights section
- Has a Contact / Lead capture form connected to a CRM or email
- Can scale as we add case studies, whitepapers, and new service pages
- Looks enterprise-grade (not a template)

Give me: recommended stack, hosting, CMS, and a brief reason for each choice. Also flag what we should NOT use and why.
```

---

## Prompt 2 — Full Site Map

*Output: Sitemap with all pages and URLs*

```
Build a complete sitemap for the Novaamind website. The company is an enterprise AI transformation firm with these offerings:

Solutions: Enterprise AI Strategy, AI Workforce Transformation, AI Process Automation, Decision Intelligence, Enterprise Knowledge Systems, AI Agents, Forward Deployed Engineers

Industries served: Salon & Spa, Retail, Education

Resources: Executive Guides, Research Reports, Whitepapers, Case Studies, Decision Intelligence Frameworks, AI Transformation Playbooks, Enterprise Architecture Guides

Company: About, Our Work, Contact, LinkedIn

Rules:
- Each Solution gets its own page
- Each Industry gets its own page
- Resources section has a hub page + individual resource pages (gated PDFs)
- Blog/Insights section
- Legal: Privacy Policy, Terms of Use

Output: a clean sitemap with page names, URLs, and one-line description of what each page does.
```

---

## Prompt 3 — Homepage Layout & Copy

*Output: Full homepage wireframe + copy*

```
Write the complete homepage for Novaamind — an enterprise AI transformation company based in India, 6 months old, working with clients like Naturals Salon & Spa, BAE by Naturals, and Learning Room Digital.

Sections to include, in this order:
1. Hero — headline, sub-headline, body copy, 2 CTAs
2. Trusted By — logo strip (placeholder labels)
3. What We Build — 7 service cards: Enterprise AI Strategy, AI Workforce Transformation, AI Process Automation, Decision Intelligence, Enterprise Knowledge Systems, AI Agents, Forward Deployed Engineers
4. Transformation Framework — 6 steps: Discover, Assess, Design, Build, Enable, Optimize
5. Why Novaamind — 5 differentiator cards
6. Resources — section intro + 7 content category links
7. Footer — tagline, nav columns, LinkedIn only (no other social)

Tone: enterprise, confident, specific — no jargon, no filler. Think McKinsey clarity meets a modern AI firm.

For Forward Deployed Engineers specifically, use this description:
"A Novaamind engineer embedded in your team full-time, working alongside your people to identify problems and build solutions on the ground."

Output: section-by-section copy, ready to paste into a developer handoff.
```

---

## Prompt 4 — Forward Deployed Engineers Page

*Output: Full service page copy*

```
Write the full service page for "Forward Deployed Engineers" on the Novaamind website.

Context:
- Novaamind is an enterprise AI transformation company
- Forward Deployed Engineers (FDEs) are Novaamind engineers who embed full-time inside a client's team, work alongside their people, identify operational problems, and build AI solutions on the ground
- This is different from traditional consulting — the FDE is not remote or advisory, they are physically present and building
- For Naturals Salon (a 600+ franchise chain), the FDE worked directly with senior management to identify decision-making gaps and build an operational intelligence platform

Page sections:
1. Hero — headline + 2-line description
2. What is a Forward Deployed Engineer — 3-4 paragraphs explaining the model
3. How it works — 4-5 step process (embed → discover → build → handover)
4. Why it works — 3 key reasons with specifics
5. Who it's for — 3 client profiles (types of companies that benefit most)
6. Case study reference — 1 paragraph on Naturals Salon as proof
7. CTA — book a discovery session

Tone: direct, confident, enterprise. No buzzwords.
```

---

## Prompt 5 — Individual Solution Pages (repeat per service)

*Output: Copy for one solution page at a time*

```
Write the full service page for "[SERVICE NAME]" on the Novaamind website.

Novaamind context: Enterprise AI transformation company, India-based, 6 months old, working through senior networks with mid-market and enterprise clients.

Service description: [PASTE FROM THE "WHAT WE BUILD" TABLE IN TAB 1]

Page sections:
1. Hero — headline + 1-line description
2. The problem this solves — 2-3 paragraphs on what breaks without this service
3. What Novaamind builds — specific deliverables (3-5 bullet points)
4. How we deliver it — 3-4 step process
5. Business outcomes — 3 measurable outcomes clients can expect
6. Who this is for — ideal client profile
7. CTA — Book an Executive AI Discovery Session

Tone: enterprise, specific, outcome-focused. No generic AI claims.
```

*Repeat this prompt for each of the 7 services, replacing \[SERVICE NAME\] and the description each time.*

---

## Prompt 6 — Industry Pages (repeat per industry)

*Output: Copy for one industry page at a time*

```
Write the full industry page for "[INDUSTRY]" on the Novaamind website.

Novaamind builds AI transformation systems for enterprise clients. For [INDUSTRY], we have worked with [CLIENT NAME] to build [BRIEF DESCRIPTION OF WHAT WAS BUILT].

Page sections:
1. Hero — industry-specific headline
2. The AI challenge in [INDUSTRY] — 3 specific operational problems this industry faces
3. What Novaamind builds for [INDUSTRY] — 4-5 specific solutions
4. Case study reference — 1 paragraph (use client name + outcome)
5. Services most relevant to this industry — list with 1-line descriptions
6. CTA

Industry + client details to use:
- Salon & Spa → Naturals Salon & Spa, 600+ franchise locations, built operational intelligence platform covering royalty, inventory, workforce, and executive reporting
- Education → Learning Room Academy, K-12 coaching, built academic intelligence platform for admissions, learning analytics, student performance
```

---

## Prompt 7 — Resources Hub Page

*Output: Hub page copy + content briefs*

```
Write the Resources hub page for Novaamind and a 300-word content brief for each of the following pieces. These will be published as gated PDFs or long-form articles over the next 6 months.

Content pieces by category:

Executive Guides:
1. The Enterprise AI Readiness Guide
2. AI Decision Intelligence for CEOs
3. Building an AI-Native Organization: A Leader's Playbook

Research Reports:
1. State of AI Adoption in Indian Enterprises 2025
2. The Hidden Cost of Disconnected Data in Franchise Operations
3. AI Workforce Readiness Index: Retail, Education & Services

Whitepapers:
1. Enterprise Knowledge Systems: Architecture & Governance
2. Decision Intelligence Architecture for Multi-Unit Businesses
3. Forward Deployed AI: Embedding Intelligence in Business Operations

For each piece, give me:
- 2-sentence description (for the website card)
- Target reader
- 5 key sections the content should cover
- Recommended format: gated PDF or free article
```

---

## Prompt 8 — Component Library Brief

*Output: Developer brief for reusable UI components*

```
Create a component library brief for the Novaamind website rebuild. The site is enterprise-facing, India-based AI transformation company.

Brand tone: confident, modern, minimal — not startup-playful, not legacy-corporate. Think Palantir meets a boutique consultancy.

List every reusable component needed for the full site, grouped by type:
1. Navigation (desktop + mobile)
2. Hero variants (full-width, split, minimal)
3. Cards (service card, resource card, case study card, team card)
4. Sections (logo strip, stats bar, step/process, CTA banner, FAQ accordion)
5. Forms (contact, resource download/gated, newsletter)
6. Footer

For each component specify:
- Name
- Where it's used
- Key states (default, hover, active, mobile)
- Any dynamic behaviour (e.g. accordion opens, card flips, counter animates)
```

---

## Prompt 9 — SEO Foundation

*Output: Meta titles, descriptions, and keyword map*

```
Create the SEO foundation for the Novaamind website. Novaamind is an enterprise AI transformation company based in Chennai, India. Primary services: Enterprise AI Strategy, AI Workforce Transformation, Decision Intelligence, AI Process Automation, Enterprise Knowledge Systems, AI Agents, Forward Deployed Engineers.

Target audience: CEOs, COOs, and senior leadership at mid-market and enterprise companies in India (500–5,000 employees) in Retail, Salon & Hospitality, and Education sectors.

For each of the following pages, write:
1. SEO page title (under 60 characters)
2. Meta description (under 155 characters)
3. Primary keyword (1)
4. Secondary keywords (3–5)
5. One internal linking recommendation

Pages:
- Homepage
- Each of the 7 solution pages
- Each of the 3 industry pages
- Resources hub
- About
- Contact
```

---

## Prompt 10 — Lead Capture & CRM Setup

*Output: Form fields, automation logic, and CRM recommendation*

```
Design the lead capture system for the Novaamind website. Novaamind sells enterprise AI transformation engagements — average deal size is large, sales cycle is relationship-driven, and the team is small (6 months old, working through senior networks).

Design:
1. Contact / Discovery Session form — fields, validation, confirmation message
2. Resource download form (gated PDFs) — fields + what triggers delivery
3. Recommended CRM or lightweight pipeline tool for a 2-3 person BD team
4. Automation sequence: what happens after each form submission (immediate email, follow-up, Slack/WhatsApp alert to founder)
5. LinkedIn integration — how to connect LinkedIn leads to the same pipeline

Keep it lean — we do not need Salesforce. Recommend tools that are fast to set up and free or low-cost to start.
```
