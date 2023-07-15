import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8080/auth/forgot-password', { email });
      console.log('Email de recuperação de senha enviado com sucesso!');
      navigate('/warning-send-password');
    } catch (error) {
      console.log('Erro ao enviar email de recuperação de senha:', error);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div>
      <button type="button" onClick={handleBackClick}>
          voltar
      </button>
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
        <button type="submit" disabled={!email}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;