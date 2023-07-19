import styles from './styles.module.scss';

const ChartTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div>
      <h2 className={styles.chartTitle}>{title}</h2>
      <h3 className={styles.chartSubtitle}>{subtitle}</h3>
    </div>
  );
};

export default ChartTitle;
