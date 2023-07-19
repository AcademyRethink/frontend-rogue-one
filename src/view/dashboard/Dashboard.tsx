import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyProfile from '../myProfile/MyProfile';



const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Função para buscar os dados da área de trabalho no backend
    const fetchDashboardData = async () => {
      try {
        const session = localStorage.getItem('session');
        const {token} = JSON.parse(session || '')
        if (session) {
          const response = await axios.get('http://localhost:8080/dashboard', {
            headers: {
              Authorization: `Bearer ${token}`, // Adicione o token no cabeçalho da requisição
            },
          });
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar dados da área de trabalho:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <MyProfile/>
        </div>
      ) : (
        <div>
          <h1>Acesso não autorizado</h1>
          <p>Você não tem permissão para acessar esta página. Faça o login para continuar.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
