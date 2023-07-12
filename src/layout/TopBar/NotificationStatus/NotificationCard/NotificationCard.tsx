import { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import { Notification } from '../../../../types/notificationsTypes';

const NotificationCard = ({ message }: Notification) => {
  const MAX_WORDS = 9; // Define o máximo de palavras a serem exibidas
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (paragraphRef.current) {
      tippy(paragraphRef.current, {
        content: message,
        placement: 'top',
        arrow: true,
       
      });
    }
  }, [message]);

  // Função para truncar a mensagem
  const truncateMessage = (message: string) => {
    const words = message.split(' ');
    if (words.length > MAX_WORDS) {
      return words.slice(0, MAX_WORDS).join(' ') + '...';
    }
    return message;
  };

  return (
    <div className={styles.cardNotification}>
      <p ref={paragraphRef}>{truncateMessage(message)}</p>
    </div>
  );
};

export default NotificationCard;
