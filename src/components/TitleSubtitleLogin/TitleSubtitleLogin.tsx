import styles from './style.module.scss';
const TitleSubtitleLogin = (props: any) => {
  const { title, subtitle } = props;
  return (
    <div className={styles.titleSubtitleContainer}>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );
};

export default TitleSubtitleLogin;
