import InputWithLabel from '../../../components/InputWithLabel/InputWithLabel';
import TitleSubtitleLogin from '../../../components/TitleSubtitleLogin/TitleSubtitleLogin';
import infoError from '../../../assets/login/infoError.svg';
import style from './style.module.scss';
import axios from '../../../axios.config';
import { useState, useEffect, ChangeEvent } from 'react';
import ModalMyProfile from '../ModalMyProfile/ModalMyProfile';
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import eyeShowPassword from '../../../assets/login/eyeShowPassword.svg';
import eyeHidePassword from '../../../assets/login/eyeHidePassword.svg';

const ResetPasswordMyProfile = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showCurrentPassword, setCurrentShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCurrentPasswordNotEmpty, setIsCurrentPasswordNotEmpty] = useState(false);
  const [isNewPasswordNotEmpty, setIsNewPasswordNotEmpty] = useState(false);
  const [isConfirmNewPasswordNotEmpty, setIsConfirmNewPasswordNotEmpty] = useState(false);

  const handleShowCurrentPassword = () => {
    setCurrentShowPassword((prevState) => !prevState);
  };
  const handleShowNewPassword = () => {
    setShowNewPassword((prevState) => !prevState);
  };

   const handleShowConfirmNewPassword = () => {
    setShowConfirmNewPassword((prevState) => !prevState);
  };


  useEffect(() => {
    // Recuperar os dados do usuário do localStorage
    const sessionData = localStorage.getItem('session');

    if (sessionData) {
      const { email } = JSON.parse(sessionData);
      setEmail(email);
    } 
  }, []);
  const handleCurrentPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(event.target.value);
    setIsCurrentPasswordNotEmpty(event.target.value.trim().length > 0);
  };
  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
    setIsNewPasswordNotEmpty(event.target.value.trim().length > 0);
  };
  const handleConfirmNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(event.target.value);
    setIsConfirmNewPasswordNotEmpty(event.target.value.trim().length > 0);
  };
  const handleResetPassword = async () => {
    if (!currentPassword) {
      setCurrentPasswordError('Senha atual é obrigatória');
      return;
    }
    if (!newPassword) {
      setNewPasswordError('Nova senha é obrigatória');
      return;
    }
    if (!confirmNewPassword) {
      setConfirmNewPasswordError('Confirmar senha é obrigatório');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError('As senhas não correspondem');
      return;
    }

    axios
      .post('http://localhost:8080/reset-password-logged', {
        currentPassword,
        newPassword,
        email,
      })
      .then(() => {
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error('Erro ao redefinir a senha:', error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message === 'Senha atual incorreta'
        ) {
          setCurrentPasswordError(
            'Senha atual incorreta. Por favor, verifique sua senha e tente novamente.'
          );
        } else {
          setCurrentPasswordError(
            'Ocorreu um erro ao redefinir a senha. Por favor, tente novamente.'
          );
        }
      });
  };
  return (
    <div className={style.resetPasswordMyProfileContainer}>
      <TitleSubtitleLogin title="Redefinição de senha" />
        <div className={style.inputWithLabel}>
          <InputWithLabel
            title="Senha atual"
            type={showCurrentPassword ? 'text' : 'password'}
            placeholder="Insira aqui a sua senha atual"
            value={currentPassword}
            onChange={handleCurrentPasswordChange}
          />
          {isCurrentPasswordNotEmpty && (
            <div className={style.passwordToggle} onClick={handleShowCurrentPassword}>
              <img
                src={showCurrentPassword ? eyeHidePassword : eyeShowPassword}
                alt=""
              />
            </div>
          )}
        </div>
          {currentPasswordError && (
            <div className={style.errorMessage}>
              {' '}
              <img src={infoError} alt="" /> {currentPasswordError}
            </div>
          )}
     
      <div className={style.inputWithLabel}>
        <InputWithLabel
          title="Nova senha"
          type={showNewPassword ? 'text' : 'password'}
          placeholder="Insira aqui a sua nova senha"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        {isNewPasswordNotEmpty && (
            <div className={style.passwordToggle} onClick={handleShowNewPassword}>
              <img
                src={showNewPassword ? eyeHidePassword : eyeShowPassword}
                alt=""
              />
            </div>
          )}
      </div>
        {newPasswordError && (
          <div className={style.errorMessage}>
            {' '}
            <img src={infoError} alt="" /> {newPasswordError}
          </div>
        )}
      <div className={style.inputWithLabel}>
        <InputWithLabel
          title="Confirmar nova senha"
          type={showConfirmNewPassword ? 'text' : 'password'}
          placeholder="Insira aqui a sua nova senha"
          value={confirmNewPassword}
          onChange={handleConfirmNewPasswordChange}
        />
        {isConfirmNewPasswordNotEmpty && (
            <div className={style.passwordToggle} onClick={handleShowConfirmNewPassword}>
              <img
                src={showConfirmNewPassword ? eyeHidePassword : eyeShowPassword}
                alt=""
              />
            </div>
          )}
      </div>
        {confirmNewPasswordError && (
          <div className={style.errorMessage}>
            {' '}
            <img src={infoError} alt="" /> {confirmNewPasswordError}
          </div>
        )}

      <button
        className={style.resetPasswordMyProfileButton}
        onClick={handleResetPassword}
      >
        Redefinir senha
      </button>
      {isModalOpen && (
        <ModalMyProfile
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <SuccessMessage />
        </ModalMyProfile>
      )}
    </div>
  );
};

export default ResetPasswordMyProfile;
