import { PageHeaderProps } from './type';

import styles from './pageTitle.module.scss';

export default function PageTitle({ title }: PageHeaderProps): JSX.Element {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title ?? 'Good Evening'}</p>
      <p className={styles.date}>17 Nov 2022 | 07: 00 PM IST</p>
    </div>
  );
}
