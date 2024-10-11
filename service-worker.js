const CACHE_NAME = 'bem-aventurado-cache-v1';
const urlsToCache = [
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/service-worker.js',
  '/icones/pwa_icon_192x192b.png',
  '/icones/pwa_icon_512x512a.png',
  '/felicidade.webp'
];

// Instalar o service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Arquivos em cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativar o service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Limpando cache antigo');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar e responder a solicitações de rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Retorna do cache
        }
        return fetch(event.request); // Tenta fazer a solicitação na rede
      })
  );
});
