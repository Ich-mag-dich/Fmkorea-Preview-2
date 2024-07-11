import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import copyHtmlPlugin from './copy-html-plugin'

const fetchVersion = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return html.replace(
        /__APP_VERSION__/,
        `v${process.env.npm_package_version}`
      )
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fetchVersion(), copyHtmlPlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        popup: new URL('./index.html', import.meta.url).pathname,
        background: new URL('./background.html', import.meta.url).pathname
      }
    }
  }
})
