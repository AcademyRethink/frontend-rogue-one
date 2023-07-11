import styles from './style.module.scss';
import notification from '../../../assets/notificationMenu.svg';
import info from '../../../assets/infoButton.svg';
import NotificationCard from './NotificationCard/NotificationCard';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
const NotificationStatus = () => {
  const notifications = [
    { id: 1, message: ' DIPIRONA SODICA MG GOTAS 500MG 20ML x 1 /ML, produto que está entre os mais vendidos no mercado de acordo com a ultima atualização, atingiu a quantidade mínima pré estabelecida em seu estoque.' },
    { id: 2, message: 'Mensagem 2' },
    { id: 3, message: 'Mensagem 3' },
 
  ];
  return (
    <div className={styles.modalContainer}>
      <div className={styles.notificationHeader}>
        <div className={styles.notificationTitle}>
          <img src={notification} alt="" />
          <h2>Notificações</h2>
        </div>

        <button>
          <img src={info} alt="" />
        </button>
      </div>
      <div className={styles.containerNotificationsCards}>
       {/*  teste barra de rolagem */}
       {notifications.map(notification => (
          <NotificationCard key={notification.id} message={notification.message} />
        ))}
      </div>
      
    </div>
  );
};

export default NotificationStatus;
