import { useState } from 'react';
import { AppContext, AppUser } from './AppContext';

export interface AppContextProviderProps {
  children: React.ReactNode;
}

function AppContextProvider({ children }: AppContextProviderProps): JSX.Element {
  const [user, setUser] = useState<AppUser>({
    email: '',
    image: '',
    name: '',
    userId: '',
    username: '',
  });

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
