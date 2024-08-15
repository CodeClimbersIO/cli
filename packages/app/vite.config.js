import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { version } from '../../package.json'

const define = (mode) => ({
  // Need to clone the version string otherwise it breaks.
  __APP_VERSION__: JSON.stringify(version),
  __IS_DEV__: mode === 'development',
})

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    root: 'src',
    define: {
      ...define(mode),
    },
    build: {
      outDir: '../dist/app',
      emptyOutDir: true,
    },
    server: {
      fs: {
        allow: [
          // search up for workspace root
          '../dist',
          './',
          '../../../node_modules',
        ],
      },
    },
  }
})
