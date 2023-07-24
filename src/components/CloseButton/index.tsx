import { MouseEventHandler } from 'react'
import styles from './styles.module.scss'
import { MdOutlineClose } from "react-icons/md";

const CloseButton = ({handleClose}: {handleClose: MouseEventHandler<HTMLButtonElement>}) => {
  return (
    <div className={styles.buttonCloseContainer}>
      <button className={styles.buttonClose} onClick={handleClose}>
        <MdOutlineClose />
      </button>
    </div>
  )
}

export default CloseButton