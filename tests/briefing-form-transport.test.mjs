import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

for (const page of ['briefing.html', 'briefing-curriculum.html']) {
  const source = await readFile(new URL(`../${page}`, import.meta.url), 'utf8');

  assert.match(source, /navigator\.sendBeacon\(\s*GAS_ENDPOINT/);
  assert.match(source, /text\/plain;charset=utf-8/);
  assert.doesNotMatch(source, /await fetch\(GAS_ENDPOINT/);
}
