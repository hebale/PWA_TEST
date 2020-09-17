/**
 * Service Worker
 */

const _version = 'v4';
const cacheName = 'cacheBox';
const cacheList = [
  './',
  './images/1.png',
  './images/2.png',
  './images/3.png',
  './images/4.png',
  './images/5.png',
  './scripts/app.js'
]

const log = msg => {
  console.log(`[ServiceWorker ${_version}] ${msg}`);
}

// Life cycle: INSTALL
self.addEventListener('install', event => {

  self.skipWaiting();
  log('INSTALL');

  event.waitUntil(
    caches.open(cacheName).then(function(cache){
      log('Caching app shell');
      return cache.addAll(cacheList);      
    })
  );

});

// Life cycle: ACTIVATE
self.addEventListener('activate', event => {
  log('Activate');
});

// Functional: FETCH
self.addEventListener('fetch', event => {
  log('Fetch ' + event.request.url);

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );

});
