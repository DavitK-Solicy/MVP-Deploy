import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Footer from 'components/feature/footer';
import Header from 'components/feature/header';
import SideBar from 'components/feature/sidebar';
import { currentPath } from 'utils/constants/steps';
import localStorageKeys from 'utils/constants/localStorageKeys';
import { UserServiceContext } from 'utils/services/service/userService';
import * as localStorage from 'utils/services/localStorageService';
import { AuthContext } from 'utils/context/auth/context';
import { getItemFromLocalStorage } from 'utils/services/localStorageService';
import { LayoutProps } from './types';

import styles from './layout.module.scss';

export default function Layout({ children }: LayoutProps): JSX.Element {
  const router = useRouter();
  const isAuthPath: boolean = currentPath(router.pathname);
  const userService = useContext(UserServiceContext);
  const isAuthorized = useContext(AuthContext).authorized;

  const currentUserChecking = async (): Promise<void> => {
    const token = getItemFromLocalStorage(
      localStorageKeys.TOKEN_KEY
    ).toString();
    if (token) {
      const res = await userService.getCurrentUser();
      if (!res?.success) localStorage.clearLocalStorage();
    }
  };

  useEffect(() => {
    if (isAuthorized) currentUserChecking();
  }, [router.pathname]);

  return (
    <div className={styles.generalModeBg}>
      {isAuthPath && <SideBar />}
      <div className={styles.rightSection}>
        {isAuthPath ? <Header /> : <div className={styles.header} />}
        <div className={styles.context}>{children}</div>
        <Footer />
      </div>
    </div>
  );
}
