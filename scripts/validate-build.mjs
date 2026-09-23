import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

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

async function targetExists(urlPath) {
  const decodedPath = decodeURIComponent(urlPath);
  const relativePath = decodedPath.replace(/^\//, '');
  const candidates = decodedPath.endsWith('/')
    ? [path.join(distRoot, relativePath, 'index.html')]
    : [
        path.join(distRoot, relativePath),
        path.join(distRoot, relativePath, 'index.html'),
        path.join(distRoot, `${relativePath}.html`),
      ];

  for (const candidate of candidates) {
    if (await exists(candidate)) return true;
  }

  return false;
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
const htmlFiles = builtFiles.filter((filePath) => filePath.endsWith('.html'));
const indexableCanonicals = new Set();

for (const htmlFile of htmlFiles) {
  const relativePath = path.relative(distRoot, htmlFile);
  const html = await readFile(htmlFile, 'utf8');
  const route = routeForHtml(relativePath);

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

  const jsonLdBlocks = [
    ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi),
  ];
  for (const [, jsonLd] of jsonLdBlocks) {
    try {
      JSON.parse(jsonLd);
    } catch (error) {
      errors.push(`${relativePath} có JSON-LD không hợp lệ: ${error.message}`);
    }
  }

  const hrefs = [...html.matchAll(/\shref=(["'])(.*?)\1/gi)].map((match) => match[2]);
  for (const href of hrefs) {
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      continue;
    }

    let targetUrl;
    try {
      targetUrl = new URL(href, `${productionOrigin}${route ?? '/'}`);
    } catch {
      errors.push(`${relativePath} có href không hợp lệ: ${href}`);
      continue;
    }

    if (targetUrl.origin !== productionOrigin) continue;
    if (!(await targetExists(targetUrl.pathname))) {
      errors.push(`${relativePath} liên kết tới target không tồn tại: ${targetUrl.pathname}`);
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

const articleRoot = path.join(projectRoot, 'src/content/articles');
const articleFiles = (await walk(articleRoot)).filter((filePath) => /\.mdx?$/.test(filePath));

for (const articleFile of articleFiles) {
  const source = await readFile(articleFile, 'utf8');
  if (!/^draft:\s*true\s*$/m.test(source)) continue;

  const relativeArticle = path
    .relative(articleRoot, articleFile)
    .replace(/\.mdx?$/, '');
  const draftOutput = path.join(distRoot, relativeArticle, 'index.html');
  if (await exists(draftOutput)) {
    errors.push(`Draft article xuất hiện trong build: /${relativeArticle}/`);
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
