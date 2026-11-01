// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';
import { readFile } from 'node:fs/promises';
import { getSitemapLastmod } from './src/utils/sitemapLastmod.mjs';

const nonIndexableRoutes = [
  '/tim-kiem/',
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
      serialize: async (item) => {
        const pathname = new URL(item.url).pathname;
        const html = await readFile(
          new URL(`./dist${pathname}index.html`, import.meta.url),
          'utf8',
        );
        const lastmod = getSitemapLastmod(html);
        return lastmod ? { ...item, lastmod } : item;
      },
    }),
    mdx(),
  ],

  trailingSlash: 'always',
});
