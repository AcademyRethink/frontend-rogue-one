import { useState, ChangeEvent } from 'react';

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import pharmaceuticalWoman from '../../../assets/login/pharmaceutical-woman.webp';
import eyeShowPassword from '../../../assets/login/eyeShowPassword.svg';
import eyeHidePassword from '../../../assets/login/eyeHidePassword.svg';
import infoError from '../../../assets/login/infoError.svg';
import logoInline from '../../../assets/logoInline.svg';
import InputWithLabel from '../../../components/InputWithLabel';
import ButtonLogin from '../../../components/ButtonLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordNotEmpty, setIsPasswordNotEmpty] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsPasswordNotEmpty(event.target.value.trim().length > 0);
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setEmailError('Email é obrigatório');
      return;
    }

    if (!password) {
      setPasswordError('Senha é obrigatória');
      return;
    }

    axios
      .post('http://farma-view-393823.rj.r.appspot.com/auth/login', { email, password })
      .then((response) => {
        const token = response.data.token;

        localStorage.setItem('session', JSON.stringify(response.data));
        // Navegar para a rota "/dashboard" após o login bem-sucedido
        if (token) {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          console.error(errorMessage);
          if (
            errorMessage ===
            'Assinatura suspensa por inadimplência. A plataforma será liberada após o pagamento.'
          ) {
            setPasswordError(errorMessage);
          } else {
            setPasswordError('Dados incorretos');
          }
        } else {
          setPasswordError('Erro desconhecido');
        }
      });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftLogin}>
        <img
          src={pharmaceuticalWoman}
          alt="Mulher farmacêutica, segurando um tablet e sorrindo, ao fundo prateleiras de remédios."
        />
      </div>
      <div className={styles.rightLogin}>
        <div className={styles.formLogin}>
          <img src={logoInline} alt="Logomarca Farma View" />
          <h2>
            Boas vindas!
            <br />
            Entre com seus dados.
          </h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.InputWithLabel}>
              <InputWithLabel
                title="Email:"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Insira aqui seu email"
                autoComplete="email"
              />
            </div>
            {emailError && (
              <div className={styles.errorMessage}>
                {' '}
                <img src={infoError} alt="Imagem indicando erro" /> {emailError}
              </div>
            )}
            <div className={styles.inputTypePasswordIfError}>
              <div className={styles.inputTypePassword}>
                <div className={styles.InputWithLabel}>
                  <InputWithLabel
                    title="Senha:"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Insira aqui sua senha"
                    autoComplete="current-password"
                  />
                </div>
                {isPasswordNotEmpty && (
                  <div
                    className={styles.passwordToggle}
                    onClick={handleShowPassword}
                  >
                    <img
                      src={showPassword ? eyeHidePassword : eyeShowPassword}
                      alt="Ícone de olho, indicando ação de esconder/mostrar senha"
                    />
                  </div>
                )}
              </div>
              {passwordError && (
                <div className={styles.errorMessage}>
                  {' '}
                  <img src={infoError} alt="Imagem indicando erro" />{' '}
                  {passwordError}
                </div>
              )}
            </div>
            <div className={styles.linkLogin}>
              <Link to="/forgot-password" className={styles.linkText}>
                Esqueci minha senha
              </Link>
            </div>
            <ButtonLogin
              type="submit"
              title="Entrar"
              disabled={!email || !password}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
