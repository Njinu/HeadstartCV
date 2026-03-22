import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist'
  }
  ,
  // Serve the existing `template/` folder as the static public directory
  // so template assets (images, fonts, css, js) are available without copying.
  publicDir: '../template'
})
