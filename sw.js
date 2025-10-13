const CACHE = "am-site-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./profile.jpg",
  "./logo.png"
];

// Assets that are nice-to-have but should not break install if missing.
const OPTIONAL_ASSETS = [
  "./resume.pdf"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then(async (cache) => {
      await cache.addAll(ASSETS);
      if (OPTIONAL_ASSETS.length) {
        const results = await Promise.allSettled(
          OPTIONAL_ASSETS.map((asset) => cache.add(asset))
        );
        for (const result of results) {
          if (result.status === "rejected") {
            console.warn("Optional asset failed to cache:", result.reason);
          }
        }
      }
    })
  );
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
