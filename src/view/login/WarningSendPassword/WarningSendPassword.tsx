import TitleSubtitleLogin from '../../../components/TitleSubtitleLogin/TitleSubtitleLogin';
import styles from './style.module.scss';
import loginPills from '../../../assets/login/login-pills.png';
import backLogin from '../../../assets/login/backLogin.svg';
import logoInline from '../../../assets/logoInline.svg';
import { Link, useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.warningSendPasswordContainer}>
      <div className={styles.leftWarningSendPassword}>
        <img src={loginPills} alt="" />
      </div>

      <div className={styles.rightWarningSendPassword}>
        <div className={styles.formWarningSendPassword}>
          <button
            type="button"
            onClick={handleBackClick}
            className={styles.backLogin}
          >
            <img src={backLogin} alt="" />
          </button>
          <div className={styles.formWarningSendMasterPassword}>
          <img className={styles.logoInline} src={logoInline} alt="" />
          <TitleSubtitleLogin
            title="Redefinição de senha"
            subtitle={
              <>
                Será enviado para o seu e-mail um<br></br> link para redefinir
                sua senha.
              </>
            }
          />

           <div className={styles.linkLogin}>
              <Link to="/" className={styles.linkText}>Voltar para a tela de login</Link>
              </div>
              </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
