# Lead capture setup (Prompt 10)

Every form posts to `/api/lead` with a `type`:

| Form | Where | Fields | What happens |
| --- | --- | --- | --- |
| `discovery` | `/contact/` | name, work email, company, role, company size, phone (opt.), area of interest, message (opt.) | Lead saved + founder emailed. Visitor sees "we reply within one working day". |
| `resource` | any resource "Notify me" / "Download" button | name, work email, company, role, resource id | Lead saved + emailed. If the PDF is published the download starts immediately; otherwise they're on the notify list. |
| `newsletter` | `/insights/` | email | Saved + emailed. |

Spam protection: hidden honeypot field. Personal email addresses (gmail etc.) get a gentle "a work email helps" prompt but are still accepted.

## 1. Supabase (the pipeline)

Run once in Supabase → SQL Editor:

```sql
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null check (type in ('discovery','resource','newsletter')),
  name text, email text not null, company text, role text, company_size text,
  phone text, interest text, message text, resource text, source text, page text,
  stage text not null default 'new'
    check (stage in ('new','contacted','discovery_booked','proposal','won','lost','nurture')),
  owner text, notes text
);
alter table public.leads enable row level security;  -- no public policies: only the server key can write/read
```

Then set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel. The Supabase table editor
(filter by `stage`) is a perfectly good pipeline for a 2–3 person BD team to start.

## 2. Resend (instant founder alert)

Create a free Resend account, verify the novaamind.com domain, then set
`RESEND_API_KEY`, `LEAD_NOTIFY_TO` (comma-separated), and `LEAD_NOTIFY_FROM`
(e.g. `Novaamind Website <website@novaamind.com>`). Replies go straight to the lead.

## 3. Recommended follow-up sequence

| When | Discovery request | Resource / newsletter |
| --- | --- | --- |
| Immediately | Founder email alert; on-page confirmation | On-page confirmation (+ download if published) |
| Within 1 working day | Personal reply from Raghav with 2–3 time slots | — |
| Day 3 (no reply) | One short follow-up | — |
| On publish | — | Email with the resource |
| Monthly | — | Insights email (1–2 per month) |

WhatsApp / Slack alert: add a Supabase Database Webhook on `leads` insert → a Slack incoming
webhook, or use a free Zapier/Make zap ("New Supabase row → Slack / WhatsApp"). No code change needed.

## 4. LinkedIn

Use LinkedIn Lead Gen Forms for any paid posts and connect them to the same `leads` table with
Zapier/Make ("New LinkedIn lead → Supabase insert", `source = linkedin`). Leads from
conversations: add them by hand in the Supabase table with `source = linkedin-dm`.

## When to upgrade
Move to a CRM (HubSpot free, Zoho Bigin, or Pipedrive) once there are more than ~30 open
conversations a month or more than one person owning follow-ups.
