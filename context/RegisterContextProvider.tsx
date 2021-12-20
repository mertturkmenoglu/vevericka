import { useState } from 'react';
import { RegisterContext } from './RegisterContext';

export interface RegisterContextProviderProps {
  children: React.ReactNode;
}

const RegisterContextProvider: React.FC<RegisterContextProviderProps> = ({
  children,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

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
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterContextProvider;
