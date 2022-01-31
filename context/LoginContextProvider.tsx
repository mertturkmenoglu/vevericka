import { useState } from 'react';
import {
  LoginContext,
  defaultLoginContextState as defaultValues,
} from './LoginContext';

export interface LoginContextProviderProps {}

const LoginContextProvider: React.FC<LoginContextProviderProps> = ({
  children,
}) => {
  const [email, setEmail] = useState(defaultValues.email);
  const [password, setPassword] = useState(defaultValues.password);
  const [showPassword, setShowPassword] = useState(defaultValues.showPassword);
  const [error, setError] = useState(defaultValues.error);
  const [loading, setLoading] = useState(defaultValues.loading);

  return (
    <LoginContext.Provider
      value={{
        email,
        setEmail,
        password,
        error,
        loading,
        setPassword,
        showPassword,
        setShowPassword,
        setError,
        setLoading,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
