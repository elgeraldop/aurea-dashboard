import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'AUREA Digital Office',
        short_name: 'AUREA',
        description: 'Gestión operativa de AUREA Enterprises',
        theme_color: '#1D293F',
        background_color: '#F0F2F5',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        runtimeCaching: [{
          urlPattern: /^https:\/\/pxwjwldrskiovcmgysjj\.supabase\.co/,
          handler: 'NetworkFirst',
          options: { cacheName: 'supabase-cache' }
        }]
      }
    })
  ],
  server: { port: 3000, host: true },
  build: { outDir: 'dist', sourcemap: true }
})
