import React, { createContext } from 'react';

export interface AppUser {
  email: string;
  username: string;
  userId: string | number;
  image: string;
  name: string;
}

export interface AppContextState {
  user: AppUser;
  setUser: React.Dispatch<React.SetStateAction<AppUser>>;
}

export const defaultAppContextState: AppContextState = {
  user: {
    email: '',
    username: '',
    userId: '',
    image: '/assets/profile.png',
    name: '',
  },
  setUser: () => {},
};

export const AppContext = createContext<AppContextState>(defaultAppContextState);
