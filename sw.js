/* Service worker de Resúmenes: funciona sin conexión con lo ya visitado. */
const V = 'resumenes-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
const FRESH = ['api.github.com', 'raw.githubusercontent.com', 'data.jsdelivr.com'];   // red primero, caché si no hay conexión
const STATIC = ['cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net']; // caché primero
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.hostname === 'api.github.com' && u.pathname.startsWith('/gists')) return; // la sincronización nunca se cachea
  const save = res => { if (res && (res.ok || res.type === 'opaque')) { const c = res.clone(); caches.open(V).then(x => x.put(r, c)); } return res; };
  if (u.origin === location.origin || FRESH.includes(u.hostname)) {
    e.respondWith(fetch(r).then(save).catch(() => caches.match(r).then(m => m || (r.mode === 'navigate' ? caches.match('./index.html') : Response.error()))));
  } else if (STATIC.includes(u.hostname)) {
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(save)));
  }
});
