const CACHE = "am-site-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./profile.jpg",
  "./logo.png",
  "./resume.pdf"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
});
