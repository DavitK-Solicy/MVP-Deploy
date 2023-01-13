import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from 'components/feature/header';
import navBarPaths from 'utils/constants/navBarPaths';
import { LayoutProps } from './types';

import styles from './layout.module.scss';

export default function Layout({ children }: LayoutProps): JSX.Element {
  const router = useRouter();

  useEffect(() => {
    document.getElementById('__next').style.height = '100%';
  }, []);

  return (
    <div className={styles.generalModeBg}>
      {router.pathname !== navBarPaths.login && <Header />}
      {children}
    </div>
  );
}
