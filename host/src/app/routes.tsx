import { createBrowserRouter, RouterProvider, Link, Outlet } from 'react-router';
import { MainPage } from '../pages/main';

function MainLayout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Главная (Host)</Link>
          <Link to="/panel">Микрофронтенд (Дашборд)</Link>
          <Link to="/panel/settings">Микрофронтенд (Настройки)</Link>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'panel',
        lazy: async () => {
          const module = await import('remote_app/RemoteRouter');
          return { Component: module.RemoteLayout };
        },
        children: await import('remote_app/RemoteRouter')
          .then((m) => m.remoteRoutes)
          .catch(() => []),
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
