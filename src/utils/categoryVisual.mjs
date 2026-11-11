const palettes = {
  'mo-tai-khoan': { start: '#99c3ff', end: '#92f1d1', highlight: 0.72 },
  'the-tin-dung': { start: '#ffc29e', end: '#f7e88c', highlight: 0.7 },
  'vay-tien-mat': { start: '#b4a3ff', end: '#f1b8f8', highlight: 0.68 },
};

/** Shared by category panels, article visuals, product cards and social images. */
export function getCategoryVisual(category) {
  const palette = palettes[category];
  if (!palette) throw new Error(`Chuyên mục không có bảng màu: ${category}`);
  const stops = `${palette.start} 0%, ${palette.end} 100%`;
  const lightX = 0.86;
  const lightY = 0.15;
  const lightRadius = 0.24;
  const rgb = (hex) => hex.slice(1).match(/../g).map(value => parseInt(value, 16)).join(', ');
  return {
    ...palette, stops, lightX, lightY, lightRadius,
    startRgb: rgb(palette.start), endRgb: rgb(palette.end),
    background: `radial-gradient(circle at ${lightX * 100}% ${lightY * 100}%, rgba(255, 255, 255, ${palette.highlight}), transparent ${lightRadius * 100}%), linear-gradient(135deg, ${stops})`,
  };
}
