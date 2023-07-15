import { Link, useNavigate } from 'react-router-dom';

const WarningSendPassword = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <>
      <button type="button" onClick={handleBackClick}>
        Voltar
      </button>
      <div>
        <h1>Redefinição de senha</h1>
        <p>Será enviado para o seu e-mail um link para redefinir sua senha.</p>
        <Link to="/">Voltar para a tela de login</Link>
      </div>
    </>
  );
};

export default WarningSendPassword;
