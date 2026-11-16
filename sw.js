/* Cross X Speak Standard v0.2.3; GitHub Pages project-path safe. */
const CACHE_PREFIX = 'crossxspeak-standard-shell-';
const CACHE_NAME = CACHE_PREFIX + 'v0.2.3-pwa2-backup';
const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(
      names.filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
        .map(name => caches.delete(name))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const scope = self.registration.scope;
  if (url.origin !== self.location.origin || !url.href.startsWith(scope)) return;
  if (request.mode === 'navigate') {
    // Prefer fresh HTML after a deployment; use a cached shell offline.
    event.respondWith(fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.put(request, copy)));
      }
      return response;
    }).catch(async () => {
      return (await caches.match(request, { ignoreSearch: true })) ||
        (await caches.match(new URL('index.html', scope).href)) ||
        Response.error();
    }));
  } else {
    // Static files carry a versioned cache; refreshed when the worker updates.
    event.respondWith(caches.match(request).then(cached => cached || fetch(request)));
  }
});
