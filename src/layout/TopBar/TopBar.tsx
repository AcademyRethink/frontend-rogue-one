import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import notification from '../../assets/notifications.svg';
import NotificationStatus from './NotificationStatus/NotificationStatus';
import { TopBarProps } from '../../types/notificationsTypes';
import dividerTopBar from '../../assets/dividerTopBar.svg';

const TopBar = (props: TopBarProps) => {
  const { updateDate } = props;
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.topBarContainer}>
      <div className={styles.leftMenu}>
        <h1>Visão geral</h1>
        <img
          src={dividerTopBar}
          alt="Linha horizontal, com função de ser um divisor de conteúdo"
        />
        <p>Dados de mercado atualizados em: {updateDate}</p>
      </div>

      <button onClick={toggleModal}>
        <img
          src={notification}
          alt="Ícone de sino, função de exibir todas as notificações"
        />
      </button>
      {showModal && (
        <div className={styles.modalWrapper} ref={modalRef}>
          <div className={styles.modalOverlay} onClick={toggleModal} />
          <div className={styles.modalContent}>
            <NotificationStatus />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
