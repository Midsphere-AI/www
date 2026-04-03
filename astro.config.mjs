// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://midsphere.ai',
  adapter: node({ mode: 'standalone' }),
  server: { host: '0.0.0.0', port: 4321 },
  integrations: [sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
