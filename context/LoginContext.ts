import { createContext } from 'react';
import { SetState } from './types';

export interface ILoginContextState {
  email: string;
  setEmail: SetState<string>;
  password: string;
  setPassword: SetState<string>;
  showPassword: boolean;
  setShowPassword: SetState<boolean>;
  error: string | null;
  setError: SetState<string | null>;
}

export const defaultLoginContextState: ILoginContextState = {
  email: '',
  password: '',
  showPassword: false,
  error: null,
  setEmail: () => { },
  setPassword: () => { },
  setShowPassword: () => { },
  setError: () => { },
};

export const LoginContext = createContext<ILoginContextState>(defaultLoginContextState);
