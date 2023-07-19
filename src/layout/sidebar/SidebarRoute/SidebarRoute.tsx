import styles from './styles.module.scss';

const SidebarRoute = ({ icon, title, onClick, className, display }: any) => {
  return (
    <button
      className={`${styles.sidebarRoute} ${className || ''} `}
      onClick={onClick}
    >
      <span className={styles.line}></span>
      <img src={icon}></img>
      <span className={display ? styles.none : ''}>{title}</span>
    </button>
  );
};

export default SidebarRoute;
