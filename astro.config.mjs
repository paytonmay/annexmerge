import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// Pages stay fully static; only the /api/* endpoints (prerender = false)
// run as serverless functions.
export default defineConfig({
  site: 'https://onebigsandy.org',
  adapter: vercel(),
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
