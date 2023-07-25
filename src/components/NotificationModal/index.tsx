import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import style from './styles.module.scss';
import alert from '../../assets/alert.svg';
import closeIcon from '../../assets/close.svg';
import InfoIcon from '../InfoIcon';

const socket = socketIOClient('https://farma-view-393823.rj.r.appspot.com');

const NotificationModal = () => {
  const [message, setMessage] = useState('');
  const [notificationId, setnotificationId] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    socket.on('productNotification', (data: any) => {
      setMessage(data.message);
      setnotificationId(data.notification_id);
      setIsOpen(true);
    });

    return () => {
      socket.off('productNotification');
    };
  }, []);

  const handleClose = async () => {
    setIsOpen(false);
    // Enviar solicitação para atualizar a coluna "viewed" no backend

    try {
      await updateNotificationViewed(notificationId);
    } catch (error) {
      console.error('Erro ao atualizar a coluna "viewed":', error);
    }
  };

  const updateNotificationViewed = async (notificationId: any) => {
    try {
      await axios.patch(
        `https://farma-view-393823.rj.r.appspot.com/notifications/${notificationId}/viewed`
      );
    } catch (error) {
      console.error('Erro ao atualizar a coluna "viewed":', error);
      throw error;
    }
  };
  return (
    <>
      {isOpen && (
        <div className={style.modalContainer}>
          <div className={style.modalContent}>
            <div className={style.buttonCloseContainer}>
              <button className={style.buttonClose} onClick={handleClose}>
                <img
                  src={closeIcon}
                  alt="Ícone de X, possui ação de fechar a janela"
                />
              </button>
            </div>
            <div className={style.headerWithMessage}>
              <div className={style.notificationHeader}>
                <img
                  src={alert}
                  alt="ícone para exibição de mais informações sobre as notificações"
                />
                <h3>Alerta</h3>
                <div className={style.InfoIconContainer}>
                  <InfoIcon
                    title="A quantidade mínima foi estabelecida no sistema padrão da sua farmácia."
                    placement="leftTop"
                  />
                </div>
              </div>

              <p>
                {message}
                {/* “Dipirona sódica Gotas 500mg 20ml x 1ml Neo
                Química”, produto que está entre os mais vendidos no mercado de
                acordo com a ultima atualização, atingiu a quantidade mínima pré
                estabelecida em seu estoque. */}
              </p>
            </div>

            <div className={style.buttonContainer}>
              <button className={style.buttonOk} onClick={handleClose}>
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationModal;
