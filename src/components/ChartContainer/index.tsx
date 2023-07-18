import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { Prop } from '../../types/types';

import { MdOutlineFilterAlt } from 'react-icons/md';
import ChartTitle from '../ChartTitle';
import InfoIcon from '../InfoIcon';

const ChartContainer = ({
  showInfo,
  showFilter,
  showDetails,
  chartTitle,
  chartSubTitle,
  children,
  filter,
}: {
  showInfo: boolean;
  showFilter: boolean;
  showDetails: boolean;
  chartTitle: string;
  chartSubTitle: string;
  children: Prop;
  filter: Prop;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [width, setWidth] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [XPosition, setXPosition] = useState(0);
  const filterRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (filterRef.current) {
      setWidth(filterRef.current.getBoundingClientRect().width);
      setYPosition(filterRef.current.getBoundingClientRect().bottom);
      setXPosition(filterRef.current.getBoundingClientRect().right);
    }
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chartHeader}>
        <ChartTitle title={chartTitle} subtitle={chartSubTitle} />
        <div className={styles.rightContent}>
          {showInfo && (
            <InfoIcon
              title="Média de unidades vendidas por loja concorrente"
              placement="right"
            />
          )}
          {showFilter && (
            <div
              className={styles.filterIcon}
              onClick={toggleFilter}
              ref={filterRef}
            >
              <MdOutlineFilterAlt />
            </div>
          )}
          {showDetails && <p onClick={toggleModal}>Mais detalhes</p>}
        </div>
      </div>
      <div>{children}</div>

      <div
        style={
          isFilterOpen
            ? {
                display: 'block',
                position: 'absolute',
                top: yPosition - width / 2,
                right: XPosition,
              }
            : { display: 'none' }
        }
      >
        {filter}
      </div>
    </div>
  );
};

export default ChartContainer;
