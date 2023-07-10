import React, { useState,  ChangeEvent, FormEvent  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    axios
      .post('http://localhost:8080/auth/login', { email, password })
      .then((response) => {
        console.log('bem vindo')
      })
      .catch((error) => {
        console.log('dados incorretos')
      });
  };
  const handleForgotPassword = () => {
    setForgotPassword(true); // Altere o estado para exibir o formulário de recuperação de senha
  };

 if (forgotPassword) {
  return <ForgotPassword /> // Renderize o componente ForgotPassword se o estado forgotPassword for true
  } 

  return (
    <div>
      <h1>Logotipo</h1>
      <h2>Boas vindas,<br/>Entre com seus dados!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br/>
          <input type="email" value={email} onChange={handleEmailChange} placeholder='Insira aqui seu email'/>
        </div>
        <div>
          <label>Senha:</label><br/>
          <input type="password" value={password} onChange={handlePasswordChange} placeholder='Insira aqui sua senha'/>
        </div>
        <button type="submit">Entrar</button>
      </form>
      <a href="#" onClick={handleForgotPassword}>Esqueci minha senha</a>
    </div>
  );
};

export default Login;


