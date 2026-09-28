/* ReadMaster funnel events: no field values, no changes to submission handlers. */
(() => {
  'use strict';
  const safe = fn => { try { return fn(); } catch (_) { /* Analytics is optional. */ } };
  const key = 'rm-analytics-buffer';
  function track(event, details = {}) {
    safe(() => {
      const item = { event, page_path: location.pathname, timestamp: new Date().toISOString(),
        cta_id: null, section_id: null, form_id: null, reason: null, outcome: null, ...details };
      safe(() => (window.dataLayer = window.dataLayer || []).push(item));
      const sent = safe(() => {
        const endpoint = (window.__RM_ANALYTICS__ || {}).endpoint;
        return endpoint && navigator.sendBeacon(endpoint,
          new Blob([JSON.stringify(item)], { type: 'text/plain;charset=utf-8' }));
      });
      if (!sent) safe(() => {
        let queue = safe(() => JSON.parse(localStorage.getItem(key))) || [];
        if (!Array.isArray(queue)) queue = [];
        localStorage.setItem(key, JSON.stringify([...queue.slice(-99), item]));
      });
    });
  }
  function init() {
    track('page_view');
    document.addEventListener('click', e => safe(() => {
      const cta = e.target.closest('[data-cta]');
      if (cta) track('cta_click', { cta_id: cta.dataset.cta });
    }), true);
    safe(() => {
      const seen = new Set();
      const observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const section = entry.target.id === 'reservation' ? 'booking' : entry.target.id;
        if (!seen.has(section)) { seen.add(section); track('section_view', { section_id: section }); }
        observer.unobserve(entry.target);
      }), { threshold: 0 });
      document.querySelectorAll('#booking, #reservation, #faq, #testimonials').forEach(el => observer.observe(el));
    });
    const form = document.querySelector('#reservation, #booking .form-card');
    if (!form) return;
    const form_id = form.id || 'booking';
    let started = false, pending = false, invalid = false;
    const emit = (event, details = {}) => track(event, { form_id, ...details });
    const start = () => { if (!started) { started = true; emit('form_start'); } };
    ['focusin', 'input', 'change'].forEach(type => form.addEventListener(type, e => {
      if (e.target.matches('input, select, textarea')) start();
    }));
    form.addEventListener('click', e => {
      if (e.target.closest('.radio-opt')) start();
    });
    if (form.tagName === 'FORM') {
      form.addEventListener('invalid', () => {
        start();
        if (!invalid) {
          invalid = true;
          emit('form_error', { reason: 'validation' });
          queueMicrotask(() => { invalid = false; });
        }
      }, true);
      form.addEventListener('submit', () => {
        start(); pending = true; emit('form_submit');
      }, true);
      safe(() => new MutationObserver(() => safe(() => {
        if (!pending) return;
        const message = document.querySelector('#formMessage').textContent;
        if (!message) return;
        pending = false;
        if (message.includes('접수되었습니다')) emit('form_success', { outcome: 'beacon_queued' });
        else emit('form_error', { reason: 'submission_message' });
      })).observe(document.querySelector('#formMessage'), { childList: true, subtree: true, characterData: true }));
    } else {
      // The legacy index booking button only validates and displays an alert.
      const button = form.querySelector('.btn-submit');
      button.addEventListener('click', () => { start(); emit('form_submit'); }, true);
      button.addEventListener('click', () => safe(() => {
        const complete = ['f-name', 'f-grade', 'f-phone', 'f-date'].every(id => document.getElementById(id).value);
        if (complete) emit('form_success', { outcome: 'local_confirmation' });
        else emit('form_error', { reason: 'validation' });
      }));
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => safe(init), { once: true });
  else safe(init);
})();
