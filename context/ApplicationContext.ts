import { createContext } from "react";
import { SetState } from "./types";

export interface IApplicationContextState {
  user: {
    email: string;
    setEmail: SetState<string>;
    username: string;
    setUsername: SetState<string>;
    userId: string;
    setUserId: SetState<string>;
    image: string;
    setImage: SetState<string>;
    name: string;
    setName: SetState<string>;
  };
  isDarkTheme: boolean;
  setIsDarkTheme: SetState<boolean>;
}

export const defaultApplicationContextState: IApplicationContextState = {
  user: {
    email: '',
    username: '',
    userId: '',
    image: '/assets/profile.png',
    name: '',
    setEmail: () => { },
    setUsername: () => { },
    setUserId: () => { },
    setImage: () => { },
    setName: () => { },
  },
  isDarkTheme: false,
  setIsDarkTheme: () => { },
};

export const ApplicationContext = createContext<IApplicationContextState>(defaultApplicationContextState);
