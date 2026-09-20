// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

const nonIndexableRoutes = [
  '/tim-kiem/',
  '/vi-dien-tu/',
];

export default defineConfig({
  site: 'https://1phutdangky.com',

  build: {
    inlineStylesheets: 'always',
  },

  integrations: [
    sitemap({
      filter: (page) =>
        !nonIndexableRoutes.some((route) =>
          page.endsWith(route)
        ),
    }),
    mdx(),
  ],

  trailingSlash: 'always',
});
