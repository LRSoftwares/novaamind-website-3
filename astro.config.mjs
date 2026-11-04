// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Every page is pre-rendered to static HTML. Only routes that opt out with
// `export const prerender = false` (the /api/lead form endpoint) run as
// Vercel serverless functions.
export default defineConfig({
  site: 'https://novaamind.com',
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
  // Old WordPress URLs → new pages, so existing links and search results keep working.
  redirects: {
    '/contact-us': '/contact/',
    '/salon': '/industries/salon-spa/',
    '/blogs': '/insights/',
    '/blog': '/insights/',
    '/faq': '/faqs/',
    '/industries/salon': '/industries/salon-spa/',
  },
});
