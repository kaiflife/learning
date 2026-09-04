import { create } from "zustand";

export interface UserState {
  name: string;
  isPremium: boolean;
  changeName: (newName: string) => void;
  togglePremium: () => void;
}

// 1. Создаем дефолтный локальный стор для ПЕСОЧНИЦЫ
const useLocalSandboxStore = create<UserState>((set) => ({
  name: "Иван Программист (Локально в Remote)",
  isPremium: true,
  changeName: (newName) => set({ name: newName }),
  togglePremium: () => set((state) => ({ isPremium: !state.isPremium })),
}));

// Переменная, куда Хост запишет свой оригинальный стор
let injectedStore: any = null;

export const injectExternalUserStore = (store: any) => {
  injectedStore = store;
};

// Экспортируем функцию-хук, которая будет динамически выбирать:
// использовать стор Хоста или свой локальный в песочнице
export const useUserStore = (selector?: (state: UserState) => any) => {
  const currentStore = injectedStore || useLocalSandboxStore;
  return currentStore(selector);
};
