import { createContext } from "react";
import { SetState } from "./types";

export interface ILoginContextState {
  email: string;
  setEmail: SetState<string>;
  password: string;
  setPassword: SetState<string>;
  showPassword: boolean;
  setShowPassword: SetState<boolean>;
}

const defaultLoginContextState: ILoginContextState = {
  email: '',
  password: '',
  showPassword: false,
  setEmail: () => { },
  setPassword: () => { },
  setShowPassword: () => { },
};

export const LoginContext = createContext<ILoginContextState>(defaultLoginContextState);
