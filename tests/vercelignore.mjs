import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export const root = new URL('..', import.meta.url);

export function parseIgnore(text) {
  return text.split('\n').flatMap((line) => {
    const comment = line.indexOf('#');
    const rule = (comment === -1 ? line : line.slice(0, comment)).trim();
    return rule ? [rule] : [];
  });
}

function matches(rule, rel) {
  if (rule.endsWith('/')) {
    const dir = rule.slice(0, -1);
    return rel === dir || rel.startsWith(`${dir}/`);
  }
  if (rule.startsWith('*.')) {
    return rel.split('/').pop().endsWith(rule.slice(1));
  }
  if (rule.includes('*') || rule.startsWith('!')) {
    throw new Error(`unsupported vercelignore rule: ${rule}`);
  }
  return rel === rule;
}

export function isIgnored(rel, rules) {
  return rules.some((rule) => matches(rule, rel));
}

export async function listRepoFiles(dir = root, base = '') {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === '.vercel') continue;
    const rel = base ? `${base}/${entry.name}` : entry.name;
    const full = path.join(dir.pathname, entry.name);
    if (entry.isDirectory()) files.push(...await listRepoFiles(new URL(`${entry.name}/`, dir), rel));
    else if (entry.isFile()) files.push(rel);
    else void full;
  }
  return files.sort();
}

export async function loadRules() {
  const text = await readFile(new URL('.vercelignore', root), 'utf8');
  return parseIgnore(text);
}
