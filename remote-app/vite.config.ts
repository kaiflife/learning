import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "remote_app",
      filename: "remoteEntry.js",
      exposes: {
        "./CounterButton": "./src/features/counter-button/index.ts",
        "./RemoteRouter": "./src/app/index.ts",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
        "react-router": { singleton: true, requiredVersion: "auto" },
      },
    }),
  ],
  server: {
    port: 5001, // Фиксируем порт 5001 для dev-сервера
    cors: true, // Разрешаем CORS, чтобы host мог скачать remoteEntry.js
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  preview: {
    port: 5001, // Фиксируем порт 5001 для preview-сервера
    cors: true,
  },
  build: {
    target: "esnext",
  },
});
