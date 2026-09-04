declare module 'remote_app/CounterButton' {
  import React from 'react';
  export const CounterButton: React.ComponentType;
}

declare module 'remote_app/RemoteRouter' {
  import type { RouteObject, ComponentType } from 'react-router';

  type TargetUserStore = UseBoundStore<Mutate<StoreApi<UserState>, []>>;

  export const injectExternalUserStore: (store: TargetUserStore) => void;

  export const RemoteLayout: ComponentType;
  export const remoteRoutes: RouteObject[];
}
