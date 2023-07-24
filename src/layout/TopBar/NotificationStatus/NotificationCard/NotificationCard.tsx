import styles from './style.module.scss';
import { Notification } from '../../../../types/notificationsTypes';
import axios from '../../../../axios.config';
import { useEffect, useState } from 'react';

const NotificationCard = ({
  message,
  notification_id,
  viewed,
}: Notification) => {
  const [localViewed, setLocalViewed] = useState<boolean>(viewed);

  useEffect(() => {
    setLocalViewed(viewed);
  }, [viewed]);

  const handleCardClick = async () => {
    if (!viewed) {
      try {
        await updateNotificationViewed(notification_id);

        setLocalViewed(true);
      } catch (error) {
        console.error('Erro ao atualizar a coluna "viewed":', error);
      }
    }
  };

  const updateNotificationViewed = async (notificationId: any) => {
    try {
      await axios.patch(
        `http://localhost:8080/notifications/${notificationId}/viewed`
      );
    } catch (error) {
      console.error('Erro ao atualizar a coluna "viewed":', error);
      throw error;
    }
  };

  return (
    <div className={styles.cardNotification} onClick={handleCardClick}>
      {!localViewed ? <div className={styles.cardViewed}></div> : null}
      <p>{message}</p>
    </div>
  );
};

export default NotificationCard;
