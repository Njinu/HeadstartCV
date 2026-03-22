import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist'
  }
  ,
  // Use the default 'public' folder now that assets are moved inside the project.
  publicDir: 'public'
})
