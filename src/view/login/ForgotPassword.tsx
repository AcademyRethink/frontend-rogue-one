import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8080/auth/forgot-password', { email });
      console.log('Email de recuperação de senha enviado com sucesso!');
    } catch (error) {
      console.log('Erro ao enviar email de recuperação de senha:', error);
    }
  };

  return (
    <div>
      <h1>Recuperação de Senha</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Insira aqui seu email"
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ForgotPassword;