import style from './style.module.scss';
const SuccessMessage = () => {
  return (
    <div className={style.successMessageContainer}>
      <div>
        <h1>Senha redefinida com sucesso!</h1>
      </div>
      <button>Ok</button>
    </div>
  );
};

export default SuccessMessage;
