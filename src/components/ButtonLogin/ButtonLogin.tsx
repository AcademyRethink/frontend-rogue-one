import styles from './style.module.scss';


const ButtonLogin = (props: any) => {
    const{type, disabled, title} = props
  return (
    <button className={ styles.buttonContainer}type={type} disabled={disabled}>{title}</button>
  )
}

export default ButtonLogin