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


//This runs every time the fetch function is called in our project
self.addEventListener('fetch', function (event) {
    //http://localhost:3000
    //index.html

    if (event.request.clone().method === 'GET') {
        event.respondWith(
            caches.match(event.request) //identifying the files we need based of off the url
                .then(function (response) {
                    if (response) {
                        console.log('Network request for ', event.request.url);
                        return response;
                    }

                    //getting the files
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