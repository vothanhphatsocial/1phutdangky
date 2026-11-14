import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { after, before, test } from 'node:test';
import sharp from 'sharp';
import { getArticleVisual } from '../src/utils/articleVisual.mjs';

// A deterministic, minimal build fixture keeps these tests independent of live
// content changes and concurrent builds. Every mutation uses a temporary copy.
const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const validator = path.join(projectRoot, 'scripts/validate-build.mjs');
const article = 'mo-tai-khoan/mo-tai-khoan-tpbank-online/index.html';
const articleSource = article.replace('/index.html', '.mdx');
let baseline;

before(async () => {
  baseline = await mkdtemp(path.join(os.tmpdir(), 'validate-build-baseline-'));
  const origin = 'https://1phutdangky.com';
  const title = 'Hướng dẫn mở tài khoản TPBank online';
  const route = `/${article.replace('index.html', '')}`;
  const visual = getArticleVisual({ id: route.slice(1, -1), data: { title, category: 'mo-tai-khoan' } });
  async function put(relativePath, value) {
    const file = path.join(baseline, relativePath);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, value);
  }
  function page(pageTitle, pathname, body, head = '', robots = 'index, follow') {
    const canonical = pathname ? `<link rel="canonical" href="${origin}${pathname}">` : '';
    return `<!doctype html><html lang="vi"><head><title>${pageTitle}</title>
      <meta name="description" content="Mô tả ${pageTitle}">
      <meta name="robots" content="${robots}">${canonical}${head}</head>
      <body><main ${robots.startsWith('index,') ? 'data-pagefind-body' : ''}><h1>${pageTitle}</h1>${body}</main></body></html>`;
  }
  const schema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: title,
    datePublished: '2020-01-01T00:00:00.000Z', dateModified: '2020-01-02T00:00:00.000Z',
    image: [`${origin}${visual.image}`],
  };
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${origin}/` },
    { '@type': 'ListItem', position: 2, name: title, item: `${origin}${route}` },
  ] };
  await put(`src/content/articles/${articleSource}`, `---\ntitle: "${title}"\ncategory: mo-tai-khoan\ndraft: false\n---\nArticle body\n`);
  await put('dist/index.html', page('Trang chủ', '/', `<a href="${route}">TPBank</a>`));
  await put('dist/404.html', page('Không tìm thấy trang', null, '', '', 'noindex, follow'));
  await put('dist/tim-kiem/index.html', page('Tìm kiếm', '/tim-kiem/', '', '', 'noindex, nofollow'));
  await put('dist/chinh-sach-bao-mat/index.html', page('Chính sách bảo mật', '/chinh-sach-bao-mat/', 'Privacy'));
  await put(`dist/${article}`, page(title, route,
    `<div data-visual-image="${visual.image}"></div><div class="article-prose"><p id="requirements">Giấy tờ cần chuẩn bị</p></div><section><a href="https://tpb.vn/">Nguồn và kiểm chứng</a></section>`,
    `<meta property="article:published_time" content="2020-01-01T00:00:00.000Z">
     <meta property="article:modified_time" content="2020-01-02T00:00:00.000Z">
     <meta property="og:image" content="${origin}${visual.image}"><meta name="twitter:image" content="${origin}${visual.image}">
     <script type="application/ld+json">${JSON.stringify(schema)}</script><script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>`));
  const image = await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#aabbcc' } }).png().toBuffer();
  await put(`dist${visual.image}`, image);
  await put('dist/brand/logo-512.png', image);
  await put('dist/_headers', '/*\n  X-Content-Type-Options: nosniff\n');
  await put('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap-index.xml\n`);
  await put('dist/pagefind/pagefind-entry.json', '{}');
  await put('dist/sitemap-index.xml', `<sitemapindex><sitemap><loc>${origin}/sitemap-0.xml</loc></sitemap></sitemapindex>`);
  await put('dist/sitemap-0.xml', `<urlset><url><loc>${origin}/</loc></url><url><loc>${origin}/chinh-sach-bao-mat/</loc></url><url><loc>${origin}${route}</loc><lastmod>2020-01-02T00:00:00.000Z</lastmod></url></urlset>`);
});

