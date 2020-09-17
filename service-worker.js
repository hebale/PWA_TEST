/**
 * Service Worker
 */

const _version = 'v5';
const cacheName = 'cacheBox2';
const cacheList = [
	'./',
	'./manifest.json',
	'./images/1.png',
	'./images/2.png',
	'./images/3.png',
	'./images/4.png',
	'./images/5.png',
	'./styles/index.css',
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

	event.waitUntil(
		cache.keys().then(keyList => {
			return Promise.all(keyList.map(key => {
                if(key !== cacheName){
                    log('.Removing old cache ' + key);
                    return caches.delete(key);
                }
            }));
		})
	);

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
