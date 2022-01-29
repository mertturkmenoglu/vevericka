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

  return (
    <LoginContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        setShowPassword,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
