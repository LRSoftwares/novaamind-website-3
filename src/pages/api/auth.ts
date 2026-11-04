/**
 * GET /api/auth — starts GitHub login for the content manager at /admin/.
 * Needs GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET (see docs/CMS.md).
 */
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = ({ url, redirect }) => {
  const clientId = import.meta.env.GITHUB_CLIENT_ID ?? process.env.GITHUB_CLIENT_ID;
  if (!clientId) return new Response('GitHub login is not configured. See docs/CMS.md.', { status: 500 });
  const state = crypto.randomUUID();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${url.origin}/api/callback`,
    scope: 'repo,user',
    state,
  });
  return new Response(null, {
    status: 302,
    headers: {
      Location: `https://github.com/login/oauth/authorize?${params}`,
      'Set-Cookie': `cms_oauth_state=${state}; Path=/api; HttpOnly; Secure; SameSite=Lax; Max-Age=600`,
    },
  });
};
