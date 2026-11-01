/** Use content dates from rendered pages, never the build time. */
export function getSitemapLastmod(html) {
  const modified = html.match(
    /<meta\b(?=[^>]*\bproperty="article:modified_time")[^>]*\bcontent="([^"]+)"[^>]*>/i,
  )?.[1];

  const dates = modified
    ? [modified]
    : /class="[^"]*\bpost-card\b/.test(html)
      ? [...html.matchAll(/<time\b[^>]*\bdatetime="([^"]+)"/gi)]
        .map((match) => match[1])
      : [];

  if (dates.length === 0) return undefined;

  const timestamps = dates.map((date) => Date.parse(date));
  if (timestamps.some((value) => !Number.isFinite(value))) {
    throw new Error('Ngày nội dung không hợp lệ để tạo sitemap lastmod.');
  }

  const latest = Math.max(...timestamps);
  if (latest > Date.now()) {
    throw new Error('Ngày nội dung trong tương lai không thể dùng làm sitemap lastmod.');
  }

  return new Date(latest).toISOString();
}