after(async () => {
  if (baseline) await rm(baseline, { recursive: true, force: true });
});

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'validate-build-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await cp(baseline, root, { recursive: true });
  return root;
}

async function edit(root, relativePath, transform) {
  const file = path.join(root, relativePath);
  const original = await readFile(file, 'utf8');
  const changed = transform(original);
  assert.notEqual(changed, original, `Mutation did not apply: ${relativePath}`);
  await writeFile(file, changed);
}

function run(root) {
  const result = spawnSync(process.execPath, [validator], { cwd: root, encoding: 'utf8' });
  assert.ifError(result.error);
  return { status: result.status, output: result.stdout + result.stderr };
}

function withoutSchema(html, type) {
  return html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    (block, json) => JSON.parse(json)['@type'] === type ? '' : block);
}

function append(html, markup) {
  return html.replace('</body>', `${markup}</body>`);
}

function appendProse(html, markup) {
  return html.replace(/<div\b[^>]*class="article-prose"[^>]*>/, (opening) => opening + markup);
}

async function rejectsMutation(t, transform, message, relativePath = article) {
  const root = await fixture(t);
  await edit(root, `dist/${relativePath}`, transform);
  const result = run(root);
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, message);
  assert.doesNotMatch(result.output, /TypeError|ReferenceError|SyntaxError:/);
}

test('unmodified build fixture passes', async (t) => {
  const result = run(await fixture(t));
  assert.equal(result.status, 0, result.output);
  assert.match(result.output, /Build validation pass/);
});

for (const type of ['Article', 'BreadcrumbList']) {
  test(`missing ${type} is rejected independently of schema presence`, (t) =>
    rejectsMutation(t, (html) => withoutSchema(html, type), new RegExp(`schema ${type}.*tìm thấy 0`)));
}

test('removing both article schemas cannot bypass article/citation checks', (t) =>
  rejectsMutation(t, (html) => appendProse(withoutSchema(withoutSchema(html, 'Article'), 'BreadcrumbList'),
    '<a href="https://example.org/citation">Citation</a>'),
  /liên kết trích dẫn ngoài trong nội dung/));

test('commented-out Article cannot satisfy the requirement', (t) =>
  rejectsMutation(t, (html) => append(withoutSchema(html, 'Article'),
    '<!-- <script type="application/ld+json">{"@type":"Article"}</script> -->'), /schema Article.*tìm thấy 0/));

test('JSON-LD graph, arrays and multiple schema types remain supported', async (t) => {
  const root = await fixture(t);
  await edit(root, `dist/${article}`, (html) => html.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    (_, json) => {
      const schema = JSON.parse(json);
      schema['@type'] = [schema['@type'], 'Thing'];
      return `<script data-test="graph" type='application/ld+json'>${JSON.stringify([{ '@graph': [schema] }])}</script>`;
    },
  ));
  const result = run(root);
  assert.equal(result.status, 0, result.output);
});

test('invalid JSON-LD fails with a validation diagnostic', (t) =>
  rejectsMutation(t, (html) => html.replace('"@type":"Article"', '"@type":invalid'), /JSON-LD không hợp lệ/));

test('future content timestamps remain rejected by the sitemap guard', (t) =>
  rejectsMutation(t, (html) => html.replaceAll('2020-01-02T00:00:00.000Z', '2099-01-02T00:00:00.000Z'), /tương lai/));

test('published source without built output is rejected', async (t) => {
  const root = await fixture(t);
  await rm(path.join(root, 'dist', article));
  const result = run(root);
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /Published article thiếu build output/);
});

test('draft source cannot accidentally remain published', async (t) => {
  const root = await fixture(t);
  await edit(root, `src/content/articles/${articleSource}`, (source) => source.replace('draft: false', 'draft: true # unpublished'));
  const result = run(root);
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /Draft article xuất hiện trong build/);
});

