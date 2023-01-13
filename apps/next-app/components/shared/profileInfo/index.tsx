import Image from 'components/shared/image';
import { imagesSvg } from 'utils/constants/imagesSrc';
import { ProfileInfoProps } from './types';

import styles from './profileInfo.module.scss';

export default function ProfileInfo({
  username,
  email,
}: ProfileInfoProps): JSX.Element {
  return (
    <div className={styles.container}>
      <Image width={85} height={85} src={imagesSvg.profilePhoto} />
      <div>
        <h1 className={styles.userName}>{username}</h1>
        <p>{email}</p>
      </div>
    </div>
  );
}
