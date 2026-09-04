import React, { Suspense } from 'react';

const RemoteCounterButton = React.lazy(() =>
  import('remote_app/CounterButton').then((module) => ({ default: module.CounterButton }))
);

export function MainPage() {
  return (
    <main>
      <h1>Главная страница (Слой Pages)</h1>
      <p>Этот контент находится внутри host-приложения по методологии FSD.</p>

      <div>
        <Suspense fallback={<div>Загрузка удаленной фичи...</div>}>
          <RemoteCounterButton />
        </Suspense>
      </div>
    </main>
  );
}
