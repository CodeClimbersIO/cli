import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  root: 'packages/app',
  build: {
    outDir: '../../dist/app',
    emptyOutDir: true,
  },
})
