import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { Prop } from '../../types/types';

import { MdOutlineFilterAlt } from 'react-icons/md';
import ChartTitle from '../ChartTitle';
import InfoIcon from '../InfoIcon';

type Dimensions = {
  width: number;
  height: number;
  xPosition: number;
  yPosition: number;
};
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

  const [containerXPosition, setContainerXPosition] = useState(0);
  const chartContainerRef = useRef<HTMLInputElement>(null);
  const filterContainerRef = useRef<HTMLDivElement>(null);

  const [filterDimensions, setFilterDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
    xPosition: 0,
    yPosition: 0,
  });
  const filterRef = useRef<HTMLButtonElement>(null);

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
      setFilterDimensions({
        width: filterRef.current.offsetWidth,
        height: filterRef.current.offsetHeight,
        xPosition: filterRef.current.offsetLeft,
        yPosition: filterRef.current.offsetTop,
      });
    }
  }, []);

  useEffect(() => {
    if (chartContainerRef.current) {
      setContainerXPosition(chartContainerRef.current.offsetLeft);
    }
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(event.target as Node) &&
        chartContainerRef.current &&
        !chartContainerRef.current.contains(event.target as Node) &&
        !isDropdownClicked(event.target!)
      ) {
        setIsFilterOpen(false);
      }
    };

    const isDropdownClicked = (target: EventTarget): boolean => {
      if (target instanceof HTMLElement) {
        console.log(target.classList);
        return (
          target.classList.value.includes('ant-picker') ||
          target.classList.value.includes('ant-select')
        );
      }
      return false;
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <div className={styles.chartContainer} ref={chartContainerRef}>
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
            <button
              className={styles.filterIcon}
              onClick={toggleFilter}
              ref={filterRef}
            >
              <MdOutlineFilterAlt />
            </button>
          )}
          {showDetails && (
            <button className={styles.showMore} onClick={toggleModal}>
              Mais detalhes
            </button>
          )}
        </div>
      </div>
      <div>{children}</div>
      <div
        ref={filterContainerRef}
        style={
          isFilterOpen
            ? containerXPosition > screenSize.width / 2
              ? {
                  display: 'block',
                  position: 'absolute',
                  top:
                    filterDimensions?.yPosition + filterDimensions?.height - 12,
                  right: filterDimensions.width,
                }
              : {
                  display: 'block',
                  position: 'absolute',
                  top:
                    filterDimensions?.yPosition + filterDimensions?.height - 12,
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
