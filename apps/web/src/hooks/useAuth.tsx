import { useState } from 'react';
import Cookies from 'universal-cookie';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const cookies = new Cookies();
    return !!cookies.get('jwt-access');
  });

  return [isAuthenticated, setIsAuthenticated];
};
