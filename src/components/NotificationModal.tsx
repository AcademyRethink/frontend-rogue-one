import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import axios from "axios";

const socket = socketIOClient('http://localhost:3050');

const NotificationModal = () => {
  const [message, setMessage] = useState('');
  const [notificationId, setnotificationId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

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
      await axios.patch(`http://localhost:3050/notifications/${notificationId}/viewed`);
    } catch (error) {
      console.error('Erro ao atualizar a coluna "viewed":', error);
      throw error;
    }
  };
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Alerta</h3>
            <p>{message}</p>
            <button onClick={handleClose}>Ok</button>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationModal;
