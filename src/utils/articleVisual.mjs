import { createHash } from 'node:crypto';

const themes = {
  'mo-tai-khoan': ['#8fb0ff 0%, #c4abff 56%, #a9e8d4 100%', 0.72],
  'the-tin-dung': ['#ffc29e, #f7e88c', 0.7],
  'vay-tien-mat': ['#b4a3ff, #f1b8f8', 0.68],
};

export const articleVisualTypography = {
  color: '#0b0c10',
  weight: 700,
  lineHeight: 1.04,
  letterSpacing: -0.06,
};

/** One editorial title and palette for the article, listings and social image. */
export function getArticleVisual(post) {
  const { title, category } = post.data;
  const [stops, highlight] = post.id === 'the-tin-dung/mo-the-tin-dung-liobank'
    ? ['#a5c7ff 0%, #b8a5ff 50%, #88ebca 100%', 0.72]
    : themes[category];
  const background = `radial-gradient(circle at 86% 18%, rgba(255, 255, 255, ${highlight}), transparent 25%), linear-gradient(135deg, ${stops})`;
  const version = createHash('sha256')
    .update(JSON.stringify(['article-title-v1', title, background, articleVisualTypography]))
    .digest('hex').slice(0, 12);

  return {
    title,
    category,
    background,
    stops,
    highlight,
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
  const cx = width * 0.86;
  const cy = height * 0.18;
  const radius = Math.hypot(cx, height - cy) * 0.25;
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
