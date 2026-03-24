/**
 * ReadMaster — Service Worker (self-unregister)
 * This version unregisters itself to fix ERR_FAILED issues.
 */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(
    Promise.all([
      // Clear all caches
      caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))),
      // Unregister self
      self.registration.unregister(),
      // Take control to clear fetch handler
      self.clients.claim(),
    ])
  );
});
// No fetch handler — let all requests pass through normally
