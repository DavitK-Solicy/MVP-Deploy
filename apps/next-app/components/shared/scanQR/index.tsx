import Icon from 'components/shared/icon';
import Button from 'components/shared/button';
import Image from 'components/shared/image';
import Notification from 'components/shared/notification';
import { imagesSvg } from 'utils/constants/imagesSrc';

import styles from './scan.module.scss';

export default function ScanQR(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h1>Scan QR</h1>
        <Icon src={imagesSvg.gradientLine} width={60} height={3} />
      </div>
      <div className={styles.qrSection}>
        <Image src={imagesSvg.randomQR} width={230} height={230} />
      </div>
      <p className={styles.label}>QR link</p>
      <div className={styles.linkBox}>
        <div className={styles.link}>
          <p>random-mail@gmail.com</p>
        </div>
        <Button
          className={styles.button}
          img={imagesSvg.copy}
          text="Copy"
          onClick={() => Notification('Link is copied to clipbord')}
        />
      </div>
    </div>
  );
}
