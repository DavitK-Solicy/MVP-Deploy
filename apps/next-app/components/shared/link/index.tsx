import NextLink from 'next/link';
import LinkProps from './types';

import styles from './link.module.scss';

export default function Link({ text, children, color, ...rest }: LinkProps) {
  return (
    <div className={styles.linkBox} style={{ color }}>
      <NextLink {...rest}>{text ?? children}</NextLink>
    </div>
  );
}
