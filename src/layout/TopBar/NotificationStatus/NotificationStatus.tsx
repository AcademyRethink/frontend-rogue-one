import { useState, useEffect } from 'react';
import styles from './style.module.scss';
import notification from '../../../assets/notificationMenu.svg';
import info from '../../../assets/infoButton.svg';
import NotificationCard from './NotificationCard/NotificationCard';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import { Notification } from '../../../types/notificationsTypes';

const NotificationStatus = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/unresolved-notifications')
      .then((response) => setNotifications(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className={styles.modalContainer}>
      <div className={styles.notificationHeader}>
        <div className={styles.notificationTitle}>
          <img src={notification} alt="" />
          <h2>Notificações</h2>
        </div>

        <button>
          <img src={info} alt="Informações sobre as notificações" />
        </button>
      </div>
      <div className={styles.containerNotificationsCards}>
        {notifications.map((notification) => (
          <NotificationCard
            notification_id={notification.notification_id}
            message={notification.message}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationStatus;
