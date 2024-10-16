const CACHE_NAME = 'bem-aventurado-cache-v45';
const urlsToCache = [
  '/projetos/index.html',
  '/projetos/style.css',
  '/projetos/script.js',
  '/projetos/manifest.json',
  '/projetos/service-worker.js',
  '/projetos/icones/pwa_icon_192x192b.png',
  '/projetos/icones/pwa_icon_512x512a.png',
  '/projetos/felicidade.webp',
  '/projetos/img/captura-de-tela_desktop.png',
  '/projetos/img/captura-de-tela-mobile.jpeg'
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
            console.log('Limpando cache antigo:', cacheName);
            return caches.delete(cacheName); // Remove caches antigos
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


/* // Interceptar e responder a solicitações de rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Clona a resposta da rede
        const responseToCache = networkResponse.clone();

        // Atualiza o cache com a nova resposta
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache); // Armazena a resposta clonada
        });

        return networkResponse; // Retorna a resposta da rede
      });

      // Retorna a resposta do cache, mas ainda tenta buscar a versão mais recente
      return cachedResponse || fetchPromise;
    })
  );
}); */



