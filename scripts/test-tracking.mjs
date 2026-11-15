import test from 'node:test';
import assert from 'node:assert/strict';
import { clickTrackingPayload, referralCopyPayload, searchTrackingPayload } from '../src/utils/tracking.mjs';

const page = '/mo-tai-khoan/mo-tai-khoan-mb-bank-online/';
const link = { href: 'https://example.com/app?ref=private-value', dataset: {
  event: 'affiliate_click', productId: 'bank-accounts/mb-bank-account',
  productName: 'Tài khoản MB Bank', ctaPosition: 'product-card', affiliate: 'true',
} };

test('all custom actions require granted consent', () => {
  for (const consent of [undefined, 'denied', '']) {
    assert.equal(clickTrackingPayload(link, page, consent), null);
    assert.equal(referralCopyPayload(link.dataset, page, consent), null);
    assert.equal(searchTrackingPayload(5, '/tim-kiem/', consent), null);
  }
});

test('affiliate clicks retain product context but exclude destination queries and raw URLs', () => {
  const data = clickTrackingPayload(link, page + '?q=personal-information', 'granted');
  assert.equal(data.product_name, 'Tài khoản MB Bank');
  assert.equal(data.category_slug, 'mo-tai-khoan');
  assert.equal(data.destination_hostname, 'example.com');
  assert.equal(data.page_path, page);
  assert.equal(data.affiliate, true);
  assert(!JSON.stringify(data).includes('private-value'));
  assert(!JSON.stringify(data).includes('personal-information'));
});

test('phone and Zalo contacts are distinct without collecting contact addresses', () => {
  for (const [href, type] of [['tel:0896451911', 'phone'], ['https://zalo.me/0896451911', 'zalo']]) {
    const data = clickTrackingPayload({ href, dataset: { event: 'contact_click' } }, page, 'granted');
    assert.equal(data.contact_type, type);
    assert.equal(data.affiliate, false);
    assert(!JSON.stringify(data).includes('0896451911'));
  }
});

test('directions are an intent action, not an affiliate conversion or completed registration', () => {
  const data = clickTrackingPayload({ href: 'https://maps.app.goo.gl/store', dataset: { event: 'directions_click' } }, page, 'granted');
  assert.equal(data.event, 'directions_click');
  assert.equal(data.contact_type, '');
  assert.equal(data.affiliate, false);
});

test('copy events reset link-specific context instead of inheriting a previous click', () => {
  const data = referralCopyPayload(link.dataset, page, 'granted');
  assert.equal(data.event, 'referral_code_copy');
  assert.equal(data.product_name, 'Tài khoản MB Bank');
  assert.equal(data.destination_hostname, '');
  assert.equal(data.contact_type, '');
  assert.equal(data.page_path, page);
  assert(!('referral_code' in data));
});

test('search reports zero or positive result counts without collecting a search term', () => {
  for (const count of [0, 15]) {
    const data = searchTrackingPayload(count, '/tim-kiem/', 'granted');
    assert.equal(data.result_count, count);
    assert.equal(data.event, 'site_search');
    assert.equal(data.category_slug, '');
    assert.equal(data.product_id, '');
    assert(!('search_term' in data));
  }
  for (const count of [-1, NaN, 0.5]) assert.equal(searchTrackingPayload(count, '/tim-kiem/', 'granted'), null);
});

test('unknown link event names cannot be emitted as completed outcomes', () => {
  assert.equal(clickTrackingPayload({ ...link, dataset: { event: 'sign_up' } }, page, 'granted'), null);
});