test('draft-like text in article body does not bypass published checks', async (t) => {
  const root = await fixture(t);
  await edit(root, `src/content/articles/${articleSource}`, (source) => `${source}\ndraft: true\n`);
  await edit(root, `dist/${article}`, (html) => withoutSchema(html, 'Article'));
  const result = run(root);
  assert.equal(result.status, 1, result.output);
  assert.match(result.output, /schema Article.*tìm thấy 0/);
});

for (const [name, transform] of [
  ['missing H1 on non-article page', (html) => html.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/i, '')],
  ['empty H1', (html) => html.replace(/<h1\b[^>]*>[\s\S]*?<\/h1>/i, '<h1> &nbsp; </h1>')],
  ['duplicate H1', (html) => append(html, '<h1>Another heading</h1>')],
]) {
  test(name, (t) => rejectsMutation(t, transform, /đúng một H1 không rỗng/, 'index.html'));
}

for (const [name, transform, diagnostic] of [
  ['missing title', (html) => html.replace(/<title>[\s\S]*?<\/title>/i, ''), /thiếu title không rỗng/],
  ['empty title', (html) => html.replace(/<title>[\s\S]*?<\/title>/i, '<title>&nbsp;</title>'), /thiếu title không rỗng/],
  ['missing description', (html) => html.replace(/<meta name="description"[^>]*>/i, ''), /thiếu meta description không rỗng/],
  ['empty description', (html) => html.replace(/<meta name="description"[^>]*>/i, '<meta content=" &nbsp; " name="description">'), /thiếu meta description không rỗng/],
]) {
  test(name, (t) => rejectsMutation(t, transform, diagnostic));
}

for (const name of ['title', 'description']) {
  test(`duplicate ${name} across pages is rejected`, async (t) => {
    const root = await fixture(t);
    const home = await readFile(path.join(root, 'dist/index.html'), 'utf8');
    const pattern = name === 'title' ? /<title>[\s\S]*?<\/title>/i : /<meta name="description"[^>]*>/i;
    const metadata = home.match(pattern)?.[0];
    assert.ok(metadata);
    await edit(root, `dist/${article}`, (html) => html.replace(pattern, metadata));
    const result = run(root);
    assert.equal(result.status, 1, result.output);
    assert.match(result.output, new RegExp(`${name} trùng với`));
  });
}

for (const href of ['#missing-heading', '/#missing-heading', '/?q=test&amp;x=2#missing-heading']) {
  test(`broken internal fragment ${href}`, (t) => rejectsMutation(t,
    (html) => append(html, `<a href="${href}">Broken section</a>`), /fragment không tồn tại/));
}

test('encoded Vietnamese IDs, named anchors, query strings, top and text fragments resolve', async (t) => {
  const root = await fixture(t);
  await edit(root, 'dist/index.html', (html) => append(html,
    '<section id="điều &amp; kiện"></section><a name="legacy-anchor"></a>'));
  await edit(root, `dist/${article}`, (html) => append(html, `
    <a href="/?x=1&amp;y=2#${encodeURIComponent('điều & kiện')}">Encoded cross-page ID</a>
    <a href="/#legacy-anchor">Named anchor</a><a href="#TOP">Top</a>
    <a href="#">Empty fragment</a><a href="#:~:text=TPBank">Text fragment</a>
    <a href="https://example.org/#not-local">External fragment</a>
    <a href="tel:0123456789">Call</a><a href="mailto:test@example.org">Email</a>`));
  const result = run(root);
  assert.equal(result.status, 0, result.output);
});

for (const markup of [
  '<img src="/missing-image.png">',
  '<img src="/brand/">',
  '<img src="/index.html">',
  '<img srcset="/brand/logo-512.png 1x, /missing-image.png 2x">',
  '<picture><source srcset="/missing-image.webp 2x"><img src="/brand/logo-512.png"></picture>',
]) {
  test(`missing local image: ${markup}`, (t) => rejectsMutation(t,
    (html) => append(html, markup), /ảnh nội bộ không tồn tại/));
}

