import styles from './style.module.scss';
import { TitleSubtitleProps } from '../../types/loginTypes';
const TitleSubtitleLogin: React.FC<TitleSubtitleProps> = (props) => {
  const { title, subtitle } = props;
  return (
    <div className={styles.titleSubtitleContainer}>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );
};

export default TitleSubtitleLogin;
