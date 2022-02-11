import { useState } from 'react';
import {
  RegisterContext,
  defaultRegisterContextState as defaultValues,
} from './RegisterContext';
import { Auth } from '../backend/Auth';
import { isApiError } from '../utils/isApiError';

export interface RegisterContextProviderProps {}

const RegisterContextProvider: React.FC<RegisterContextProviderProps> = ({
  children,
}) => {
  const [email, setEmail] = useState(defaultValues.email);
  const [password, setPassword] = useState(defaultValues.password);
  const [showPassword, setShowPassword] = useState(defaultValues.showPassword);
  const [name, setName] = useState(defaultValues.name);
  const [username, setUsername] = useState(defaultValues.username);
  const [betaCode, setBetaCode] = useState(defaultValues.betaCode);
  const [error, setError] = useState<string | null>(defaultValues.error);
  const [loading, setLoading] = useState(defaultValues.loading);

  const register = async () => {
    setLoading(true);
    setError(null);

    const response = await Auth.register({
      email,
      password,
      name,
      username,
      betaCode,
    });

    if (isApiError(response)) {
      setLoading(false);
      if (typeof response.message === 'string') {
        setError(response.message);
      } else if (Array.isArray(response.message)) {
        setError(response.message[0]);
      }

      return false;
    }

    setLoading(false);
    setError(null);
    return true;
  };

  return (
    <RegisterContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        name,
        setName,
        username,
        setUsername,
        betaCode,
        setBetaCode,
        register,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterContextProvider;
