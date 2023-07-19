import style from './style.module.scss';
import { ModalMyProfileProps } from '../../../types/myProfileTypes';

const ModalMyProfile = ({ isOpen, onClose, children }: ModalMyProfileProps) => {
  if (!isOpen) return null;

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={style.modalBackground} onClick={handleModalClick}>
      <div className={style.modalContainer}>{children}</div>
    </div>
  );
};

export default ModalMyProfile;
