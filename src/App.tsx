/* import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:3050');

interface Notification {
  ean: string;
  message: string;
}


const App: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3050'); 
        console.log(response.data); 
      } catch (error) {
        console.error('Erro ao obter os produtos:', error);
      }
    };

    fetchData();

    socket.on('productNotification', (data: Notification) => {
      console.log('Notificação recebida:', data);
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    return () => {
      socket.off('productNotification');
    };
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Notificações:</h2>
      {notifications.map((notification, index) => (
        <div key={index}>
          <p>EAN: {notification.ean}</p>
          <p>Mensagem: {notification.message}</p>
        </div>
      ))}
    </div>
  );
};

export default App; */
import  { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3050";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("productNotification", data => {
      setResponse(data);
      console.log(data)
    });
  }, []);

  return (
    <p>
      its <time dateTime={response}>{response}</time>
    </p>
  );
}

export default App;