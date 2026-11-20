import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (name) => readFile(new URL(`../${name}`, import.meta.url), 'utf8');

const index = await read('index.html');
const booking = index.slice(index.indexOf('id="booking"'), index.indexOf('id="testimonials"'));

assert.match(index, /<link rel="canonical" href="https:\/\/readmaster\.moonlang\.com\/"\/>/);
assert.match(index, /<meta name="robots" content="noindex, follow"\/>/);
assert.doesNotMatch(index, /접수되었습니다/);
assert.doesNotMatch(index, /function submit\(/);
assert.match(booking, /https:\/\/docs\.google\.com\/forms\/d\/e\/1FAIpQLSeA67I2WULDwAVXb2BO_OdZ9ogxAxJfDfhXcQ3ia-dqLT3hzw\/viewform/);
assert.match(booking, /href="tel:01033687873"/);
assert.doesNotMatch(booking, /<form[\s>]/);
assert.doesNotMatch(booking, /<input[\s>]/);

const indexable = {
  'briefing.html': 'https://readmaster-funnel.vercel.app/briefing',
  'briefing-curriculum.html': 'https://readmaster-funnel.vercel.app/briefing-curriculum',
  'okgil.html': 'https://readmaster-funnel.vercel.app/okgil',
};
for (const [file, canonical] of Object.entries(indexable)) {
  const source = await read(file);
  assert.match(source, new RegExp(`<link rel="canonical" href="${canonical.replaceAll('/', '\\/')}"\\/?`));
  assert.doesNotMatch(source, /noindex/);
}

const dashboard = await read('dashboard.html');
assert.match(dashboard, /<meta name="robots" content="noindex, follow"\/>/);

const briefing = await read('briefing.html');
assert.doesNotMatch(briefing, /data-grade-tab/);
assert.match(briefing, /if \(chosenInterest\) interest\.value = chosenInterest/);

const robots = await read('robots.txt');
assert.match(robots, /Allow: \//);
assert.doesNotMatch(robots, /Disallow:/);
assert.match(robots, /Sitemap: https:\/\/readmaster-funnel\.vercel\.app\/sitemap\.xml/);

const sitemap = await read('sitemap.xml');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert.deepEqual(locs, [
  'https://readmaster-funnel.vercel.app/briefing',
  'https://readmaster-funnel.vercel.app/briefing-curriculum',
  'https://readmaster-funnel.vercel.app/okgil',
]);
