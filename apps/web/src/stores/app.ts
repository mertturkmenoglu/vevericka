import { create } from 'zustand';
import { UserItemFragment } from '../generated/graphql';

interface AppStoreState {
  user: UserItemFragment | null;
  setUser: (user: UserItemFragment) => void;
}

export const useAppStore = create<AppStoreState>((set) => ({
  user: null,
  setUser: (user: UserItemFragment) => set({ user }),
}));
