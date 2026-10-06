/* Service worker - Rendición DTV
   - El HTML se pide primero a la red (así llegan las actualizaciones) y, si no hay señal
     o tarda más de 3 segundos, se usa la última copia guardada.
   - Íconos y librerías salen del caché (no cambian).
   - Si se modifican íconos o librerías, subir el número de VERSION para renovar el caché. */
const VERSION = 'v1';
const CACHE = 'rendiciones-' + VERSION;
const ARCHIVOS = [
  './', 'index.html', 'manifest.webmanifest',
  'vendor/cropper.min.css', 'vendor/cropper.min.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png'
];
const ESPERA_RED_MS = 3000;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(claves => Promise.all(claves.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function redConTiempo(req) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ESPERA_RED_MS);
    // cache:'no-cache' = siempre consulta al servidor (si no cambió, responde "sin cambios" al instante)
    fetch(req, { cache: 'no-cache' }).then(r => { clearTimeout(t); resolve(r); }, err => { clearTimeout(t); reject(err); });
  });
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return; // no se toca nada de terceros

  if (req.mode === 'navigate') {
    e.respondWith(
      redConTiempo(req)
        .then(res => {
          if (res.ok) { const copia = res.clone(); caches.open(CACHE).then(c => c.put('index.html', copia)); }
          return res;
        })
        .catch(() => caches.match('index.html'))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copia = res.clone(); caches.open(CACHE).then(c => c.put(req, copia)); }
      return res;
    }))
  );
});
