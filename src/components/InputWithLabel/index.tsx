import styles from './style.module.scss';
import { InputWithLabelProps } from '../../types/loginTypes';
const InputWithLabel: React.FC<InputWithLabelProps>  = (props) => {
    const {title, type, value, onChange, placeholder, onFocus, onBlur, autoComplete} = props
  return (
    <div className={styles.InputWithLabel}>
      <label>{title}</label><br/>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} onFocus={onFocus} onBlur={onBlur} autoComplete={autoComplete} />
    </div>
  );
};

export default InputWithLabel;
