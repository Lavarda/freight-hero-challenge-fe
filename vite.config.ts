import { defineConfig } from 'vite';
import { join } from 'node:path';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  envDir: join(__dirname, '../../'),
  plugins: [react()],
  resolve: {
    alias: {
      '@': join(__dirname, './src')
    }
  },
  build: {
    emptyOutDir: true,
    rollupOptions: {
      treeshake: true,
      input: './index.html'
    }
  
  },
  server: {
    port: 3000
  }
});
