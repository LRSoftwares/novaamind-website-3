/**
 * GET /api/callback — GitHub sends the user back here after login. We exchange
 * the code for a token and hand it to the content manager window.
 */
import type { APIRoute } from 'astro';

export const prerender = false;

const page = (status: 'success' | 'error', content: object) => {
  const msg = JSON.stringify(`authorization:github:${status}:${JSON.stringify(content)}`);
  return new Response(
    `<!doctype html><html><body><script>
      (function () {
        function receive(e) {
          window.opener.postMessage(${msg}, e.origin);
          window.removeEventListener('message', receive, false);
        }
        window.addEventListener('message', receive, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script></body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Set-Cookie': 'cms_oauth_state=; Path=/api; Max-Age=0' } },
  );
};

export const GET: APIRoute = async ({ url, cookies }) => {
  const env = (k: string) => import.meta.env[k] ?? process.env[k];
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  if (!code || !state || state !== cookies.get('cms_oauth_state')?.value) {
    return page('error', { message: 'The login could not be verified. Please try again.' });
  }
  const res = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: env('GITHUB_CLIENT_ID'), client_secret: env('GITHUB_CLIENT_SECRET'), code }),
  });
  const data = await res.json().catch(() => ({}));
  if (!data.access_token) return page('error', { message: data.error_description || 'GitHub did not return a token.' });
  return page('success', { token: data.access_token, provider: 'github' });
};
