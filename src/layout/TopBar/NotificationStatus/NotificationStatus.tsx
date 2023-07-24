import { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';
import notification from '../../../assets/notificationMenu.svg';
import info from '../../../assets/infoButton.svg';
import NotificationCard from './NotificationCard/NotificationCard';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';
import { Notification } from '../../../types/notificationsTypes';

const NotificationStatus = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    axios
      .get('http://localhost:8080/unresolved-notifications')
      .then((response) => {
        const updatedNotifications = response.data.map((notification: any) => ({
          ...notification,
        }));
        // console.log(updatedNotifications)
        setNotifications(updatedNotifications);
      })
      .catch((error) => console.error(error));

    if (buttonRef.current) {
      tippy(buttonRef.current, {
        content: 'Alerta de produtos mais<br> vendidos pelo mercado que<br> atingiram a quantidade<br> mínima em seu estoque',
        allowHTML: true,
        placement: 'right-start',
      });
    }
  }, []);

  return (
    <div className={styles.modalContainer}>
      <div className={styles.notificationHeader}>
        <div className={styles.notificationTitle}>
          <img src={notification} alt="Ícone de sino, indicando notificação" />
          <h3>Notificações</h3>
        </div>

        <button ref={buttonRef}>
          <img src={info} alt="Informações sobre as notificações" />
        </button>
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