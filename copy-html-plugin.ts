import { Plugin } from 'vite'
import { promises as fs } from 'fs'
import path from 'path'

const copyHtmlPlugin = (): Plugin => {
  return {
    name: 'copy-html-plugin',
    apply: 'build',
    async buildEnd() {
      const srcPath = path.resolve(__dirname, 'index.html')
      const destPath = path.resolve(__dirname, 'dist', 'index.html')
      await fs.copyFile(srcPath, destPath)
      console.log(`Copied ${srcPath} to ${destPath}`)
    }
  }
}

export default copyHtmlPlugin
