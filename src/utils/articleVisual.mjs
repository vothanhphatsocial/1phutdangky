import { createHash } from 'node:crypto';
import { getCategoryVisual } from './categoryVisual.mjs';

export const articleVisualTypography = {
  color: '#0b0c10',
  weight: 700,
  lineHeight: 1.04,
  letterSpacing: -0.06,
};

/** One editorial title and palette for the article, listings and social image. */
export function getArticleVisual(post) {
  const { title, category } = post.data;
  const theme = getCategoryVisual(category);
  const { background } = theme;
  const version = createHash('sha256')
    .update(JSON.stringify(['article-title-v1', title, background, articleVisualTypography]))
    .digest('hex').slice(0, 12);

  return {
    title,
    category,
    ...theme,
    ...articleVisualTypography,
    image: `/article-images/${post.id}-${version}.png`,
    alt: title,
    width: 1200,
    height: 630,
  };
}

/** CSS 135deg and farthest-corner circle, rendered without host-system fonts. */
export function getArticleBackgroundSvg(visual) {
  const { width, height } = visual;
  const cx = width * visual.lightX;
  const cy = height * visual.lightY;
  const radius = Math.hypot(cx, height - cy) * visual.lightRadius;
  const stops = visual.stops.split(', ').map((stop, index, all) => {
    const [color, offset = `${index / (all.length - 1) * 100}%`] = stop.split(' ');
    return `<stop offset="${offset}" stop-color="${color}"/>`;
  }).join('');
  const diagonal = (width + height) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="base" gradientUnits="userSpaceOnUse" x1="${(width - diagonal) / 2}" y1="${(height - diagonal) / 2}" x2="${(width + diagonal) / 2}" y2="${(height + diagonal) / 2}">${stops}</linearGradient>
      <radialGradient id="light" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${radius}"><stop stop-color="white" stop-opacity="${visual.highlight}"/><stop offset="100%" stop-color="white" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#base)"/>
    <rect width="100%" height="100%" fill="url(#light)"/>
  </svg>`;
}
