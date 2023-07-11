import styles from './style.module.scss';
import notification from '../../assets/notifications.svg';


const TopBar = (props: any) => {
  const { updateDate } = props;
  return (
    <div className={styles.topBarContainer}>
      <div className={styles.leftMenu}>
        <h1>Visão Geral</h1>
        <h1 className={styles.topBarDivider}>|</h1>
        <p>Dados de mercado atualizados em: {updateDate}</p>
      </div>

      <button>
        <img src={notification} alt="Botão para exibir todas as notificações" />
      </button>
    </div>
  );
};

export default TopBar;

