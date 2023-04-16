import { create } from 'zustand';
import { UserFragmentFragment } from '../generated/graphql';

interface AppStoreState {
  user: UserFragmentFragment | null;
  setUser: (user: UserFragmentFragment) => void;
}

export const useAppStore = create<AppStoreState>((set) => ({
  user: null,
  setUser: (user: UserFragmentFragment) => set({ user }),
}));
