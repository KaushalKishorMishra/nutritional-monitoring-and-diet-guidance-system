import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
    registerType: "autoUpdate",
    manifest: {
      name: "Nutrition Monitoring and Diet Guidance System",
      short_name: "NMDGS",
      description: "A nutritional monitoring and diet guidance system for health-conscious individuals.",
      theme_color: "#ffffff",
      icons: [
        {
          src: "/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg,ts}"],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\.example\.com\/.*/i,
          handler: "CacheFirst",
          options: {
            cacheName: "api-cache",
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24, // 1 day
            },
          },
        },
      ],
    },
  }),
  ],

})