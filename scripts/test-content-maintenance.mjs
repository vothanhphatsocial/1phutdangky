import test from 'node:test';
import assert from 'node:assert/strict';
import { calendarDay, reviewSourceRecord } from './check-content-maintenance.mjs';

const campaign = {
  checkedAt: '2026-11-11', nextReviewAt: '2027-01-02', scope: 'Customer campaign terms',
  sources: [{ url: 'https://example.com/terms.pdf', status: 'current', effectiveFrom: '2026-07-10', validThrough: '2026-12-31' }],
};

test('campaign is valid through the final day, but requires maintenance the following day', () => {
  assert.deepEqual(reviewSourceRecord(campaign, '2026-12-31'), []);
  assert.match(reviewSourceRecord(campaign, '2027-01-01').join('\n'), /hết hiệu lực/);
});

test('retired campaign evidence does not falsely expire the independent referral action', () => {
  const historical = { ...campaign, sources: [{ ...campaign.sources[0], status: 'historical' }] };
  assert.deepEqual(reviewSourceRecord(historical, '2027-01-01'), []);
});

test('review is due on its scheduled date and not the preceding day', () => {
  const record = { ...campaign, nextReviewAt: '2026-12-01' };
  assert.deepEqual(reviewSourceRecord(record, '2026-11-30'), []);
  assert.match(reviewSourceRecord(record, '2026-12-01').join('\n'), /Đến hạn/);
});

test('invalid dates, future checks and not-yet-effective sources are rejected', () => {
  assert.throws(() => calendarDay('2026-02-30'), /không hợp lệ/);
  assert.throws(() => calendarDay('11/11/2026'), /YYYY-MM-DD/);
  assert.match(reviewSourceRecord(campaign, '2026-07-01').join('\n'), /tương lai/);
  assert.match(reviewSourceRecord(campaign, '2026-07-01').join('\n'), /chưa có hiệu lực/);
});
