import TitleSubtitleLogin from '../../../components/TitleSubtitleLogin/TitleSubtitleLogin';
import styles from './style.module.scss';
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
      <div className={styles.leftWarningSendPassword}  aria-label="Imagem de remédios, pílulas e ampolas"></div>

      <div className={styles.rightWarningSendPassword}>
        <div className={styles.formWarningSendPassword}>
          <button
            type="button"
            onClick={handleBackClick}
            className={styles.backLogin}
          >
            <img src={backLogin} alt="Seta para esquerda, indicando a ação de voltar a página anterior" />
          </button>
          <div className={styles.formWarningSendMasterPassword}>
            <img className={styles.logoInline} src={logoInline} alt="Logomarca Farma View" />
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
              <Link to="/" className={styles.linkText}>
                Voltar para a tela de login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
