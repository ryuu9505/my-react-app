import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

const src = (path) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@apis': src('apis'),
      '@assets': src('assets'),
      '@components': src('components'),
      '@contexts': src('contexts'),
      '@hooks': src('hooks'),
      '@pages': src('pages'),
      '@styles': src('styles'),
      '@utils': src('utils'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  // 배포 파이프라인(deploy.yml)이 build/ 디렉토리를 업로드하므로 CRA와 동일하게 유지한다.
  build: {
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
  },
});
