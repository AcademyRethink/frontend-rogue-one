import { useState,  ChangeEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import pharmaceuticalWoman from '../../../assets/login/pharmaceutical-woman.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordButton, setShowPasswordButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleShowPasswordButton = () => {
    setShowPasswordButton(true);
  };
  const handleHidePasswordButton = () => {
    setShowPasswordButton(false);
  }

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    axios
    .post('http://localhost:8080/auth/login', { email, password })
    .then((response) => {
      console.log('Bem-vindo');
      // Armazenar o token no localStorage ou em algum estado global, como o Redux, para uso posterior
      const token = response.data.token;
      console.log('esse é o token:',token)
      localStorage.setItem('token', token);
      // Navegar para a rota "/dashboard" após o login bem-sucedido
      navigate('/dashboard');
    })
      .catch((error) => {
        console.log('dados incorretos')
      });
  };
 
  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftLogin}><img src={pharmaceuticalWoman} alt="" /></div>
      <div className={styles.rightLogin}>
        <div className={styles.formLogin}> <h1>Logotipo</h1>
      <h2>Boas vindas,<br/>Entre com seus dados!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br/>
          <input type="email" value={email} onChange={handleEmailChange} placeholder='Insira aqui seu email' required/>
        </div>
        <div>
          <label>Senha:</label>
          <br />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            onFocus={handleShowPasswordButton}
            onBlur={handleHidePasswordButton}
            placeholder="Insira aqui sua senha"
            required
          />
          {showPasswordButton && (
            <button type="button" onClick={handleShowPassword}>
              {showPassword ? '🙈 Ocultar' : '👁️ Mostrar'}
            </button>
          )}
          </div>
        <button type="submit">Entrar</button>
      </form>
      <Link to="/forgot-password">Esqueci minha senha</Link></div></div>
       
      
    </div>
  );
};

export default Login;


