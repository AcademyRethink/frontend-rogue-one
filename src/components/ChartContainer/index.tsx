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
  className,
  showInfo,
  showFilter,
  showDetails,
  chartTitle,
  chartSubTitle,
  children,
  filter,
  onClickDetails,
  infoText,
  positionRelative,
}: {
  className?: string;
  showInfo: boolean;
  showFilter: boolean;
  showDetails: boolean;
  chartTitle: string;
  chartSubTitle: string;
  children: Prop;
  filter?: Prop;
  onClickDetails?: () => void;
  infoText?: string;
  positionRelative?: boolean;
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(event.target as Node) &&
        filterRef.current &&
        !filterRef.current.contains(event.target as Node) &&
        !isDropdownClicked(event.target!)
      ) {
        setIsFilterOpen(false);
      }
    };

    const isDropdownClicked = (target: EventTarget): boolean => {
      if (target instanceof HTMLElement) {
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

  return (
    <div
      className={`${styles.chartContainer} ${className ? className : ''}`}
      ref={chartContainerRef}
      style={positionRelative ? { position: 'relative' } : undefined}
    >
      <div className={styles.chartHeader}>
        <ChartTitle title={chartTitle} subtitle={chartSubTitle} />
        <div className={styles.rightContent}>
          {showInfo && <InfoIcon title={infoText ?? ''} placement="right" />}
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
            <button className={styles.showMore} onClick={onClickDetails}>
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
            ? positionRelative
              ? {
                  display: 'block',
                  position: 'absolute',
                  top: filterDimensions?.yPosition + filterDimensions?.height,
                  right: filterDimensions.width * 3,
                  zIndex: 20,
                }
              : {
                  display: 'block',
                  position: 'absolute',
                  top: filterDimensions?.yPosition + filterDimensions?.height,
                  zIndex: 20,
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
