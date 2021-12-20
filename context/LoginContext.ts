import { createContext, Dispatch, SetStateAction } from "react";

export interface ILoginContextState {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>
  password: string;
  setPassword: Dispatch<SetStateAction<string>>
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
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
