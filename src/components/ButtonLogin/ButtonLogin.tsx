import styles from './style.module.scss';
import { ButtonLoginProps } from '../../types/loginTypes';

const ButtonLogin: React.FC<ButtonLoginProps> = (props) => {
  const { type, disabled, title } = props;
  return (
    <button className={styles.buttonContainer} type={type} disabled={disabled}>
      {title}
    </button>
  );
};

export default ButtonLogin;
