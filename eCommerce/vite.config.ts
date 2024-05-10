// <reference types="vitest" />
// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        exhibits: resolve(__dirname, "exhibits/index.html"),
      },
    },
  },
})
