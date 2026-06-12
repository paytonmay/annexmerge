import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://onebigsandy.org',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
