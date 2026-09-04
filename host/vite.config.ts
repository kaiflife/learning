import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import pkg from './package.json' with { type: 'json' };

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
      exposes: {
        './userStore': './src/entities/user/index.ts',
      },
      shared: {
        react: { singleton: true, requiredVersion: pkg.dependencies.react },
        'react-dom': { singleton: true, requiredVersion: pkg.dependencies['react-dom'] },
        'react-router': {
          singleton: true,
          requiredVersion: pkg.dependencies['react-router'] || 'auto',
        },
        // 2. Явно передаем версию zustand из зависимостей
        zustand: { singleton: true, requiredVersion: pkg.dependencies.zustand || 'auto' },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000, // Фиксируем порт 3000 для хоста
  },
  build: {
    target: 'esnext',
  },
});
