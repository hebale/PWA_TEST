/**
 * Service Worker
 */

const _version = 'v3';
const cacheName = 'v1';
const cacheList = [
  './',
  './script/app.js',
  './style/index.css',
  './images/1.jpg',
  './images/2.jpg',
  './images/3.jpg',
  './images/4.jpg',
  './images/5.jpg'
]

const log = msg => {
  console.log(`[ServiceWorker ${_version}] ${msg}`);
}




// INSTALL EVENT
self.addEventListener('install', event => {

  self.skipWaiting(); // 서비스워커 즉시활성화
  
  log('install')
  caches.open(cacheName).then(cache => {
    log('Caching app shell');
    return cache.addAll(cacheList);
  });

});

// ACTIVATE EVENT
self.addEventListener('activate', event => {
  log('Activate');
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheName) {
          log('Removing old cache ' + key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// FETCH
self.addEventListener('fetch', event => {
  log('fetch' + event.request.url )

  if( event.request.url.indexOf('.jpg') !== -1 ){
    event.respondWith(fetch('images/2.jpg'))
  }
});

