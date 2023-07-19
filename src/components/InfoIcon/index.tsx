import { MdInfoOutline } from 'react-icons/md';
import { Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/es/tooltip';
import styles from './styles.module.scss';
const InfoIcon = ({
  title,
  placement,
}: {
  title: string;
  placement: TooltipPlacement;
}) => {
  return (
    <div className={styles.infoIcon}>
      <Tooltip title={title} color="black" placement={placement}>
        <MdInfoOutline />
      </Tooltip>
    </div>
  );
};

export default InfoIcon;
