// Requires Node with built-in WebSocket, a local HTTP server, and headless Chrome CDP.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const origin = process.env.RM_TEST_ORIGIN || 'http://127.0.0.1:8765';
const debug = process.env.RM_CHROME_DEBUG || 'http://127.0.0.1:9222';
const targets = await (await fetch(`${debug}/json/list`)).json();
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }));
let seq = 0;
const pending = new Map();
ws.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  if (message.id) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(JSON.stringify(message.error)));
    else resolve(message.result);
  }
});
function call(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++seq; pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}
async function js(expression) {
  const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  assert.ok(!result.exceptionDetails, JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
async function until(expression) {
  for (let i = 0; i < 100; i++) { if (await js(expression)) return; await pause(100); }
  throw new Error(`Timed out: ${expression}`);
}
try {
  await call('Page.enable');
  await call('Network.enable');
  await call('Network.setBlockedURLs', { urls: ['https://*', 'http://script.google.com/*'] });
  await call('Page.addScriptToEvaluateOnNewDocument', { source: `
    window.alert = () => {};
    window.testBeacons = [];
    window.beaconResult = true;
    navigator.sendBeacon = (url, body) => { testBeacons.push({url, body}); return beaconResult; };
  ` });
  for (const page of ['index.html', 'briefing.html']) {
    const source = readFileSync(new URL(`../${page}`, import.meta.url), 'utf8');
    const original = execFileSync('git', ['show', `HEAD:${page}`], { encoding: 'utf8' });
    const clean = source.replace(/ data-cta="[^"]*"/g, '').replace('<script src="assets/analytics.js" defer></script>\n', '');
    // Before the implementation commit, proves the HTML only gained attributes and a script tag.
    if (!original.includes('assets/analytics.js')) assert.equal(clean, original);
    await call('Page.navigate', { url: `${origin}/${page}` });
    await until("window.dataLayer?.some(e => e.event === 'page_view')");
    assert.equal(await js("dataLayer.filter(e => e.event === 'page_view').length"), 1);
    const section = page === 'index.html' ? 'booking' : 'reservation';
    await js(`document.querySelector('a[data-cta][href="#${section}"]').click(); document.getElementById('${section}').scrollIntoView()`);
    await until("dataLayer.some(e => e.event === 'section_view' && e.section_id === 'booking')");
    assert.ok(await js("dataLayer.some(e => e.event === 'cta_click')"));
    await js(`scrollTo(0,0)`); await pause(150);
    await js(`document.getElementById('${section}').scrollIntoView()`); await pause(150);
    assert.equal(await js("dataLayer.filter(e => e.event === 'section_view' && e.section_id === 'booking').length"), 1);
    const button = page === 'index.html' ? '#booking .btn-submit' : '#reservation button[type=submit]';
    await js(`document.querySelector('${button}').click()`);
    assert.ok(await js("dataLayer.some(e => e.event === 'form_error' && e.reason === 'validation')"));
    const fill = page === 'index.html'
      ? "document.getElementById('f-name').value='TEST';document.getElementById('f-grade').selectedIndex=1;document.getElementById('f-phone').value='01000000000';document.getElementById('f-date').value='2026-10-01T10:00'"
      : "document.getElementById('parentName').value='TEST';document.getElementById('phone').value='01000000000';document.getElementById('grade').selectedIndex=1;document.querySelector('[type=checkbox]').checked=true";
    await js(`${fill};document.querySelector('#${section} input').focus();document.querySelector('${button}').click()`);
    await until("dataLayer.some(e => e.event === 'form_success')");
    assert.equal(await js("dataLayer.filter(e => e.event === 'form_start').length"), 1);
    assert.ok(await js("dataLayer.some(e => e.event === 'form_submit')"));
    if (page === 'briefing.html') {
      await js(`beaconResult=false;${fill};document.querySelector('${button}').click()`);
      await until("dataLayer.some(e => e.event === 'form_error' && e.reason === 'submission_message')");
      await js(`${fill};document.querySelector('${button}').click()`);
      await pause(50);
      assert.equal(await js("dataLayer.filter(e => e.reason === 'submission_message').length"), 2);
    } else {
      await js("document.getElementById('testimonials').scrollIntoView()");
      await until("dataLayer.some(e => e.section_id === 'testimonials')");
    }
    assert.ok(await js("JSON.parse(localStorage.getItem('rm-analytics-buffer')).length > 0"));
    assert.ok(await js("!JSON.stringify(dataLayer).includes('01000000000') && !JSON.stringify(dataLayer).includes('TEST')"));
    await js("window.__RM_ANALYTICS__={endpoint:'/analytics-test'};beaconResult=true;document.querySelector('a[data-cta]').click()");
    assert.ok(await js("testBeacons.some(b => b.url === '/analytics-test')"));
    await js("beaconResult=false;document.querySelector('a[data-cta]').click()");
    assert.equal(await js("JSON.parse(localStorage.getItem('rm-analytics-buffer')).at(-1).event"), 'cta_click');
    await js("localStorage.setItem('rm-analytics-buffer','broken'); document.querySelector('a[data-cta]').click()");
    assert.equal(await js("JSON.parse(localStorage.getItem('rm-analytics-buffer')).length"), 1);
    await js("for(let i=0;i<105;i++) document.querySelector('a[data-cta]').click()");
    assert.equal(await js("JSON.parse(localStorage.getItem('rm-analytics-buffer')).length"), 100);
    const before = await js('dataLayer.length');
    await js("Storage.prototype.setItem=()=>{throw Error('blocked')};navigator.sendBeacon=()=>{throw Error('blocked')};document.querySelector('a[data-cta]').click()");
    assert.equal(await js('dataLayer.length'), before + 1);
    console.log(`${page}: PASS page/CTA/section deduplication, form start/submit/success/error, beacon, buffer cap/corruption/blocked storage; real booking requests blocked`);
    console.log(await js("JSON.stringify(dataLayer.slice(0,14))"));
  }
} finally { ws.close(); }
