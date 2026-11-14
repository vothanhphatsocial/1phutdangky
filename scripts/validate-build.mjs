import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'parse5';
import { getArticleVisual } from '../src/utils/articleVisual.mjs';
import { getSitemapLastmod } from '../src/utils/sitemapLastmod.mjs';

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, 'dist');
const productionOrigin = 'https://1phutdangky.com';
const errors = [];

const requiredOutput = [
  'index.html',
  '404.html',
  '_headers',
  'robots.txt',
  'sitemap-index.xml',
  'pagefind/pagefind-entry.json',
  'chinh-sach-bao-mat/index.html',
  'tim-kiem/index.html',
];

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(entryPath)));
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

function routeForHtml(relativePath) {
  if (relativePath === 'index.html') return '/';
  if (relativePath === '404.html') return null;
  return `/${relativePath.replace(/\/index\.html$/, '/')}`;
}

function targetFile(urlPath) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(urlPath);
  } catch {
    return null;
  }
  const relativePath = decodedPath.replace(/^\//, '');
  const candidates = decodedPath.endsWith('/')
    ? [path.join(distRoot, relativePath, 'index.html')]
    : [
        path.join(distRoot, relativePath),
        path.join(distRoot, relativePath, 'index.html'),
        path.join(distRoot, `${relativePath}.html`),
      ];

  for (const candidate of candidates) {
    if (candidate.startsWith(`${distRoot}${path.sep}`) && builtFileSet.has(candidate)) return candidate;
  }

  return null;
}

function elements(node) {
  return (node.childNodes ?? []).flatMap((child) => [
    ...(child.tagName ? [child] : []), ...elements(child),
  ]);
}

function attribute(node, name) {
  return node?.attrs?.find((attr) => attr.name === name)?.value;
}

function textContent(node) {
  if (node.nodeName === '#text') return node.value;
  if (['script', 'style'].includes(node.tagName)) return '';
  return (node.childNodes ?? []).map(textContent).join('');
}

function normalizedText(node) {
  return textContent(node).replace(/\s+/g, ' ').trim();
}

function schemaNodes(value) {
  if (Array.isArray(value)) return value.flatMap(schemaNodes);
  if (!value || typeof value !== 'object') return [];
  return [value, ...schemaNodes(value['@graph'])];
}

function hasSchemaType(node, type) {
  return [node['@type']].flat().includes(type);
}

// Follow srcset token boundaries: commas inside URL tokens (including data URLs)
// are not separators. Descriptors end at a comma outside parentheses.
function srcsetUrls(value) {
  const urls = [];
  let rest = value;
  while (rest.length) {
    rest = rest.replace(/^[\t\n\f\r ,]+/, '');
    if (!rest) break;
    const token = rest.match(/^[^\t\n\f\r ]+/)[0];
    rest = rest.slice(token.length);
    urls.push(token.replace(/,+$/, ''));
    if (token.endsWith(',')) continue;
    let depth = 0;
    let index = 0;
    for (; index < rest.length; index++) {
      if (rest[index] === '(') depth++;
      else if (rest[index] === ')') depth = Math.max(0, depth - 1);
      else if (rest[index] === ',' && depth === 0) break;
    }
    rest = rest.slice(index + 1);
  }
  return urls;
}

for (const relativePath of requiredOutput) {
  if (!(await exists(path.join(distRoot, relativePath)))) {
    errors.push(`Thiếu build output bắt buộc: ${relativePath}`);
  }
}

const expectedSitemapIndex = `${productionOrigin}/sitemap-index.xml`;
const robotsSource = await readFile(
  path.join(distRoot, 'robots.txt'),
  'utf8',
);

const robotsSitemap = robotsSource.match(
  /^Sitemap:\s*(\S+)\s*$/mi,
)?.[1];

if (robotsSitemap !== expectedSitemapIndex) {
  errors.push(
    `robots.txt phải trỏ tới ${expectedSitemapIndex}.`,
  );
}

const sitemapIndexSource = await readFile(
  path.join(distRoot, 'sitemap-index.xml'),
  'utf8',
);
const sitemapIndexUrls = [
  ...sitemapIndexSource.matchAll(/<loc>(.*?)<\/loc>/g),
].map(([, url]) => url);

