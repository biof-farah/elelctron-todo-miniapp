import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindscc from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Use relative paths for assets
  plugins: [
    tailwindscc(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My ToDo',
        short_name: 'ToDo',
        description: 'Mini app for ToDo management',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'assets/icon.png',
            sizes: '256x256',
            type: 'image/png'
          }
        ]
      }
    })
  
  ],
})
