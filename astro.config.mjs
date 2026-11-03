import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: process.env.SITE_URL || 'https://trust.fimil.dev',
  base: process.env.BASE_PATH || '/',
  vite: {
    plugins: [tailwindcss()],
  },
});
