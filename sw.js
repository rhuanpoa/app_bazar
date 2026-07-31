/* Service worker do Bazar da Anna.
   Deixa o app abrir sem internet. Suba o número da versão a cada mudança
   para forçar o iPhone a baixar os arquivos novos. */

const VERSAO = 'bazar-v1';

const ARQUIVOS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSAO)
      .then((c) => c.addAll(ARQUIVOS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((nomes) => Promise.all(nomes.filter((n) => n !== VERSAO).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Páginas: rede primeiro, para a Anna receber as atualizações quando estiver online.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copia = res.clone();
          caches.open(VERSAO).then((c) => c.put('./index.html', copia));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Resto (ícone, fontes do Google): cache primeiro, atualizando por baixo.
  e.respondWith(
    caches.match(req).then((cacheado) => {
      const rede = fetch(req)
        .then((res) => {
          if (res && (res.ok || res.type === 'opaque')) {
            const copia = res.clone();
            caches.open(VERSAO).then((c) => c.put(req, copia));
          }
          return res;
        })
        .catch(() => cacheado);
      return cacheado || rede;
    })
  );
});
