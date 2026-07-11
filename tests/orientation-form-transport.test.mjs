import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

for (const page of ['funnel.html', 'book.html']) {
  const source = await readFile(new URL(`../${page}`, import.meta.url), 'utf8');

  assert.match(source, /mode:\s*['"]no-cors['"]/);
  assert.match(source, /Content-Type['"]?\s*:\s*['"]text\/plain;charset=utf-8['"]/);
  assert.doesNotMatch(source, /Content-Type['"]?\s*:\s*['"]application\/json['"]/);
}
