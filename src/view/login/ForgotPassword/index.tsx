import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TitleSubtitleLogin from '../../../components/TitleSubtitleLogin';
import styles from './style.module.scss';
import backLogin from '../../../assets/login/backLogin.svg';
import InputWithLabel from '../../../components/InputWithLabel';
import ButtonLogin from '../../../components/ButtonLogin';
import logoInline from '../../../assets/logoInline.svg';
import infoError from '../../../assets/login/infoError.svg';
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setEmailError('Email é obrigatório');
      return;
    }
    try {
      await axios.post('http://localhost:8080/auth/forgot-password', { email });
      navigate('/warning-send-password');
    } catch (error) {
      console.error('Erro ao enviar email de recuperação de senha:', error);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <div
        className={styles.leftForgotPassword}
        aria-label="Imagem de remédios, pílulas e ampolas"
      ></div>

      <div className={styles.rightForgotPassword}>
        <div className={styles.formForgotPassword}>
          <button
            type="button"
            onClick={handleBackClick}
            className={styles.backLogin}
          >
            <img
              src={backLogin}
              alt="Seta para esquerda, indicando a ação de voltar a página anterior"
            />
          </button>
          <div className={styles.formForgotMasterPassword}>
            <img
              className={styles.logoInline}
              src={logoInline}
              alt="Logomarca Farma View"
            />
            <TitleSubtitleLogin
              title="Redefinição de senha"
              subtitle={
                <>
                  Insira seu e-mail no campo abaixo
                  <br />
                  para redefinir sua senha.
                </>
              }
            />
            <form onSubmit={handleSubmit}>
              <div>
                <div className={styles.InputWithLabel}>
                  <InputWithLabel
                    title="Seu e-mail:"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Insira aqui seu email"
                    required={true}
                  />
                </div>
                {emailError && (
                  <div className={styles.errorMessage}>
                    <img src={infoError} alt="Imagem indicando erro" />{' '}
                    {emailError}
                  </div>
                )}
              </div>
              <ButtonLogin type="submit" title="Enviar" disabled={!email} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
