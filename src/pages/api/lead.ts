/**
 * POST /api/lead — receives every form on the site (discovery requests,
 * gated resource requests, newsletter sign-ups).
 *
 * Runs as a Vercel serverless function. Delivery is driven by env vars, all
 * optional (see .env.example and docs/LEADS.md):
 *   - SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY → insert into `leads` table
 *   - RESEND_API_KEY + LEAD_NOTIFY_TO (+ LEAD_NOTIFY_FROM) → email the founder
 * With nothing configured, the lead is written to the server log.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

const TYPES = ['discovery', 'resource', 'newsletter'] as const;
type LeadType = (typeof TYPES)[number];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FIELDS = ['name', 'email', 'company', 'role', 'companySize', 'phone', 'interest', 'message', 'resource', 'source', 'page'] as const;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const clean = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export const POST: APIRoute = async ({ request }) => {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return json({ error: 'Invalid request.' }, 400);
  }

  // Honeypot: bots fill the hidden "website" field. Pretend success.
  if (clean(raw.website)) return json({ ok: true });

  const type = clean(raw.type) as LeadType;
  if (!TYPES.includes(type)) return json({ error: 'Unknown form.' }, 400);

  const lead: Record<string, string> = { type };
  for (const f of FIELDS) lead[f] = clean(raw[f], f === 'message' ? 2000 : 300);

  if (!EMAIL_RE.test(lead.email)) return json({ error: 'Please enter a valid email address.' }, 422);
  const required: Record<LeadType, string[]> = {
    discovery: ['name', 'company', 'role', 'interest'],
    resource: ['name', 'company', 'role', 'resource'],
    newsletter: [],
  };
  const missing = required[type].filter((f) => !lead[f]);
  if (missing.length) return json({ error: `Missing: ${missing.join(', ')}.` }, 422);

  const env = import.meta.env;
  const tasks: Promise<unknown>[] = [];

  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
    tasks.push(
      fetch(`${env.SUPABASE_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          type: lead.type, name: lead.name, email: lead.email, company: lead.company,
          role: lead.role, company_size: lead.companySize, phone: lead.phone,
          interest: lead.interest, message: lead.message, resource: lead.resource,
          source: lead.source, page: lead.page,
        }),
      }).then(async (r) => { if (!r.ok) throw new Error(`Supabase ${r.status}: ${await r.text()}`); }),
    );
  }

  if (env.RESEND_API_KEY && env.LEAD_NOTIFY_TO) {
    const subject =
      type === 'discovery' ? `New discovery request — ${lead.name}, ${lead.company}`
      : type === 'resource' ? `Resource request — ${lead.resource} (${lead.company})`
      : `Newsletter sign-up — ${lead.email}`;
    const text = Object.entries(lead).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');
    tasks.push(
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: env.LEAD_NOTIFY_FROM || 'Novaamind Website <onboarding@resend.dev>',
          to: env.LEAD_NOTIFY_TO.split(',').map((s: string) => s.trim()),
          reply_to: lead.email,
          subject,
          text,
        }),
      }).then(async (r) => { if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`); }),
    );
  }

  if (tasks.length === 0) {
    console.info('[lead] (no delivery configured)', JSON.stringify(lead));
    return json({ ok: true, delivered: false });
  }

  const results = await Promise.allSettled(tasks);
  const failures = results.filter((r): r is PromiseRejectedResult => r.status === 'rejected');
  failures.forEach((f) => console.error('[lead] delivery failed', f.reason));
  // Succeed if at least one channel recorded the lead.
  if (failures.length === results.length) {
    console.error('[lead] LOST LEAD', JSON.stringify(lead));
    return json({ error: 'We could not record your request.' }, 502);
  }
  return json({ ok: true, delivered: true });
};

export const ALL: APIRoute = () => json({ error: 'Method not allowed' }, 405);
