import Icon from 'components/shared/icon';
import { PercentType } from '../dashboardOverview/type';
import { OverviewCardProps } from './type';

import styles from './overviewCard.module.scss';

export default function OverviewCard({
  imgSrc,
  title,
  total,
  percent,
  type,
}: OverviewCardProps): JSX.Element {
  return (
    <div className={styles.container}>
      <Icon width={38} height={38} src={imgSrc} />
      <p className={styles.title}>{title}</p>
      <div className={styles.total}>
        <p className={styles.totalPrice}>{total}</p>
        {type === PercentType.PROMOTION ? (
          <p className={styles.promotionPercent}>⬆ ${percent}%</p>
        ) : (
          <p className={styles.downgradePercent}>⬇ ${percent}%</p>
        )}
      </div>
    </div>
  );
}
