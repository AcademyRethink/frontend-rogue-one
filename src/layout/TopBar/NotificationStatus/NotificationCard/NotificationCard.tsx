import styles from './style.module.scss';

const NotificationCard = (props: any) => {
  const { message } = props;
  const MAX_WORDS = 9;


  const truncateMessage = (message: any) => {
    const words = message.split(' ');
    if (words.length > MAX_WORDS) {
      return words.slice(0, MAX_WORDS).join(' ') + '...'; //
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