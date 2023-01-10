import Button from 'components/shared/button';
import OverviewCard from 'components/shared/overviewCard';
import { imagesSvg } from 'utils/constants/imagesSrc';
import { dashboardOverview } from 'utils/constants/fakeData';
import { OverviewCardProps } from 'components/shared/overviewCard/type';

import styles from './dashboardOverview.module.scss';

export default function DashboardOverview(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>Overview</p>
        <Button
          className={styles.button}
          width={12}
          height={12}
          text="Edit"
          img={imagesSvg.edit}
        />
      </div>
      <div className={styles.cards}>
        {dashboardOverview.map((card: OverviewCardProps) => (
          <OverviewCard
            key={card.percent}
            title={card.title}
            total={card.total}
            percent={card.percent}
            type={card.type}
            imgSrc={card.imgSrc}
          />
        ))}
      </div>
    </div>
  );
}
