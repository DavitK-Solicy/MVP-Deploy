import { useRouter } from 'next/router';
import { navItems, NavItemsTypes } from './types';
import NavItem from './navItem';
import Image from 'components/shared/image';

import styles from './sidebar.module.scss';

export default function SideBar() {
  const router = useRouter();

  return (
    <div className={styles.navBar}>
      <div className={styles.logoSection}>
        <Image src="/image/cryptopoollogo.png" width="157" height="60" />
      </div>
      <div className={styles.list}>
        {navItems.map((item: NavItemsTypes) => (
          <NavItem
            key={item.text}
            href={item.href}
            icon={item.icon}
            text={item.text}
            activeIcon={item.activeIcon}
            active={router.asPath === item.href}
          />
        ))}
      </div>
    </div>
  );
}
