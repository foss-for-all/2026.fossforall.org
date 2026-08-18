// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://2026.fossforall.org',

  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
    // A page without an English edition falls back to the Korean one instead of 404ing.
    fallback: {
      en: 'ko'
    },
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'redirect'
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), mdx()]
});
