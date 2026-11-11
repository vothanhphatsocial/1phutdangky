import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));

export function calendarDay(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Ngày phải có dạng YYYY-MM-DD: ${value}`);
  }
  const stamp = Date.parse(`${value}T00:00:00Z`);
  if (!Number.isFinite(stamp) || new Date(stamp).toISOString().slice(0, 10) !== value) {
    throw new Error(`Ngày không hợp lệ: ${value}`);
  }
  return stamp;
}

export function reviewSourceRecord(record, today) {
  const issues = [];
  const now = calendarDay(today);
  const checked = calendarDay(record.checkedAt);
  const due = calendarDay(record.nextReviewAt);
  if (checked > now) issues.push('Ngày kiểm chứng nằm trong tương lai.');
  if (due < checked) issues.push('Hạn rà soát sớm hơn ngày kiểm chứng.');
  if (now >= due) issues.push(`Đến hạn rà soát nguồn (${record.nextReviewAt}).`);
  if (!record.scope?.trim() || !record.sources?.length) {
    issues.push('Thiếu phạm vi kiểm chứng hoặc nguồn.');
  }
  for (const source of record.sources ?? []) {
    const url = new URL(source.url);
    if (url.protocol !== 'https:') issues.push('Nguồn phải dùng HTTPS.');
    if (!['current', 'historical'].includes(source.status)) {
      issues.push('Trạng thái nguồn không hợp lệ.');
    }
    const from = source.effectiveFrom ? calendarDay(source.effectiveFrom) : undefined;
    const until = source.validThrough ? calendarDay(source.validThrough) : undefined;
    if (from !== undefined && until !== undefined && until < from) {
      issues.push('Ngày hết hiệu lực sớm hơn ngày bắt đầu.');
    }
    if (source.status === 'current' && from !== undefined && from > now) {
      issues.push(`Nguồn chưa có hiệu lực: ${source.url}`);
    }
    // A campaign remains valid throughout its final calendar day in Vietnam.
    if (source.status === 'current' && until !== undefined && now > until) {
      issues.push(`Nguồn đang dùng đã hết hiệu lực (${source.validThrough}): ${source.url}`);
    }
  }
  return issues;
}

async function articleFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await articleFiles(target));
    else if (/\.mdx?$/.test(entry.name)) files.push(target);
  }
  return files;
}

async function main() {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());
  const ledger = JSON.parse(await readFile(path.join(root, 'docs/content/source-review.json'), 'utf8'));
  if (ledger.version !== 1 || !Array.isArray(ledger.records)) throw new Error('Sổ kiểm chứng không hợp lệ.');
  if (!Number.isInteger(ledger.defaultReviewDays) || ledger.defaultReviewDays < 1) {
    throw new Error('Chu kỳ rà soát phải là số ngày nguyên dương.');
  }
  const records = new Map();
  const issues = [];
  for (const record of ledger.records) {
    if (records.has(record.article)) throw new Error(`Trùng bài: ${record.article}`);
    if (!/^(mo-tai-khoan|the-tin-dung|vay-tien-mat)\/[a-z0-9-]+$/.test(record.article)) {
      throw new Error(`Đường dẫn bài không hợp lệ: ${record.article}`);
    }
    records.set(record.article, record);
    for (const issue of reviewSourceRecord(record, today)) issues.push(`${record.article}: ${issue}`);
  }
  let count = 0;
  for (const file of await articleFiles(path.join(root, 'src/content/articles'))) {
    const source = await readFile(file, 'utf8');
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
    if (!frontmatter) throw new Error(`Thiếu frontmatter: ${file}`);
    if (/^draft:\s*true\s*$/m.test(frontmatter)) continue;
    count++;
    const id = path.relative(path.join(root, 'src/content/articles'), file).replace(/\\/g, '/').replace(/\.mdx?$/, '');
    const verified = frontmatter.match(/^lastVerifiedAt:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
    if (!verified) issues.push(`${id}: Chưa có ngày kiểm chứng; cần rà nguồn.`);
    else if (calendarDay(today) - calendarDay(verified) >= ledger.defaultReviewDays * 86400000) {
      issues.push(`${id}: Đến hạn rà soát ${ledger.defaultReviewDays} ngày kể từ ${verified}.`);
    }
    records.delete(id);
  }
  for (const id of records.keys()) issues.push(`${id}: Sổ kiểm chứng trỏ tới bài không xuất bản.`);
  if (issues.length) {
    console.error(`Cần bảo trì nội dung (${today}):\n${issues.map(issue => `- ${issue}`).join('\n')}`);
    process.exitCode = 1;
  } else {
    console.log(`Đã rà hạn kiểm chứng của ${count} bài (${today}); không có mốc bảo trì đã biết nào đến hạn.`);
    console.log('Lệnh này kiểm tra ngày đã ghi nhận, không thay thế việc mở nguồn chính thức để phát hiện thay đổi mới.');
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