if (sitemapIndexUrls.length === 0) {
  errors.push('sitemap-index.xml không có sitemap con.');
}

for (const sitemapIndexUrl of sitemapIndexUrls) {
  try {
    const parsedUrl = new URL(sitemapIndexUrl);
    const relativeSitemapPath = parsedUrl.pathname.replace(/^\//, '');

    if (parsedUrl.origin !== productionOrigin) {
      errors.push(
        `sitemap-index.xml chứa origin không hợp lệ: ${sitemapIndexUrl}`,
      );
    }

    if (!(await exists(path.join(distRoot, relativeSitemapPath)))) {
      errors.push(
        `sitemap-index.xml trỏ tới file không tồn tại: ${sitemapIndexUrl}`,
      );
    }
  } catch {
    errors.push(
      `sitemap-index.xml chứa URL không hợp lệ: ${sitemapIndexUrl}`,
    );
  }
}

const builtFiles = await walk(distRoot);
const builtFileSet = new Set(builtFiles);
const htmlFiles = builtFiles.filter((filePath) => filePath.endsWith('.html'));
const indexableCanonicals = new Set();
const articleVisuals = new Map();
const builtHtml = new Map();
const documents = new Map();
const titles = new Map();
const descriptions = new Map();
const publishedArticles = new Set();

// Derive article expectations from source, never from the schema being tested.
const articleRoot = path.join(projectRoot, 'src/content/articles');
const articleFiles = (await walk(articleRoot)).filter((filePath) => /\.mdx?$/.test(filePath));
for (const articleFile of articleFiles) {
  const source = await readFile(articleFile, 'utf8');
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1] ?? '';
  const relativeArticle = path.relative(articleRoot, articleFile)
    .split(path.sep).join('/').replace(/\.mdx?$/, '');
  const category = frontmatter.match(
    /^category:\s*["']?(mo-tai-khoan|the-tin-dung|vay-tien-mat|vi-dien-tu|dang-ky-doi-tac)["']?\s*(?:#.*)?$/m,
  )?.[1];
  const segments = relativeArticle.split('/');
  if (!category || segments.length !== 2 || segments[0] !== category) {
    errors.push(`Article phải nằm trong thư mục chuyên mục tương ứng: ${relativeArticle} (category: ${category ?? 'missing'}).`);
  }
  const output = `${relativeArticle}/index.html`;
  if (/^draft:\s*true\s*(?:#.*)?$/m.test(frontmatter)) {
    if (builtFileSet.has(path.join(distRoot, output))) {
      errors.push(`Draft article xuất hiện trong build: /${relativeArticle}/`);
    }
  } else {
    publishedArticles.add(output);
    if (!builtFileSet.has(path.join(distRoot, output))) {
      errors.push(`Published article thiếu build output: ${output}`);
    }
  }
}

for (const htmlFile of htmlFiles) {
  const relativePath = path.relative(distRoot, htmlFile);
  const html = await readFile(htmlFile, 'utf8');
  builtHtml.set(relativePath, html);
  const nodes = elements(parse(html));
  const fragmentIds = new Set(nodes.flatMap((node) => [
    attribute(node, 'id'),
    ...(node.tagName === 'a' ? [attribute(node, 'name')] : []),
  ]).filter((id) => id !== undefined));
  documents.set(htmlFile, { nodes, fragmentIds });
}

function validateUniqueMetadata(value, registry, name, relativePath) {
  if (!value) {
    errors.push(`${relativePath} thiếu ${name} không rỗng.`);
  } else if (registry.has(value)) {
    errors.push(`${relativePath} có ${name} trùng với ${registry.get(value)}.`);
  } else {
    registry.set(value, relativePath);
  }
}

function plainText(html) {
  return html.replace(/<[^>]*>/g, '').replace(/&#(x[0-9a-f]+|\d+);/gi, (_, code) =>
    String.fromCodePoint(code[0].toLowerCase() === 'x' ? parseInt(code.slice(1), 16) : Number(code)),
  ).replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ').trim();
}

function validateArticleCitations(nodes, relativePath, baseUrl) {
  const prose = nodes.find((node) => attribute(node, 'class')?.split(/\s+/).includes('article-prose'));
  if (!prose) {
    errors.push(`${relativePath} thiếu khối nội dung bài viết hợp lệ.`);
    return;
  }

  for (const node of elements(prose).filter((node) => node.tagName === 'a')) {
    const href = attribute(node, 'href');
    if (!href) continue;

    let target;
    try {
      target = new URL(href, baseUrl);
    } catch {
      continue; // Invalid destinations are reported by the general link check.
    }

    if (!['http:', 'https:'].includes(target.protocol) || target.origin === productionOrigin) {
      continue;
    }

    const event = attribute(node, 'data-event');
    const product = attribute(node, 'data-product-id');
    const purpose = attribute(node, 'data-link-purpose');
    const isProductAction = ['affiliate_click', 'official_link_click'].includes(event) && Boolean(product);
    if (isProductAction || purpose === 'action') continue;

    errors.push(
      `${relativePath} có liên kết trích dẫn ngoài trong nội dung: ${normalizedText(node)} (${href}). Giữ chữ thường và đặt URL tại Nguồn và kiểm chứng; giữ CTA trong component/nút hành động.`,
    );
  }
}

for (const htmlFile of htmlFiles) {
  const relativePath = path.relative(distRoot, htmlFile);
  const html = builtHtml.get(relativePath);
  const { nodes } = documents.get(htmlFile);
  const route = routeForHtml(relativePath);
  const baseUrl = new URL(attribute(nodes.find((node) => node.tagName === 'base'), 'href') ?? '', `${productionOrigin}${route ?? '/404.html'}`);
  const headings = nodes.filter((node) => node.tagName === 'h1');
  if (headings.length !== 1 || !normalizedText(headings[0])) {
    errors.push(`${relativePath} phải có đúng một H1 không rỗng.`);
  }
  const titleNodes = nodes.filter((node) => node.tagName === 'title');
  const descriptionNodes = nodes.filter((node) => node.tagName === 'meta' && attribute(node, 'name')?.toLowerCase() === 'description');
  if (titleNodes.length !== 1) errors.push(`${relativePath} phải có đúng một title.`);
  if (descriptionNodes.length !== 1) errors.push(`${relativePath} phải có đúng một meta description.`);
  validateUniqueMetadata(titleNodes[0] ? normalizedText(titleNodes[0]) : '', titles, 'title', relativePath);
  validateUniqueMetadata(attribute(descriptionNodes[0], 'content')?.replace(/\s+/g, ' ').trim() ?? '', descriptions, 'meta description', relativePath);

  if (
    relativePath !== '404.html' &&
    /class="product-card(?:\s|\")/.test(html)
  ) {
    const factCount = (html.match(/class="fact"/g) ?? []).length;

    if (factCount < 3) {
      errors.push(
        `${relativePath} có product card nhưng thiếu decision facts (cần ít nhất 3 facts).`,
      );
    }

    if (html.includes('class="official-link"')) {
      errors.push(
        `${relativePath} vẫn còn link Trang chính thức ngoài CTA affiliate.`,
      );
    }
  }

  const robots = html.match(/<meta name="robots" content="([^"]+)">/i)?.[1];
  const isInPagefind = html.includes('data-pagefind-body');
  const canonicalMatches = [
    ...html.matchAll(/<link rel="canonical" href="([^"]+)">/gi),
  ];

  if (relativePath === '404.html') {
    if (robots !== 'noindex, follow') {
      errors.push(`404.html có robots không đúng: ${robots ?? 'missing'}`);
    }
    if (canonicalMatches.length > 0) {
      errors.push('404.html không được có canonical.');
    }
    if (isInPagefind) {
      errors.push('404.html không được xuất hiện trong chỉ mục tìm kiếm nội bộ.');
    }
  } else {
    if (canonicalMatches.length !== 1) {
      errors.push(`${relativePath} phải có đúng một canonical.`);
    } else {
      const expectedCanonical = `${productionOrigin}${route}`;
      const canonical = canonicalMatches[0][1];
      if (canonical !== expectedCanonical) {
        errors.push(`${relativePath} có canonical ${canonical}, cần ${expectedCanonical}.`);
      }

      if (relativePath === 'tim-kiem/index.html') {
        if (robots !== 'noindex, nofollow') {
          errors.push(`/tim-kiem/ có robots không đúng: ${robots ?? 'missing'}`);
        }
        if (isInPagefind) {
          errors.push('/tim-kiem/ không được xuất hiện trong chỉ mục tìm kiếm nội bộ.');
        }
      } else if (robots === 'index, follow') {
        indexableCanonicals.add(canonical);
        if (!isInPagefind) {
          errors.push(`${relativePath} thiếu data-pagefind-body.`);
        }
      } else if (robots !== 'noindex, nofollow') {
        errors.push(`${relativePath} có robots không đúng: ${robots ?? 'missing'}`);
      } else if (isInPagefind) {
        errors.push(`${relativePath} noindex nhưng vẫn nằm trong chỉ mục tìm kiếm nội bộ.`);
      }
    }
  }

  const schemas = [];
  for (const node of nodes.filter((node) => node.tagName === 'script' && attribute(node, 'type') === 'application/ld+json')) {
    try {
      schemas.push(...schemaNodes(JSON.parse(node.childNodes.map((child) => child.value ?? '').join(''))));
    } catch (error) {
      errors.push(`${relativePath} có JSON-LD không hợp lệ: ${error.message}`);
    }
  }

  if (publishedArticles.has(relativePath)) {
    validateArticleCitations(nodes, relativePath, baseUrl);
    const articles = schemas.filter((schema) => hasSchemaType(schema, 'Article'));
    const breadcrumbs = schemas.filter((schema) => hasSchemaType(schema, 'BreadcrumbList'));
    if (articles.length !== 1) errors.push(`${relativePath} phải có đúng một schema Article (tìm thấy ${articles.length}).`);
    if (breadcrumbs.length !== 1) errors.push(`${relativePath} phải có đúng một schema BreadcrumbList (tìm thấy ${breadcrumbs.length}).`);
    const schema = articles[0];
    if (schema && (typeof schema.headline !== 'string' || !schema.headline.trim())) {
      errors.push(`${relativePath} thiếu Article headline không rỗng.`);
    } else if (schema && route) {
        const id = route.slice(1, -1);
        const visual = getArticleVisual({ id, data: { title: schema.headline, category: id.split('/')[0] } });
        articleVisuals.set(route, visual);
        if (headings.length !== 1 || normalizedText(headings[0]) !== visual.title) {
          errors.push(`${relativePath} có H1 không đồng bộ với tiêu đề bài viết.`);
        }
        const expectedImage = `${productionOrigin}${visual.image}`;
        const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/i)?.[1];
        const twitterImage = html.match(/<meta name="twitter:image" content="([^"]+)"/i)?.[1];
        if (ogImage !== expectedImage || twitterImage !== expectedImage || schema.image?.[0] !== expectedImage || !html.includes(`data-visual-image="${visual.image}"`)) {
          errors.push(`${relativePath} có ảnh tiêu đề/OG/Twitter/schema không đồng bộ.`);
        }
        const imageFile = path.join(distRoot, visual.image);
        if (!(await exists(imageFile))) {
          errors.push(`${relativePath} thiếu ảnh chia sẻ: ${visual.image}`);
        } else {
          const png = await readFile(imageFile);
          if (png.length < 24 || png.toString('hex', 0, 8) !== '89504e470d0a1a0a' || png.readUInt32BE(16) !== visual.width || png.readUInt32BE(20) !== visual.height) {
            errors.push(`${relativePath} cần ảnh PNG ${visual.width}×${visual.height}.`);
          }
        }
    }
  }

  const hrefs = nodes.filter((node) => node.tagName !== 'base')
    .map((node) => attribute(node, 'href')).filter((href) => href !== undefined);
  for (const href of hrefs) {
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) {
      continue;
    }

    let targetUrl;
    try {
      targetUrl = new URL(href, baseUrl);
    } catch {
      errors.push(`${relativePath} có href không hợp lệ: ${href}`);
      continue;
    }

    if (targetUrl.origin !== productionOrigin) continue;
    const target = targetFile(targetUrl.pathname);
    if (!target) {
      errors.push(`${relativePath} liên kết tới target không tồn tại: ${targetUrl.pathname}`);
      continue;
    }
    if (targetUrl.hash && documents.has(target)) {
      // Text-fragment directives are not element IDs. Empty/#top target the page.
      const fragment = targetUrl.hash.slice(1).split(':~:')[0];
      if (!fragment) continue;
      let decodedFragment;
      try {
        decodedFragment = decodeURIComponent(fragment);
      } catch {
        errors.push(`${relativePath} có fragment không hợp lệ: ${href}`);
        continue;
      }
      const ids = documents.get(target).fragmentIds;
      if (!ids.has(fragment) && !ids.has(decodedFragment) && decodedFragment.toLowerCase() !== 'top') {
        errors.push(`${relativePath} liên kết tới fragment không tồn tại: ${href}`);
      }
    }
  }

  for (const node of nodes) {
    const imageUrls = [];
    if (node.tagName === 'img') {
      const src = attribute(node, 'src');
      if (src !== undefined) imageUrls.push(src);
    }
    if (node.tagName === 'img' || (node.tagName === 'source' && node.parentNode?.tagName === 'picture')) {
      imageUrls.push(...srcsetUrls(attribute(node, 'srcset') ?? ''));
    }
    for (const src of imageUrls) {
      let imageUrl;
      try {
        if (!src.trim()) throw new Error('empty image URL');
        imageUrl = new URL(src, baseUrl);
      } catch {
        errors.push(`${relativePath} có URL ảnh không hợp lệ: ${src}`);
        continue;
      }
      if (imageUrl.origin !== productionOrigin) continue;
      const imageFile = targetFile(imageUrl.pathname);
      if (!imageFile || !/\.(?:avif|gif|ico|jpe?g|png|svg|webp)$/i.test(imageFile)) {
        errors.push(`${relativePath} có ảnh nội bộ không tồn tại: ${src}`);
      }
    }
  }
}

