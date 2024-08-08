import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { version } from './package.json'

const define = {
  // Need to clone the version string otherwise it breaks.
  __APP_VERSION__: JSON.stringify(version),
}

export default defineConfig({
  plugins: [react()],
  root: 'src',
  define: {
    ...define,
    __IS_DEV__: true,
  },
  build: {
    outDir: '../../../dist/app',
    emptyOutDir: true,
    define: {
      __IS_DEV__: false,
    },
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
