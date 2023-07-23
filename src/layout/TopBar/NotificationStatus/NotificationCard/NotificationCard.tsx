import styles from './style.module.scss';
import { Notification } from '../../../../types/notificationsTypes';

const NotificationCard = ({ message }: Notification) => {
  
  return (
    <div className={styles.cardNotification}>
      <p>{message}</p>
    </div>
  );
};

export default NotificationCard;