for (const [relativePath, html] of builtHtml) {
  for (const [, card] of html.matchAll(/<article\b[^>]*class="post-card"[^>]*>([\s\S]*?)<\/article>/gi)) {
    const href = card.match(/<a\b[^>]*href="([^"]+)"/i)?.[1];
    const visual = articleVisuals.get(href);
    const cardTitle = plainText(card.match(/<h3\b[^>]*>([\s\S]*?)<\/h3>/i)?.[1] ?? '');
    const visualTitle = plainText(card.match(/<span\b[^>]*class="visual-title"[^>]*>([\s\S]*?)<\/span>/i)?.[1] ?? '');
    if (!visual || cardTitle !== visual.title || visualTitle !== visual.title || !card.includes(`data-visual-image="${visual.image}"`)) {
      errors.push(`${relativePath} có thẻ bài không đồng bộ với bài gốc: ${href ?? 'missing URL'}.`);
    }
  }
}

const sitemapFiles = builtFiles.filter((filePath) =>
  /^sitemap-\d+\.xml$/.test(path.basename(filePath)),
);
const sitemapUrls = new Set();

for (const sitemapFile of sitemapFiles) {
  const xml = await readFile(sitemapFile, 'utf8');
  for (const match of xml.matchAll(/<loc>(.*?)<\/loc>/g)) {
    sitemapUrls.add(match[1]);
  }

  for (const [, entry] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const url = entry.match(/<loc>(.*?)<\/loc>/)?.[1];
    if (!url || !indexableCanonicals.has(url)) continue;

    const pathname = new URL(url).pathname;
    const html = await readFile(path.join(distRoot, pathname, 'index.html'), 'utf8');
    const expectedLastmod = getSitemapLastmod(html);
    const actualLastmod = entry.match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
    if (actualLastmod !== expectedLastmod) {
      errors.push(`Sitemap lastmod không khớp ngày nội dung: ${url}.`);
    }
  }
}

if (sitemapUrls.has(`${productionOrigin}/tim-kiem/`)) {
  errors.push('/tim-kiem/ không được xuất hiện trong sitemap.');
}

for (const canonical of indexableCanonicals) {
  if (!sitemapUrls.has(canonical)) {
    errors.push(`Canonical indexable thiếu trong sitemap: ${canonical}`);
  }
}

for (const sitemapUrl of sitemapUrls) {
  if (!indexableCanonicals.has(sitemapUrl)) {
    errors.push(`Sitemap chứa URL không indexable: ${sitemapUrl}`);
  }
}

if (errors.length > 0) {
  console.error(`Build validation thất bại (${errors.length} lỗi):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `Build validation pass: ${htmlFiles.length} HTML, ${sitemapUrls.size} sitemap URLs, không có draft hoặc internal link hỏng.`,
  );
}
