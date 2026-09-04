// host/src/pages/main/ui/MainPage.tsx
import React, { Suspense } from 'react';

// Ленивый импорт из микрофронтенда
const RemoteCounterButton = React.lazy(() =>
  import('remote_app/CounterButton').then((module) => ({ default: module.CounterButton }))
);

export function MainPage() {
  return (
    <main className="space-y-8 animate-fade-in">
      <div className="border-b border-slate-800/60 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent sm:text-4xl">
          Главная страница
        </h1>
        <p className="mt-2 text-sm text-slate-400 font-mono">
          Слой: <span className="text-sky-400">pages</span> / Компонент:{' '}
          <span className="text-emerald-400">MainPage</span>
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-slate-200 mb-2">
          Feature-Sliced Design + Module Federation
        </h2>
        <p className="text-slate-400 leading-relaxed text-sm">
          Этот контент и контейнер отрендерены силами главного приложения (
          <span className="text-indigo-400 font-medium">Host</span>). Ниже находится интерактивная
          фича, которая запрашивается «на лету» с изолированного микрофронтенда (
          <span className="text-violet-400 font-medium">Remote App</span>) по протоколу ESM.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase">
          Интегрированные фичи (Features)
        </h3>

        <div className="relative rounded-2xl border border-dashed border-slate-800 bg-slate-950 p-8 transition-all duration-300 hover:border-slate-700/80 group">
          {/* Декоративная фоновая подсветка */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

          <Suspense
            fallback={
              <div className="flex items-center gap-3 text-sm text-slate-500 font-medium py-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-600 border-t-sky-500" />
                Загрузка удаленной фичи...
              </div>
            }
          >
            <RemoteCounterButton />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
