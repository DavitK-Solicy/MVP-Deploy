import { useState } from 'react';
import NotificationCard from 'components/shared/notificationCard';
import PageTitle from 'components/shared/pageTitle';
import { notificationsData, NotificationModel } from './type';

import styles from './notification.module.scss';

export default function Notification(): JSX.Element {
  const [notifications, setNotifications] = useState<Array<NotificationModel>>(
    notificationsData
  );

  const removeNotification = (id: string): void => {
    setNotifications(
      notifications.filter(
        (notification: NotificationModel) => notification.id !== id
      )
    );
  };

  return (
    <div className={styles.container}>
      <PageTitle title="Notifactions" />
      <div className={styles.notification}>
        {notifications.map((notification: NotificationModel) => (
          <NotificationCard
            title={notification.title}
            message={notification.message}
            cardType={notification.cardType}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
}
