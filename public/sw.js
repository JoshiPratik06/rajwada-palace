const CACHE_NAME = 'joshiwada-shell-__BUILD_VERSION__';
const APP_SHELL = [
  '/',
  '/offline.html',
  '/manifest.webmanifest',
  '/joshiwada-mark.svg',
  '/joshiwada-social.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(APP_SHELL);
      const response = await fetch('/');
      if (!response.ok) throw new Error(`Unable to cache app shell: ${response.status}`);

      const html = await response.text();
      const manifestResponse = await fetch('/build-manifest.json');
      if (!manifestResponse.ok) throw new Error(`Unable to fetch build asset manifest: ${manifestResponse.status}`);
      const manifest = await manifestResponse.json();
      const assets = [...new Set(Object.values(manifest).flatMap(({ file, css = [], assets = [] }) => (
        [file, ...css, ...assets].filter(Boolean)
      )).map((path) => path.startsWith('/') ? path : `/${path}`))];
      await cache.addAll(assets);
      await cache.put('/', new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      }));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((key) => key.startsWith('joshiwada-shell-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('/', copy));
          return response;
        })
        .catch(async () => (await caches.match('/')) || (await caches.match('/offline.html')))
    );
    return;
  }

  const isStaticAsset = url.pathname.startsWith('/assets/') ||
    ['/offline.html', '/manifest.webmanifest', '/joshiwada-mark.svg', '/joshiwada-social.svg'].includes(url.pathname);
  if (!isStaticAsset) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
