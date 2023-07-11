import React, { useState } from 'react';
import styles from './style.module.scss';
import notification from '../../assets/notifications.svg';
import NotificationStatus from './NotificationStatus/NotificationStatus';


const TopBar = (props: any) => {
  const { updateDate } = props;
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };




  return (
    <div className={styles.topBarContainer}>
      <div className={styles.leftMenu}>
        <h1>Visão Geral</h1>
        <h1 className={styles.topBarDivider}>|</h1>
        <p>Dados de mercado atualizados em: {updateDate}</p>
      </div>

      <button onClick={toggleModal}>
        <img src={notification} alt="Botão para exibir todas as notificações" />
      </button>
      {showModal && (
        <div className={styles.modalWrapper}>
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

