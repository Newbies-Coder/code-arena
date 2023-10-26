import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin'
import visualizer from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [react(), nxViteTsPaths(), visualizer()] as any,

  cacheDir: './node_modules/.vite/frontend',

  server: {
    open: '/index.html',
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

  test: {
    globals: true,
    cache: { dir: './node_modules/.vitest' },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
})
