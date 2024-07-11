import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copyHtmlPlugin from './copy-html-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyHtmlPlugin()],
  define: {
    'process.env': {}
  },
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, 'dist'),
    lib: {
      formats: ['iife'],
      entry: resolve(__dirname, './content-script/index.tsx'),
      name: 'Cat Facts'
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.global.js',
        extend: true
      }
    }
  }
})
