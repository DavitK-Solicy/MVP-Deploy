import { Input as AntdInput } from 'antd';
import InputProps from './types';

import styles from './input.module.scss';

export default function Input({ label, ...rest }: InputProps): JSX.Element {
  return (
    <div>
      {label && (
        <label htmlFor={rest.id} className={styles.label}>
          {label}
        </label>
      )}
      {rest.type === 'password' ? (
        <AntdInput.Password
          className={`${styles.input} ${rest.className}`}
          {...rest}
        />
      ) : (
        <AntdInput className={`${styles.input} ${rest.className}`} {...rest} />
      )}
    </div>
  );
}
