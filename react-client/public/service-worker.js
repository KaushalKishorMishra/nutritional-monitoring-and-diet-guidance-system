// public/service-worker.js
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";

// Precache all assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache API responses
registerRoute(
    /^https:\/\/api\.example\.com\/.*/,
    new CacheFirst({
        cacheName: "api-cache",
    })
);