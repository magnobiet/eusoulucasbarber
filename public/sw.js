/* eslint-disable sonarjs/no-invariant-returns, unicorn/prefer-await, unicorn/no-unnecessary-global-this */

const CACHE_NAME = 'eusoulucasbarber-_HASH_';

const urlsToCache = [
  '/',
  '/apple-touch-icon.png',
  '/favicon-96x96.png',
  '/favicon.ico',
  '/favicon.svg',
  '/web-app-manifest-192x192.png',
  '/web-app-manifest-512x512.png'
];

globalThis.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    globalThis.skipWaiting();
  }
});

globalThis.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

globalThis.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  event.respondWith(caches.match(request).then((response) => {
    return response || fetch(request).then((response) => {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }

      const responseToCache = response.clone();

      caches.open(CACHE_NAME).then((cache) => {
        cache.put(request, responseToCache);
      });

      return response;
    });
  }));
});

globalThis.addEventListener('activate', (event) => {
  const cacheWhitelist = new Set([CACHE_NAME]);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((cacheName) => {
        if (!cacheWhitelist.has(cacheName)) {
          return caches.delete(cacheName);
        }
      }));
    }).then(() => globalThis.clients.claim()),
  );
});
