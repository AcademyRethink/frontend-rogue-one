import { useState, useEffect } from 'react';
import styles from './style.module.scss';
import notification from '../../../assets/notificationMenu.svg';
import NotificationCard from './NotificationCard/NotificationCard';
import axios from 'axios';
import { Notification } from '../../../types/notificationsTypes';
import InfoIcon from '../../../components/InfoIcon';

const NotificationStatus = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/unresolved-notifications')
      .then((response) => {
        const updatedNotifications = response.data.map((notification: any) => ({
          ...notification,
        }));
        setNotifications(updatedNotifications);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.notificationHeader}>
        <div className={styles.notificationTitle}>
          <img src={notification} alt="Ícone de sino, indicando notificação" />
          <h3>Notificações</h3>
        </div>
        <InfoIcon
          title={
            'Alerta de produtos mais vendidos pelo mercado que atingiram a quantidade mínima em seu estoque.'
          }
          placement="leftTop"
        />
      </div>
      <div className={styles.containerNotificationsCards}>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.notification_id}
            notification_id={notification.notification_id}
            message={notification.message}
            viewed={notification.viewed}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationStatus;
