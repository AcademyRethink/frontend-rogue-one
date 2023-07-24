import { MdInfoOutline } from 'react-icons/md';
import { Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import styles from './styles.module.scss';
import { useState } from 'react';
const InfoIcon = ({
  title,
  placement,
}: {
  title: string;
  placement: TooltipPlacement;
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
   
      <button className={styles.infoIcon} onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
      onFocus={() => setIsTooltipVisible(true)}
      onBlur={() => setIsTooltipVisible(false)}
     >
      <Tooltip title={isTooltipVisible ? title : ''} color="black" placement={placement}>
        <MdInfoOutline />
      </Tooltip>
      </button>
   
  );
};

export default InfoIcon;
