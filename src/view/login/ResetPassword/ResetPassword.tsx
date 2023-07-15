import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.log('As senhas não correspondem');
      return;
    }

    try {
      await axios.post('http://localhost:8080/auth/reset-password', { password });
      console.log('Senha enviada com sucesso!');
    } catch (error) {
      console.log('Erro ao enviar senha:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/forgot-password');
  };

  return (
    <div>
      <h1>Redefinir Senha</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nova Senha:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Insira aqui sua nova senha"
          />
        </div>
        <div>
          <label>Confirmar Senha:</label>
          <br />
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirme sua nova senha"
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
      <button onClick={handleGoBack}>Voltar</button>
    </div>
  );
};

export default ResetPassword;
