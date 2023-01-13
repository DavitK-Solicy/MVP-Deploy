import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from './context';
import * as localStorage from 'utils/services/localStorageService';
import localStorageKeys from 'utils/constants/localStorageKeys';
import navBarPaths from 'utils/constants/navBarPaths';
import { withoutAuthRoutes } from './constants';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const router = useRouter();

  const [authData, setAuthorized] = useState({
    authorized: false,
    path: '/',
  });

  const getAuthToken = (): string | JSON => {
    return localStorage.getItemFromLocalStorage(localStorageKeys.TOKEN_KEY);
  };

  const redirectTo = (path: string): void => {
    const authToken = getAuthToken();

    if (authToken === '') {
      setAuthorized({
        ...authData,
        authorized: false,
      });

      if (withoutAuthRoutes.includes(path.split('?')[0])) {
        router.push(path);
      } else {
        setAuthorized({
          ...authData,
          path: path,
        });
        router.push(navBarPaths.login);
      }
    } else {
      setAuthorized({
        ...authData,
        authorized: true,
        path: '/',
      });
      
      if (path === navBarPaths.login || path === navBarPaths.signUp) {
        router.push('/');
      }
    }
  };

  useEffect(() => {
    redirectTo(router.asPath);
  }, [router.pathname]);

  return (
    <AuthContext.Provider value={authData}> {children}</AuthContext.Provider>
  );
};
