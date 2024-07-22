import { fileURLToPath, URL } from 'node:url'
import pugPlugin from 'vite-plugin-pug';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue(), pugPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@import "@/styles/global.sass"`
      }
    }
  },
})
