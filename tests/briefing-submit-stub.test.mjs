import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { createServer as createNetServer } from 'node:net';
import { tmpdir } from 'node:os';
import { extname, join } from 'node:path';

function freePort() {
  return new Promise((resolve, reject) => {
    const probe = createNetServer();
    probe.once('error', reject);
    probe.listen(0, '127.0.0.1', () => {
      const { port } = probe.address();
      probe.close(() => resolve(port));
    });
  });
}

const root = new URL('..', import.meta.url);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
};

const server = createServer(async (req, res) => {
  const path = decodeURIComponent(req.url.split('?')[0]);
  const file = join(root.pathname, path === '/' ? 'index.html' : path);
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('missing');
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port: httpPort } = server.address();

const userData = await mkdtemp(join(tmpdir(), 'chrome-rm-'));
const debugPort = await freePort();
const chrome = spawn('/usr/local/bin/google-chrome', [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--disable-dev-shm-usage',
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${userData}`,
  'about:blank',
], { stdio: ['ignore', 'pipe', 'pipe'] });

let stderr = '';
chrome.stderr.on('data', (chunk) => { stderr += chunk.toString(); });
await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error(`chrome did not start\n${stderr}`)), 15000);
  chrome.stderr.on('data', () => {
    if (stderr.includes('DevTools listening')) {
      clearTimeout(timer);
      resolve();
    }
  });
});

const version = await fetch(`http://127.0.0.1:${debugPort}/json/version`).then((response) => response.json());
const browser = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  browser.addEventListener('open', resolve);
  browser.addEventListener('error', () => reject(new Error('devtools websocket failed')));
});

let nextId = 1;
const pending = new Map();
const requests = [];
function send(method, params = {}, sessionId) {
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    const message = { id, method, params };
    if (sessionId) message.sessionId = sessionId;
    browser.send(JSON.stringify(message));
  });
}
browser.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.method === 'Network.requestWillBeSent' && message.params?.request?.url) {
    requests.push(message.params.request.url);
  }
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolve(message.result);
  }
});

try {
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  await send('Page.enable', {}, sessionId);
  await send('Runtime.enable', {}, sessionId);
  await send('Network.enable', {}, sessionId);
  await send('Network.setBlockedURLs', {
    urls: ['*://script.google.com/*', '*://script.googleusercontent.com/*'],
  }, sessionId);
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      window.__errors = [];
      window.__beacons = [];
      window.addEventListener('error', (event) => window.__errors.push('error:' + event.message));
      window.addEventListener('unhandledrejection', (event) => {
        const reason = event.reason && event.reason.message ? event.reason.message : event.reason;
        window.__errors.push('reject:' + reason);
      });
      const OrigBlob = window.Blob;
      window.Blob = class extends OrigBlob {
        constructor(parts, opts) {
          super(parts, opts);
          this.__text = (parts || []).map((part) => (typeof part === 'string' ? part : '')).join('');
        }
      };
      navigator.sendBeacon = (url, data) => {
        window.__beacons.push({ url: String(url), body: data && data.__text || '' });
        return true;
      };
    `,
  }, sessionId);

  const loaded = new Promise((resolve) => {
    const onMessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.method === 'Page.loadEventFired' && message.sessionId === sessionId) {
        browser.removeEventListener('message', onMessage);
        resolve();
      }
    };
    browser.addEventListener('message', onMessage);
  });
  await send('Page.navigate', { url: `http://127.0.0.1:${httpPort}/briefing.html` }, sessionId);
  await loaded;

  async function evaluate(expression) {
    const result = await send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
    }, sessionId);
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  }

  const first = await evaluate(`(async () => {
    const form = document.querySelector('#reservation-form');
    document.querySelector('#parentName').value = '테스트';
    document.querySelector('#phone').value = '010-0000-0000';
    document.querySelector('#grade').value = '중2';
    document.querySelector('#interest').value = '고등 수능·입시완성';
    document.querySelector('#concern').value = '확인용';
    form.querySelector('input[type=checkbox]').checked = true;
    form.requestSubmit();
    await new Promise((resolve) => setTimeout(resolve, 50));
    const beacon = window.__beacons[0];
    return {
      errors: window.__errors.slice(),
      beaconCount: window.__beacons.length,
      beaconUrl: beacon && beacon.url,
      interestSent: beacon ? JSON.parse(beacon.body).interest : null,
      interestAfter: document.querySelector('#interest').value,
      message: document.querySelector('#formMessage').textContent,
    };
  })()`);

  const second = await evaluate(`(async () => {
    const form = document.querySelector('#reservation-form');
    document.querySelector('#parentName').value = '테스트2';
    document.querySelector('#phone').value = '010-1111-2222';
    document.querySelector('#grade').value = '고1';
    document.querySelector('#concern').value = '두번째';
    form.querySelector('input[type=checkbox]').checked = true;
    form.requestSubmit();
    await new Promise((resolve) => setTimeout(resolve, 50));
    const beacon = window.__beacons[1];
    return {
      errors: window.__errors.slice(),
      beaconCount: window.__beacons.length,
      interestSent: beacon ? JSON.parse(beacon.body).interest : null,
      interestAfter: document.querySelector('#interest').value,
      message: document.querySelector('#formMessage').textContent,
    };
  })()`);

  assert.deepEqual(first.errors, []);
  assert.equal(first.beaconCount, 1);
  assert.match(first.beaconUrl, /^https:\/\/script\.google\.com\/macros\/s\//);
  assert.equal(first.interestSent, '고등 수능·입시완성');
  assert.equal(first.interestAfter, '고등 수능·입시완성');
  assert.match(first.message, /접수되었습니다/);

  assert.deepEqual(second.errors, []);
  assert.equal(second.beaconCount, 2);
  assert.equal(second.interestSent, '고등 수능·입시완성');
  assert.equal(second.interestAfter, '고등 수능·입시완성');
  assert.equal(requests.filter((url) => url.includes('script.google.com')).length, 0);
} finally {
  chrome.kill('SIGKILL');
  server.close();
  browser.close();
  await rm(userData, { recursive: true, force: true });
}
