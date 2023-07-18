import { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import pharmaceuticalWoman from '../../../assets/login/pharmaceutical-woman.png';
import eyeShowPassword from '../../../assets/login/eyeShowPassword.svg';
import eyeHidePassword from '../../../assets/login/eyeHidePassword.svg';
import infoError from '../../../assets/login/infoError.svg';
import logoInline from '../../../assets/logoInline.svg';
import InputWithLabel from '../../../components/InputWithLabel/InputWithLabel';
import ButtonLogin from '../../../components/ButtonLogin/ButtonLogin';

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
      .post('http://localhost:8080/auth/login', { email, password })
      .then((response) => {
        console.log('Bem-vindo');
        // Armazenar o token no localStorage ou em algum estado global, como o Redux, para uso posterior
        const token = response.data.token;

        localStorage.setItem('token', token);
        // Navegar para a rota "/dashboard" após o login bem-sucedido
        navigate('/dashboard');
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          console.log(errorMessage);
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
        <img src={pharmaceuticalWoman} alt="" />
      </div>
      <div className={styles.rightLogin}>
        <div className={styles.formLogin}>
          <img src={logoInline} alt="" />
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
              />
            </div>
            {emailError && (
              <div className={styles.errorMessage}>
                {' '}
                <img src={infoError} alt="" /> {emailError}
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
                  />
                </div>
                {isPasswordNotEmpty && (
                  <div
                    className={styles.passwordToggle}
                    onClick={handleShowPassword}
                  >
                    <img
                      src={showPassword ? eyeHidePassword : eyeShowPassword}
                      alt=""
                    />
                  </div>
                )}
              </div>
              {passwordError && (
                <div className={styles.errorMessage}>
                  {' '}
                  <img src={infoError} alt="" /> {passwordError}
                </div>
              )}
            </div>
            <div className={styles.linkLogin}>
              <Link to="/forgot-password" className={styles.linkText}>
                Esqueci minha senha
              </Link>
            </div>
            <ButtonLogin type="submit" title="Entrar" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
