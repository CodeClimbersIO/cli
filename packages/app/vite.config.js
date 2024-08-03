import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  root: 'src',
  build: {
    outDir: '../../../dist/app',
    emptyOutDir: true,
  },
  server: {
    fs: {
      allow: [
        // search up for workspace root
        '../../../dist',
        './',
        '../../../node_modules',
      ],
    },
  },
})
