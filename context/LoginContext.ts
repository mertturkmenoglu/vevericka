import { TFunction } from 'next-i18next';
import { createContext } from 'react';
import { SetState } from './types';

export interface ILoginContextState {
  email: string;
  setEmail: SetState<string>;
  isEmailValid: boolean;
  password: string;
  setPassword: SetState<string>;
  showPassword: boolean;
  setShowPassword: SetState<boolean>;
  error: string | null;
  setError: SetState<string | null>;
  loading: boolean;
  setLoading: SetState<boolean>;
  login: (t: TFunction) => Promise<void>;
}

export const defaultLoginContextState: ILoginContextState = {
  email: '',
  isEmailValid: true,
  password: '',
  showPassword: false,
  error: null,
  loading: false,
  setEmail: () => {},
  setPassword: () => {},
  setShowPassword: () => {},
  setError: () => {},
  setLoading: () => {},
  login: async () => {},
};

export const LoginContext = createContext<ILoginContextState>(
  defaultLoginContextState
);
