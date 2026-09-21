// JP Pressure - offline service worker.
//
// Bump CACHE_NAME whenever index.html/manifest/icons change so returning
// visitors pick up the new version instead of a stale cached one.
const CACHE_NAME = 'jp-pressure-v1';

// Paths are relative to this file's own location, so this still works when
// the app is hosted under a GitHub Pages subpath (username.github.io/repo/).
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png'
];

// The Excel export button loads ExcelJS from a CDN at click time. Caching it
// here means Excel export keeps working offline after the first successful
// load; CSV and HTML report exports never needed it and always work offline.
const EXCELJS_CDN_URL = 'https://cdn.jsdelivr.net/npm/exceljs@4.4.0/dist/exceljs.min.js';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // App shell (this origin): cache-first, so the tool opens instantly and
  // works offline; falls back to the network for anything not pre-cached.
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => cached || fetch(req))
    );
    return;
  }

  // ExcelJS from the CDN: network-first (pick up updates when online),
  // falling back to whatever was cached the last time it loaded successfully.
  if (req.url === EXCELJS_CDN_URL) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req))
    );
  }
});
