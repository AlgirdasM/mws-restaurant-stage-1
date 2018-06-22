const staticCacheName = 'rr-static-v1';

self.addEventListener('install', function(event) {
	const urlsToCache = [
		'/',
		'restaurant.html',
		'css/styles.css',
		'css/responsive.css',
		'js/dbhelper.js',
		'js/main.js',
		'js/restaurant_info.js',
		'js/init.js',
		'js/vpfix.js',
		'data/restaurants.json',
		'img/offline-pic.jpg',
		'404.html'
	];

	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			// if we have response in cache, then respond with cache
			if (response) {
				return response;
			}
			// if response is not in cache, get it from network
			return fetch(event.request).then(function(response) {
				// if 404, then match with 404 page
				if (response.status === 404) {
					return caches.match('404.html');
				}
				// cache it
				return caches.open(staticCacheName).then(function(cache) {
					// don't cache browser-sync events
					if (event.request.url.indexOf('browser-sync') < 0) {
						cache.put(event.request.url, response.clone());
					}
					return response;
				});
			});
		}).catch(function(error) {
			// return offline-pic.jpg if jpg is not found.
			if (event.request.url.slice(-3) === 'jpg') {
				return caches.match('img/offline-pic.jpg');
			}
			return caches.match('404.html');
		})
	);
});

// remove unused caches
self.addEventListener('activate', function(event) {
	var cacheWhitelist = [staticCacheName];

	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName) {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

// skip waiting and install
self.skipWaiting();