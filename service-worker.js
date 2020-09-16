/**
 * Service Worker
 */

const _version = 'v2';
const cacheName = 'v2';
const cacheList = [
  '/images/1.jpg',
  '/images/2.jpg'
]

const log = msg => {
  console.log(`[ServiceWorker ${_version}] ${msg}`);
}




// INSTALL EVENT
self.addEventListener('install', event => {
  log('install')
});

// ACTIVATE EVENT
self.addEventListener('activate', event => {
  log('activate')
});

// FETCH
self.addEventListener('fetch', event => {
  log('fetch' + event.request.url )

  if( event.request.url.indexOf('.jpg') !== -1 ){
    event.respondWith(fech('.images/2.jpg'))
  }
});

