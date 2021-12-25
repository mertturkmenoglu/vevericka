import { createContext } from "react";
import { SetState } from "./types";

export interface IRegisterContextState {
  email: string;
  setEmail: SetState<string>;
  password: string;
  setPassword: SetState<string>;
  showPassword: boolean;
  setShowPassword: SetState<boolean>;
  name: string;
  setName: SetState<string>;
  username: string;
  setUsername: SetState<string>;
}

export const defaultRegisterContextState: IRegisterContextState = {
  email: '',
  password: '',
  showPassword: false,
  name: '',
  username: '',
  setEmail: () => { },
  setPassword: () => { },
  setShowPassword: () => { },
  setName: () => { },
  setUsername: () => { },
};

export const RegisterContext = createContext<IRegisterContextState>(defaultRegisterContextState);
