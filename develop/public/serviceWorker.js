const filesToCache = [
    '/index.html',
    '/styles.css',
    '/index.js',
    '/serviceWorker.js'
];

const cacheName = 'myCache';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                return cache.addAll(filesToCache)
            })
            .catch(function (error) {
                console.error(error);
            })
    )
});



self.addEventListener('fetch', function (event) {

    if (event.request.clone().method === 'GET') {
        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                    if (response) {
                        console.log('Network request for ', event.request.url);
                        return response;
                    }
                    return fetch(event.request).then(function (response) {
                        return caches.open(cacheName).then(function (cache) {
                            cache.put(event.request.url, response.clone());
                            return response;
                        });
                    });

                })
        )
    }
});