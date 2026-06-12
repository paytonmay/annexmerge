import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: replace with the real custom domain once registered.
export default defineConfig({
  site: 'https://annexmerge.vercel.app',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
