import { createContext, Dispatch, SetStateAction } from "react";

type State<T> = Dispatch<SetStateAction<T>>

export interface IRegisterContextState {
  email: string;
  setEmail: State<string>;
  password: string;
  setPassword: State<string>;
  showPassword: boolean;
  setShowPassword: State<boolean>;
  name: string;
  setName: State<string>;
  username: string;
  setUsername: State<string>;
}

const defaultRegisterContextState: IRegisterContextState = {
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
