import { useState } from 'react';
import { LoginContext } from './LoginContext';

export interface LoginContextProviderProps {
  children: React.ReactNode;
}

const LoginContextProvider: React.FC<LoginContextProviderProps> = ({
  children,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