test('relative image URLs, srcset data commas and remote images are not false positives', async (t) => {
  const root = await fixture(t);
  await edit(root, `dist/${article}`, (html) => append(html, `
    <img src="../../brand/logo-512.png?v=1&amp;size=512">
    <img src="https://example.org/remote.png">
    <img srcset="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7 1x, /brand/logo-512.png 2x">`));
  const result = run(root);
  assert.equal(result.status, 0, result.output);
});

test('button styling alone cannot bypass the citation rule', (t) => rejectsMutation(t,
  (html) => appendProse(html, '<a class="button" href="https://example.org/citation">Citation</a>'),
  /liên kết trích dẫn ngoài trong nội dung/));

test('an event without a product cannot masquerade as a product CTA', (t) => rejectsMutation(t,
  (html) => appendProse(html, '<a data-event="affiliate_click" href="https://example.org/citation">Citation</a>'),
  /liên kết trích dẫn ngoài trong nội dung/));

test('product CTA events and explicit actions remain allowed in prose', async (t) => {
  const root = await fixture(t);
  await edit(root, `dist/${article}`, (html) => appendProse(html, `
    <a href="https://example.org/app" data-event="affiliate_click" data-product-id="tpbank">App</a>
    <a href="https://example.org/open" data-event="official_link_click" data-product-id="tpbank">Open</a>
    <a href="https://example.org/maps" data-link-purpose="action">Directions</a>`));
  const result = run(root);
  assert.equal(result.status, 0, result.output);
});

test('redirect configuration removes wallet fallbacks and preserves all four MB legacy redirects', async () => {
  const redirects = await readFile(path.join(projectRoot, 'public/_redirects'), 'utf8');
  assert.doesNotMatch(redirects, /^\/vi-dien-tu(?:\/|\s)/m);
  const rules = redirects.split('\n').map((line) => line.trim());
  for (const slug of ['ma-gioi-thieu-mb-bank', 'khong-dang-ky-duoc-mb-bank']) {
    for (const slash of ['', '/']) {
      assert.ok(rules.includes(`/${slug}${slash} /mo-tai-khoan/${slug}/ 301`));
    }
  }
});


for (const category of ['vi-dien-tu', 'dang-ky-doi-tac']) {
  test(`${category} accepts a matching article and rejects a mismatched category`, async (t) => {
    const root = await fixture(t);
    const id = `${category}/mo-tai-khoan-tpbank-online`;
    const title = 'Hướng dẫn mở tài khoản TPBank online';
    const previous = getArticleVisual({ id: article.replace('/index.html', ''), data: { title, category: 'mo-tai-khoan' } });
    const visual = getArticleVisual({ id, data: { title, category } });
    const sourcePath = `src/content/articles/${id}.mdx`;
    const htmlPath = `dist/${id}/index.html`;
    await mkdir(path.dirname(path.join(root, sourcePath)), { recursive: true });
    await mkdir(path.dirname(path.join(root, htmlPath)), { recursive: true });
    const source = await readFile(path.join(root, `src/content/articles/${articleSource}`), 'utf8');
    await writeFile(path.join(root, sourcePath), source.replace('category: mo-tai-khoan', `category: ${category}`));
    const html = await readFile(path.join(root, `dist/${article}`), 'utf8');
    await writeFile(path.join(root, htmlPath), html.replaceAll(previous.image, visual.image).replaceAll('/mo-tai-khoan/', `/${category}/`));
    await mkdir(path.dirname(path.join(root, `dist${visual.image}`)), { recursive: true });
    await cp(path.join(root, `dist${previous.image}`), path.join(root, `dist${visual.image}`));
    await rm(path.join(root, `src/content/articles/${articleSource}`));
    await rm(path.join(root, `dist/${article}`));
    for (const file of ['dist/index.html', 'dist/sitemap-0.xml']) {
      await edit(root, file, text => text.replaceAll('/mo-tai-khoan/', `/${category}/`));
    }
    const valid = run(root);
    assert.equal(valid.status, 0, valid.output);
    await edit(root, sourcePath, text => text.replace(`category: ${category}`, 'category: vay-tien-mat'));
    const invalid = run(root);
    assert.equal(invalid.status, 1, invalid.output);
    assert.match(invalid.output, /thư mục chuyên mục tương ứng/);
  });
}
