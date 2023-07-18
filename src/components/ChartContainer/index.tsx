import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  infoText,
}: {
  showInfo: boolean;
  showFilter: boolean;
  showDetails: boolean;
  chartTitle: string;
  chartSubTitle: string;
  children: Prop;
  filter: Prop;
  infoText: string;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [containerWidth, setContainerWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [XPosition, setXPosition] = useState(0);
  const filterRef = useRef<HTMLInputElement>(null);
  const filterContainerRef = useRef<HTMLInputElement>(null);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener('resize', updateDimension);

    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [screenSize]);

  useEffect(() => {
    if (filterRef.current) {
      setHeight(filterRef.current.offsetHeight);
      setYPosition(filterRef.current.offsetTop);
      setXPosition(filterRef.current.offsetLeft);
    }
  }, []);

  useLayoutEffect(() => {
    if (filterContainerRef.current) {
      setContainerWidth(filterContainerRef.current.offsetWidth);
    }
  }, [isFilterOpen]);

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
          {showInfo && <InfoIcon title={infoText} placement="right" />}
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
            ? XPosition + containerWidth < screenSize.width
              ? {
                  display: 'block',
                  position: 'absolute',
                  top: yPosition + height,
                  left: XPosition,
                }
              : {
                  display: 'block',
                  position: 'absolute',
                  top: yPosition + height,
                }
            : { display: 'none' }
        }
        ref={filterContainerRef}
      >
        {filter}
      </div>
    </div>
  );
};

export default ChartContainer;
