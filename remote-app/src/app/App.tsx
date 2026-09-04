import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { RemoteLayout, remoteRoutes } from "./index"; // Импортируем из нашего Public API

// Создаем локальный роутер для режима песочницы
const localSandboxRouter = createBrowserRouter([
  {
    path: "/panel", // Эмулируем тот же префикс, что будет в Host-приложении
    element: <RemoteLayout />,
    children: remoteRoutes,
  },
  {
    // Если разработчик зашел просто на http://localhost:5001/, редиректим на /panel
    path: "*",
    element: <Navigate to="/panel" replace />,
  },
]);

export default function App() {
  return (
    <div className="sandbox-wrapper min-h-screen bg-slate-950 text-slate-100 p-4">
      <div className="mb-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 p-3 rounded-lg text-sm text-center">
        🚧 Вы находитесь в <strong>Локальной Песочнице (Isolate Mode)</strong>{" "}
        приложения Remote App
      </div>

      <RouterProvider router={localSandboxRouter} />
    </div>
  );
}
