import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import loginPills from '../../../assets/login/login-pills.png';
import logoInline from '../../../assets/logoInline.svg';
import styles from './style.module.scss';
import InputWithLabel from '../../../components/InputWithLabel/InputWithLabel';
import ButtonLogin from '../../../components/ButtonLogin/ButtonLogin';
import TitleSubtitleLogin from '../../../components/TitleSubtitleLogin/TitleSubtitleLogin';
import { useLocation } from 'react-router-dom';
import eyeShowPassword from '../../../assets/login/eyeShowPassword.svg';
import eyeHidePassword from '../../../assets/login/eyeHidePassword.svg';
import infoError from '../../../assets/login/infoError.svg';

const ResetPassword: React.FC = () => {
  /* const { token } = useParams<{ token: string }>(); */
  const urlParams = new URLSearchParams(useLocation().search);
  const token = urlParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordNotEmpty, setIsPasswordNotEmpty] = useState(false);
  const [isConfirmPasswordNotEmpty, setIsConfirmPasswordNotEmpty] =
    useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setConfirmPasswordError] = useState('');

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsPasswordNotEmpty(event.target.value.trim().length > 0);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
    setIsConfirmPasswordNotEmpty(event.target.value.trim().length > 0);
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleConfirmShowPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password) {
      setPasswordError('Senha é obrigatória');
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError('A confirmação da senha é obrigatória');
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('As senhas não correspondem');
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/auth/reset-password?token=${token}`,
        { password }
      );
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
          <img src={logoInline} alt="" className={styles.LogoResetPassword} />
          <form onSubmit={handleSubmit}>
            <div className={styles.titleSubtitle}>
              <TitleSubtitleLogin title="Nova senha" />
            </div>

            <div className={styles.inputTypePassword}>
              <div>
                <div className={styles.InputWithLabel}>
                  <InputWithLabel
                    title="Nova senha"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Insira aqui sua nova senha"
                    required
                  />
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
              </div>
            </div>
            {passwordError && (
              <div className={styles.errorMessage}>
                {' '}
                <img src={infoError} alt="" /> {passwordError}
              </div>
            )}

            <div className={styles.inputTypeConfirmPassword}>
              <div className={styles.InputWithLabel}>
                <InputWithLabel
                  title="Confirmar Senha"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirme sua nova senha"
                  required
                />
                {isConfirmPasswordNotEmpty && (
                  <div
                    className={styles.passwordToggle}
                    onClick={handleConfirmShowPassword}
                  >
                    <img
                      src={
                        showConfirmPassword ? eyeHidePassword : eyeShowPassword
                      }
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>
            {passwordConfirmError && (
              <div className={styles.errorMessage}>
                {' '}
                <img src={infoError} alt="" /> {passwordConfirmError}
              </div>
            )}
            <ButtonLogin type="submit" title="Entrar" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
