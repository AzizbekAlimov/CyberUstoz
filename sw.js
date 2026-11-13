const CACHE_PREFIX = "cyberustoz-shell-";
const CACHE_NAME = `${CACHE_PREFIX}v1`;
const APP_SHELL = [
  "/",
  "/offline.html",
  "/manifest.webmanifest",
  "/pwa-192.png",
  "/pwa-512.png",
  "/pwa-maskable-512.png",
  "/favicon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    const response = await fetch("/", { cache: "no-store" });
    if (response.ok) {
      await cache.put("/", response.clone());
      await cacheBuildAssets(response.clone());
    }
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

function isPrivateOrUncacheable(response) {
  const directive = (response.headers.get("cache-control") || "").toLowerCase();
  const vary = (response.headers.get("vary") || "").toLowerCase();
  return directive.includes("private") || directive.includes("no-store") || directive.includes("no-cache") || vary === "*" || /cookie|authorization/.test(vary);
}

async function cacheBuildAssets(htmlResponse) {
  try {
    const html = await htmlResponse.text();
    const paths = [...html.matchAll(/(?:src|href)=["'](\/assets\/[A-Za-z0-9_./-]+\.(?:js|css))["']/g)].map((match) => match[1]);
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(paths.map(async (path) => {
      if (path.includes("..") || path.includes("?")) return;
      try {
        const asset = await fetch(path, { cache: "no-store" });
        if (asset.ok && asset.type === "basic" && !isPrivateOrUncacheable(asset)) await cache.put(path, asset);
      } catch { /* keep install successful when an optional asset is unavailable */ }
    }));
  } catch { /* an HTML parse problem must not prevent the app shell from working */ }
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Authentication, APIs, private avatars, platform endpoints and mutable user data are network-only.
  if (/^\/(?:api|manus-oauth|manus-storage|__manus|__system__)(?:\/|$)/.test(url.pathname)) return;

  if (APP_SHELL.includes(url.pathname) && url.pathname !== "/") {
    event.respondWith((async () => (await caches.match(request)) || fetch(request))());
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response.ok && !isPrivateOrUncacheable(response)) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put("/", response.clone());
          await cacheBuildAssets(response.clone());
        }
        return response;
      } catch {
        return (await caches.match(request)) || (await caches.match("/")) || (await caches.match("/offline.html"));
      }
    })());
    return;
  }

  if (/^\/assets\/[A-Za-z0-9_.-]+-[A-Za-z0-9_-]{8,}\.(?:js|css)$/.test(url.pathname)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok && !isPrivateOrUncacheable(response)) await cache.put(request, response.clone());
      return response;
    })());
  }
});

self.addEventListener("push", (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch { data = { body: event.data ? event.data.text() : "" }; }
  const title = typeof data.title === "string" ? data.title.slice(0, 100) : "KiberUstoz";
  const body = typeof data.body === "string" ? data.body.slice(0, 240) : "Yangi o‘quv eslatmasi.";
  const candidate = typeof data.url === "string" ? data.url : "/learn";
  const target = candidate.startsWith("/") && !candidate.startsWith("//") ? candidate : "/learn";
  event.waitUntil(self.registration.showNotification(title, {
    body,
    icon: "/pwa-192.png",
    badge: "/pwa-192.png",
    tag: typeof data.tag === "string" ? data.tag.slice(0, 80) : "cyberustoz-reminder",
    data: { url: target },
    renotify: false,
  }));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = event.notification.data && typeof event.notification.data.url === "string" ? event.notification.data.url : "/learn";
  const destination = target.startsWith("/") && !target.startsWith("//") ? target : "/learn";
  event.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
    const existing = clients.find((client) => new URL(client.url).origin === self.location.origin);
    if (existing) return existing.navigate(destination).then(() => existing.focus());
    return self.clients.openWindow(destination);
  }));
});
