import styles from './style.module.scss';
import ReactTooltip from 'react-tooltip';

const NotificationCard = (props: any) => {
  const { message } = props;
  const MAX_WORDS = 9; // Define o máximo de palavras a serem exibidas

  // Função para truncar a mensagem
  const truncateMessage = (message: any) => {
    const words = message.split(' ');
    if (words.length > MAX_WORDS) {
      return words.slice(0, MAX_WORDS).join(' ') + '...'; // Adiciona "..." no final da mensagem truncada
    }
    return message;
  };
  return (
    <div className={styles.cardNotification}>
      <p data-tip={message}>{truncateMessage(message)}</p>
    </div>
  )
};

export default NotificationCard;