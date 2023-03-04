self.addEventListener('install', function (e) {
  console.log('ServiceWorker install')
});

self.addEventListener('activate', function (e) {
  console.log('ServiceWorker activate')
});

self.addEventListener('fetch', function (event) {
  console.log('ServiceWorker loaded')
});