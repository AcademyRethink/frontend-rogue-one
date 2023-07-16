import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import pharmaceuticalWoman from '../../../assets/login/pharmaceutical-woman.png';
import eyeShowPassword from '../../../assets/login/eyeShowPassword.svg';
import eyeHidePassword from '../../../assets/login/eyeHidePassword.svg';
import logoInline from '../../../assets/logoInline.svg';
import InputWithLabel from '../../../components/InputWithLabel/InputWithLabel';
import ButtonLogin from '../../../components/ButtonLogin/ButtonLogin';

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
  };

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
        console.log('esse é o token:', token);
        localStorage.setItem('token', token);
        // Navegar para a rota "/dashboard" após o login bem-sucedido
        navigate('/dashboard');
      })
      .catch((error) => {
        console.log('dados incorretos');
      });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftLogin}>
        <img src={pharmaceuticalWoman} alt="" />
      </div>
      <div className={styles.rightLogin}>
        <div className={styles.formLogin}>
          <img src={logoInline} alt="" />
          <h2>
            Boas vindas,
            <br />
            Entre com seus dados!
          </h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.InputWithLabel}>
              <InputWithLabel
                title="Email:"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Insira aqui seu email"
                required
              />
            </div>
            <div className={styles.InputWithLabel}>
              <InputWithLabel
                title="Senha:"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                onFocus={handleShowPasswordButton}
                onBlur={handleHidePasswordButton}
                placeholder="Insira aqui sua senha"
                required
              />
              <div className={styles.passwordToggle} onClick={handleShowPassword}>
            {showPassword ? <img src={eyeShowPassword} alt="" /> : <img src={eyeHidePassword} alt="" />}
          </div>
              <div className={styles.linkLogin}>
              <Link to="/forgot-password" className={styles.linkText}>Esqueci minha senha</Link>
              </div>
              
            </div>
            <ButtonLogin type="submit" title="Entrar" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
