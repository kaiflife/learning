import { createBrowserRouter, RouterProvider, Link, Outlet, useLocation } from 'react-router';
import { MainPage } from '../pages/main';
import { useUserStore } from '@/entities/user';

function MainLayout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-sky-500/30">
      {/* Шапка приложения */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Логотип / Название проекта */}
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-sky-500 animate-pulse" />
            <span className="font-mono text-xs tracking-wider text-slate-400 uppercase">
              FSD Monorepo Platform
            </span>
          </div>

          {/* Навигационное меню */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive('/')
                  ? 'bg-slate-800 text-sky-400 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              Главная (Host)
            </Link>

            <Link
              to="/panel"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive('/panel') && location.pathname === '/panel'
                  ? 'bg-slate-800 text-sky-400 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              Дашборд (Remote)
            </Link>

            <Link
              to="/panel/settings"
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                isActive('/panel/settings')
                  ? 'bg-slate-800 text-sky-400 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
              }`}
            >
              Настройки (Remote)
            </Link>
          </nav>
        </div>
      </header>

      {/* Основной контейнер для страниц (Outlet) */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="transition-all duration-300">
          <Outlet />
        </div>
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

          if (module.injectExternalUserStore) {
            module.injectExternalUserStore(useUserStore); // Внедряем стор хоста в рантайме!
          }
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
