import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ClaudeMagicUI',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['fs', 'path', 'os']
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/generators': resolve(__dirname, 'src/generators'),
      '@/templates': resolve(__dirname, 'src/templates'),
      '@/utils': resolve(__dirname, 'src/utils'),
      '@/lib': resolve(__dirname, 'lib')
    }
  },
  test: {
    environment: 'node',
    globals: true
  }
});