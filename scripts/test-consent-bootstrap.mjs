import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

// Execute the actual inline head bootstrap, without fetching Google scripts.
const layout = fs.readFileSync(new URL('../src/layouts/BaseLayout.astro', import.meta.url), 'utf8');
const bootstrap = layout.match(/<script define:vars=\{\{ gtmId:[^\n]+\n([\s\S]*?)<\/script>/)[1];
const site = fs.readFileSync(new URL('../src/config/site.ts', import.meta.url), 'utf8');
const setting = name => site.match(new RegExp(`export const ${name} = '([^']+)';`))[1];
function browser(saved, storageBlocked = false, delayedLoad = false) {
  const scripts = [];
  const document = {
    documentElement: { dataset: {} },
    querySelector(selector) {
      const marker = selector.includes('pd-gtm') ? 'pdGtm' : 'pdAds';
      return scripts.find(s => s.dataset[marker]);
    },
    createElement: () => ({ dataset: {} }),
    getElementsByTagName: () => [{ parentNode: { insertBefore: tag => {
      scripts.push(tag);
      if (!delayedLoad) tag.onload?.();
    } } }],
  };
  const window = {};
  vm.runInNewContext(bootstrap, { window, document, localStorage: {
    getItem() { if (storageBlocked) throw Error('storage denied'); return saved; },
  }, gtmId: setting('GTM_ID'), adsTagId: setting('GOOGLE_ADS_TAG_ID') });
  const commands = () => window.dataLayer.filter(x => x[0]).map(x => Array.from(x));
  return { window, document, scripts, commands };
}
for (const choice of [null, 'denied', 'invalid']) {
  test(`fresh ${choice} consent performs no Google tag initialization`, () => {
    const b = browser(choice);
    b.window.__1pdLoadGoogleTags();
    assert.equal(b.scripts.length, 0);
    assert.equal(b.commands().length, 1);
    assert.equal(b.commands()[0][0], 'consent');
    assert.equal(b.commands()[0][2].ad_storage, 'denied');
    assert.equal(b.commands()[0][2].analytics_storage, 'denied');
  });
}
test('blocked local storage defaults to denied', () => {
  const b = browser('granted', true);
  assert.equal(b.scripts.length, 0);
  assert.equal(b.commands()[0][2].ad_storage, 'denied');
});
test('saved grant sets all consent fields before loading each existing tag once', () => {
  const b = browser('granted');
  const first = b.commands()[0];
  assert.deepEqual(Object.values(first[2]).filter(x => typeof x === 'string'), Array(4).fill('granted'));
  assert.equal(b.scripts.length, 2);
  assert.equal(b.scripts.find(s => s.dataset.pdAds).src, 'https://www.googletagmanager.com/gtag/js?id=AW-18553128342');
  assert.equal(b.scripts.find(s => s.dataset.pdGtm).src, 'https://www.googletagmanager.com/gtm.js?id=GTM-NXX3GHJ7');
  b.window.__1pdLoadGoogleTags();
  assert.equal(b.scripts.length, 2);
  assert.equal(b.commands().filter(x => x[0] === 'config' && x[1] === 'AW-18553128342').length, 1);
  assert(!b.commands().some(x => x[0] === 'event' && x[1] === 'conversion'));
});
test('grant, revoke and regrant never duplicate loaders or advertising configuration', () => {
  const b = browser(null);
  for (const value of ['granted', 'denied', 'granted']) {
    b.window.gtag('consent', 'update', { ad_storage: value, analytics_storage: value });
    b.document.documentElement.dataset.consentChoice = value;
    b.window.__1pdLoadGoogleTags();
  }
  assert.equal(b.scripts.length, 2);
  const commands = b.commands();
  assert(commands.findIndex(x => x[0] === 'consent' && x[1] === 'update') < commands.findIndex(x => x[0] === 'config'));
  assert.equal(commands.filter(x => x[0] === 'config').length, 1);
});

test('revoking consent during a slow Ads load defers config until a later grant', () => {
  const b = browser('granted', false, true);
  assert.equal(b.commands().filter(x => x[0] === 'config').length, 0);
  b.document.documentElement.dataset.consentChoice = 'denied';
  b.scripts.find(s => s.dataset.pdAds).onload();
  assert.equal(b.commands().filter(x => x[0] === 'config').length, 0);
  b.document.documentElement.dataset.consentChoice = 'granted';
  b.window.__1pdLoadGoogleTags();
  b.window.__1pdLoadGoogleTags();
  assert.equal(b.commands().filter(x => x[0] === 'config').length, 1);
  assert.equal(b.scripts.length, 2);
});
