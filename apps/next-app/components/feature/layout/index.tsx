import Footer from 'components/feature/footer';
import Header from 'components/feature/header';
import { LayoutProps } from './types';
import SideBar from '../sidebar';

import styles from './layout.module.scss';

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className={styles.generalModeBg}>
      <SideBar />
      <div className={styles.rightSection}>
        <Header />
        <div className={styles.context}>{children}</div>
        <Footer />
      </div>
    </div>
  );
}
