const CACHE_NAME = 'template-nextjs-_HASH_';
const urlsToCache = [
  '/',
  '/apple-touch-icon.png',
  '/favicon-96x96.png',
  '/favicon.ico',
  '/favicon.svg',
  '/web-app-manifest-192x192.png',
  '/web-app-manifest-512x512.png'
];

globalThis.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

globalThis.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

globalThis.addEventListener('activate', (event) => {
  const cacheWhitelist = new Set([CACHE_NAME]);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.has(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
