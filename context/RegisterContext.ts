import { createContext } from 'react';
import { SetState } from './types';

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
  betaCode: string;
  setBetaCode: SetState<string>;
  register: () => Promise<boolean>;
  error: string | null;
  setError: SetState<string | null>;
  loading: boolean;
  setLoading: SetState<boolean>;
}

export const defaultRegisterContextState: IRegisterContextState = {
  email: '',
  password: '',
  showPassword: false,
  name: '',
  username: '',
  betaCode: '',
  setEmail: () => {},
  setPassword: () => {},
  setShowPassword: () => {},
  setName: () => {},
  setUsername: () => {},
  setBetaCode: () => {},
  register: async () => false,
  error: null,
  setError: () => {},
  loading: false,
  setLoading: () => {},
};

export const RegisterContext = createContext<IRegisterContextState>(defaultRegisterContextState);
