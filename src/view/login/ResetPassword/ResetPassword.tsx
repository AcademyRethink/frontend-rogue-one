import  { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import loginPills from '../../../assets/login/login-pills.png';
import logoInline from '../../../assets/logoInline.svg';
import styles from './style.module.scss';
import InputWithLabel from '../../../components/InputWithLabel/InputWithLabel';
import ButtonLogin from '../../../components/ButtonLogin/ButtonLogin';
import TitleSubtitleLogin from '../../../components/TitleSubtitleLogin/TitleSubtitleLogin';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


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


  return (
    <div className={styles.resetPasswordContainer}>
 <div className={styles.leftResetPassword}>
        <img src={loginPills} alt="" />
      </div>
      <div className={styles.rightResetPassword}>
        <div className={styles.formResetPassword}>
          <img src={logoInline} alt="" />
          <form onSubmit={handleSubmit}>
            <div className={styles.titleSubtitle}>
            <TitleSubtitleLogin title="Nova senha"/>
            </div>
            
            <div className={styles.InputWithLabel}>
              <InputWithLabel
                title="Nova senha"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Insira aqui sua nova senha"
                required
              />
            </div>
            <div className={styles.InputWithLabel}>
            <InputWithLabel
                title="Confirmar Senha"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirme sua nova senha"
                required
              />
             
              
            </div>
            <ButtonLogin type="submit" title="Entrar" />
          </form>
        </div>
      </div>

      {/* <h1>Redefinir Senha</h1>
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
 */}
    </div>
  );
};

export default ResetPassword;
