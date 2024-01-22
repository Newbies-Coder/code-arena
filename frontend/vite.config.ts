import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import visualizer from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [react(), nxViteTsPaths(), visualizer()] as any,

  cacheDir: './node_modules/.vite/frontend',

  server: {
    open: true,
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4200,
    host: 'localhost',
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      {
        find: '@assets',
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
      {
        find: '@config',
        replacement: fileURLToPath(new URL('./src/config', import.meta.url)),
      },
      {
        find: '@components',
        replacement: fileURLToPath(new URL('./src/components', import.meta.url)),
      },
      {
        find: '@container',
        replacement: fileURLToPath(new URL('./src/container', import.meta.url)),
      },
      {
        find: '@constants',
        replacement: fileURLToPath(new URL('./src/constants', import.meta.url)),
      },
      {
        find: '@redux',
        replacement: fileURLToPath(new URL('./src/redux', import.meta.url)),
      },
    ],
  },

  test: {
    globals: true,
    cache: { dir: './node_modules/.vitest' },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },

  build: {
    sourcemap: true,
  },
})
