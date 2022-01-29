import { useState } from 'react';
import {
  RegisterContext,
  defaultRegisterContextState as defaultValues,
} from './RegisterContext';

export interface RegisterContextProviderProps {}

const RegisterContextProvider: React.FC<RegisterContextProviderProps> = ({
  children,
}) => {
  const [email, setEmail] = useState(defaultValues.email);
  const [password, setPassword] = useState(defaultValues.password);
  const [showPassword, setShowPassword] = useState(defaultValues.showPassword);
  const [name, setName] = useState(defaultValues.name);
  const [username, setUsername] = useState(defaultValues.username);

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
