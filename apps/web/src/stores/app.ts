import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface AppStoreState {
  username: string;
}

export const useAppStore = create<AppStoreState>()(
  devtools(() => ({
    username: 'John Doe',
  }))
);
