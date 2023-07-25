import style from './style.module.scss';

interface SuccessMessageProps {
  onClose: () => void;
}
const SuccessMessage:React.FC<SuccessMessageProps> = ({onClose}) => {
  return (
    <div className={style.successMessageContainer}>
      <div>
        <h1>Senha redefinida com sucesso!</h1>
      </div>
      <button onClick={onClose}>Ok</button>
    </div>
  );
};

export default SuccessMessage;
