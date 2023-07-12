import styles from './styles.module.scss';
import { MdKeyboardArrowDown } from 'react-icons/md';
import 'material-symbols/outlined.css';

import { SelectData } from '../../types/types';
import { useState } from 'react';

const Select = ({
  Icon,
  symbol,
  symbolClass,
  defaultValue,
  selectName,
  selectId,
  data,
}: {
  Icon?: React.ElementType;
  symbol?: string;
  symbolClass?: string;
  defaultValue: string;
  selectName: string;
  selectId: string;
  data: SelectData[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const optionsHandler = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <div>
      <div className={styles.selectContainer} onClick={optionsHandler}>
        {Icon && <Icon className={styles.frontIcon} />}
        {symbol && (
          <span className={`${symbolClass} ${styles.frontSymbol}`}>
            {symbol}
          </span>
        )}
        <select name={selectName} id={selectId} defaultValue={defaultValue}>
          {data?.map((el) => {
            return (
              <option key={el.value} value={el.value}>
                {el.description}
              </option>
            );
          })}
        </select>
        <span>{data[0].description}</span>

        <MdKeyboardArrowDown className={styles.dropDownArrow} />
      </div>
      <div className={`${styles.selectItems} ${!isOpen ? styles.none : ''}`}>
        <ul>
          {data?.map((el) => {
            return (
              <>
                <li
                  key={el.value}
                  value={el.value}
                  className={styles.unorderedListItem}
                  onClick={() => {
                    setSelectedValue(el.value);
                    optionsHandler();
                  }}
                >
                  {el.description}
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const Date = ({
  Icon,
  selectName,
  selectId,
}: {
  Icon?: React.ElementType;
  defaultValue: string;
  selectName: string;
  selectId: string;
}) => {
  return (
    <div className={styles.selectContainer}>
      {Icon && <Icon className={styles.frontIcon} />}
      <input type="month" name={selectName} id={selectId} />
      <MdKeyboardArrowDown className={styles.dropDownArrow} />
    </div>
  );
};

export { Select, Date };
