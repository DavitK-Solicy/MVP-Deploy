import { footerNavLinks } from './types';
import Link from 'components/shared/link';

import styles from './footer.module.scss';

export default function Footer(): JSX.Element {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerText}>
        © 2024 . All rights are reserved by CryptoPool
      </div>
      <div className={styles.footerNavLinks}>
        {footerNavLinks?.map((exp) => (
          <Link key={exp.name} text={exp.name} href={exp.path} />
        ))}
      </div>
    </div>
  );
}
