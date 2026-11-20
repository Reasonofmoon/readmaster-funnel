import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { isIgnored, listRepoFiles, loadRules, root } from './vercelignore.mjs';

const rules = await loadRules();
const files = await listRepoFiles();

const mustIgnore = [
  'gas-backend/.clasp.json',
  'gas-backend/Code.gs',
  'gas-backend/appsscript.json',
  'gas-backend/Dashboard.html',
  'gas-backend/README.md',
  'scripts/set-role.mjs',
  'scripts/seed-branches.mjs',
  'tests/seo-and-booking.test.mjs',
  'README.md',
  'DESIGN.md',
  'ecosystem.json',
  'demo/assets/ridi.png',
  '.gitignore',
];
for (const rel of mustIgnore) {
  assert.equal(files.includes(rel), true, `missing repo file ${rel}`);
  assert.equal(isIgnored(rel, rules), true, `${rel} should be excluded from the deployment`);
}

const mustServe = [
  'index.html',
  'briefing.html',
  'briefing-curriculum.html',
  'okgil.html',
  'dashboard.html',
  'admin.html',
  'book.html',
  'funnel.html',
  'curriculum.html',
  'shared-auth.js',
  'shared.css',
  'sw.js',
  'manifest.json',
  'robots.txt',
  'sitemap.xml',
  'api/neis.js',
  'assets/readmaster-logo.svg',
  'assets/readmaster-hero-bg.png',
  'assets/promo_motion.mp4',
  'icons/icon-192.png',
  'icons/icon-512.png',
];
for (const rel of mustServe) {
  assert.equal(files.includes(rel), true, `missing repo file ${rel}`);
  assert.equal(isIgnored(rel, rules), false, `${rel} must stay on the deployment`);
}

const downloads = files.filter((rel) => rel.startsWith('downloads/'));
assert.ok(downloads.length > 0);
const html = await Promise.all(
  files.filter((rel) => rel.endsWith('.html') && !rel.includes('/')).map(async (rel) => ({
    rel,
    source: await readFile(new URL(rel, root), 'utf8'),
  })),
);
const linkedDownloads = new Set();
for (const page of html) {
  for (const match of page.source.matchAll(/href="(downloads\/[^"]+)"/g)) {
    linkedDownloads.add(match[1]);
  }
}
for (const rel of downloads) {
  assert.equal(isIgnored(rel, rules), false, `${rel} is a linked download and must stay served`);
  assert.equal(linkedDownloads.has(rel), true, `${rel} has no page link`);
}
assert.deepEqual([...linkedDownloads].sort(), [...downloads].sort());
const curriculumLinks = [...linkedDownloads].filter((rel) => html.find((page) => page.rel === 'briefing-curriculum.html').source.includes(rel));
assert.equal(curriculumLinks.length, downloads.length);

const robots = await readFile(new URL('robots.txt', root), 'utf8');
assert.match(robots, /Allow: \//);
assert.doesNotMatch(robots, /Disallow:/);

const allowedPrefixes = ['assets/', 'icons/', 'downloads/', 'api/'];
const allowedExact = new Set([
  ...mustServe,
  'assets/kinetic_bg.mp4',
  'vercel.json',
  '.vercelignore',
]);
for (const rel of files) {
  if (isIgnored(rel, rules)) continue;
  const allowed = allowedExact.has(rel) || allowedPrefixes.some((prefix) => rel.startsWith(prefix));
  assert.equal(allowed, true, `unexpected deployed file ${rel}`);
}

const pagesUsingAuth = html.filter((page) => page.source.includes('shared-auth.js')).map((page) => page.rel).sort();
assert.deepEqual(pagesUsingAuth, ['admin.html', 'curriculum.html', 'dashboard.html', 'index.html']);
