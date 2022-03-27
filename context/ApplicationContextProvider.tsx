import { useState } from 'react';
import { ApplicationContext, defaultApplicationContextState as defaultValues } from './ApplicationContext';

export interface ApplicationContextProviderProps {}

const ApplicationContextProvider: React.FC<ApplicationContextProviderProps> = ({ children }) => {
  const [email, setEmail] = useState(defaultValues.user.email);
  const [username, setUsername] = useState(defaultValues.user.username);
  const [userId, setUserId] = useState<string | number>(defaultValues.user.userId);
  const [image, setImage] = useState(defaultValues.user.image);
  const [name, setName] = useState(defaultValues.user.name);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <ApplicationContext.Provider
      value={{
        user: {
          email,
          username,
          userId,
          image,
          name,
          setEmail,
          setUsername,
          setUserId,
          setImage,
          setName,
        },
        isDarkTheme,
        setIsDarkTheme,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
