var cacheName = 'weatherPWA-v1';
var filesToCache = [
    '/',
    '/index.html',
    '/scripts/app.js',
    '/scripts/localforage-1.4.0.js',
    '/styles/ud811.css',
    '/images/clear.png',
    '/images/cloudy-scattered-showers.png',
    '/images/cloudy.png',
    '/images/fog.png',
    '/images/ic_add_white_24px.svg',
    '/images/ic_refresh_white_24px.svg',
    '/images/partly-cloudy.png',
    '/images/rain.png',
    '/images/scattered-showers.png',
    '/images/sleet.png',
    '/images/snow.png',
    '/images/thunderstorm.png',
    '/images/wind.png'
  ];

  // We wait for the service worker to install and save it in the app shell
  self.addEventListener('install', function(e) {
      console.log('[ServiceWorker] Install');
      e.waitUntil(
          caches.open(cancheName).then(function(cache){
              console.log('[ServiceWorker] Caching app shell');
              return cache.addAll(filesToCache);
          })
      );
  });

  // Removes old cache
  self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList){
            return Promise.all(keyList.map(function(key) {
            if (key !== cacheName) {
              console.log('[ServiceWorker] Removing old cache');
              return caches.delete(key);
            }
          }));
})
    );
});

// if the app needs the inf then return it, otherwise fetch the data of the request
self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});

