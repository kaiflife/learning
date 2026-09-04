import { create } from 'zustand';

interface UserState {
  name: string;
  isPremium: boolean;
  changeName: (newName: string) => void;
  togglePremium: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: 'Иван Программист',
  isPremium: false,
  changeName: (newName) => set({ name: newName }),
  togglePremium: () => set((state) => ({ isPremium: !state.isPremium })),
}));
