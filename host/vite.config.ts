import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'host_app',
      remotes: {
        remote_app: {
          type: 'module',
          entry: 'http://localhost:5001/remoteEntry.js',
          name: 'remove_app',
        },
      },
      shared: {
        react: { singleton: true },
        'react-dom': { singleton: true },
        'react-router': { singleton: true, requiredVersion: 'auto' },
      },
    }),
  ],
  server: {
    port: 3000, // Фиксируем порт 3000 для хоста
  },
  build: {
    target: 'esnext',
  },
});
