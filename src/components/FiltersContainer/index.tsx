import styles from './styles.module.scss';
import { Prop } from '../../types/types';

const FilterContainer = ({ children }: { children: Prop }) => {
  return (
    <div className={styles.FiltersContainer}>
      {children}
    </div>
  );
};

export default FilterContainer;
