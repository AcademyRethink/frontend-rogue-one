import style from './style.module.scss';
import { ModalMyProfileProps } from '../../../types/myProfileTypes';
import CloseButton from '../../../components/CloseButton';

const ModalMyProfile = ({ isOpen, onClose, children }: ModalMyProfileProps) => {
  if (!isOpen) return null;

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={style.modalBackground} onClick={handleModalClick}>
      <div className={style.modalContainer}>
        <div className={style.closeButtonContainer}>
          <CloseButton handleClose={onClose} />
        </div>
        <div className={style.formContainer}>{children}</div>
      </div>
    </div>
  );
};

export default ModalMyProfile;
