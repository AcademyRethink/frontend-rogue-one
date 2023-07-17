import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";
import style from './styles.module.scss'
import info from '../../assets/info.svg'

const socket = socketIOClient('http://localhost:8080');

const NotificationModal = () => {
  const [message, setMessage] = useState('');
  const [notificationId, setnotificationId] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    socket.on('productNotification', (data: any) => {
      console.log('Evento productNotification recebido:', data);
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
      console.log('Coluna "viewed" atualizada com sucesso');
    }catch (error) {
      console.error('Erro ao atualizar a coluna "viewed":', error);
    }
  };

  const updateNotificationViewed = async (notificationId: any) => {
    try {
      await axios.patch(`http://localhost:8080/notifications/${notificationId}/viewed`);
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
            <div className={style.notificationHeader}><img src={info} alt="" /><h3>Alerta</h3></div>
            
            <p>{/* {message} */}“Dipirona sódica Gotas 500mg 20ml x 1ml Neo Química”, produto que está entre os mais vendidos no mercado de acordo com a ultima atualização, atingiu a quantidade mínima pré estabelecida em seu estoque.</p>
            <div className={style.buttonContainer}>
            <button onClick={handleClose}>Ok</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationModal;
