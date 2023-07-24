import styles from './styles.module.scss';
import { Prop } from '../../types/types';

const FilterContainer = ({
  children,
  backgroundColor,
}: {
  children: Prop;
  backgroundColor?: string;
}) => {
  return (
    <div
      className={styles.FiltersContainer}
      style={backgroundColor ? {backgroundColor} : {}}
    >
      {children}
    </div>
  );
};

export default FilterContainer;
