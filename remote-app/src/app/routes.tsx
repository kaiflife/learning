// remote-app/src/app/routes.tsx
import type { RouteObject } from "react-router";
import { Link, Outlet } from "react-router";
import { DashboardPage } from "../pages/dashboard/ui/DashboardPage";
import { SettingsPage } from "../pages/settings/ui/SettingsPage";

export function RemoteLayout() {
  return (
    <div
      style={{ padding: "10px", background: "#f0f0f0", borderRadius: "8px" }}
    >
      <nav style={{ display: "flex", gap: "15px", marginBottom: "10px" }}>
        <Link to="/panel">Главная во фронтенде</Link>
        <Link to="/panel/settings">Настройки во фронтенде</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

export const remoteRoutes: RouteObject[] = [
  {
    index: true,
    element: <DashboardPage />,
  },
  {
    path: "settings",
    element: <SettingsPage />,
  },
];
