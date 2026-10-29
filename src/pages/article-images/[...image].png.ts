import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import sharp from 'sharp';
import { getArticleVisual, getArticleBackgroundSvg } from '../../utils/articleVisual.mjs';

const require = createRequire(import.meta.url);
const fonts = Promise.all(['latin', 'vietnamese'].map(async (subset) => ({
  name: subset === 'latin' ? 'ArticleTitle' : 'ArticleTitleVietnamese',
  data: await readFile(require.resolve(`@fontsource/inter/files/inter-${subset}-700-normal.woff`)),
  weight: 700 as const,
  style: 'normal' as const,
})));

export async function getStaticPaths() {
  const posts = await getCollection('articles', ({ data }) => !import.meta.env.PROD || !data.draft);
  return posts.map((post) => {
    const visual = getArticleVisual(post);
    return {
      params: { image: visual.image.replace('/article-images/', '').replace(/\.png$/, '') },
      props: { visual },
    };
  });
}

export const GET: APIRoute = async ({ props }) => {
  const { visual } = props;
  const svg = await satori({
    type: 'div',
    props: {
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        height: '100%',
        padding: 80,
        color: visual.color,
      },
      children: {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            maxWidth: 900,
            fontFamily: 'ArticleTitle, ArticleTitleVietnamese',
            fontSize: 80,
            fontWeight: visual.weight,
            lineHeight: visual.lineHeight,
            letterSpacing: `${visual.letterSpacing}em`,
          },
          children: visual.title,
        },
      },
    },
  }, { width: visual.width, height: visual.height, fonts: await fonts });

  const png = await sharp(Buffer.from(getArticleBackgroundSvg(visual)))
    .composite([{ input: Buffer.from(svg) }]).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
