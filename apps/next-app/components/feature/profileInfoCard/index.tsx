import Icon from 'components/shared/icon';
import { imagesSvg } from 'utils/constants/imagesSrc';
import { InfoCardProps, ProfileInfoData } from './types';

import styles from './infoCard.module.scss';

export default function InfoCard({ iconSrc, title, data }: InfoCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.cardTitleSection}>
        <Icon width={28} height={28} src={iconSrc} />
        <span>{title}</span>
      </div>
      {data.map(
        (d: ProfileInfoData): JSX.Element => (
          <div className={styles.cardLine}>
            <span>{d.dataTitle}</span>
            <div className={styles.inputSection}>
              <span>{d.dataInfo}</span>
              {!d.isStrong ? (
                <Icon
                  width={19}
                  height={19}
                  src={
                    d.isHidden ? imagesSvg.hiddenIcon : imagesSvg.successIcon
                  }
                />
              ) : (
                <span className={styles.passwordSection}>Strong</span>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
