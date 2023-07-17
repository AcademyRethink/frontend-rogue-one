import style from './style.module.scss';
import dividerMyProfile from '../../../assets/dividerMyProfile.svg';

const LineTable = (props: any) => {
  const { title, value } = props;
  return (
    <div className={style.lineContainer}>
      <div className={style.lineInformation}>
        <h2 className={style.title}>{title}</h2>
        <h4 className={style.value}>{value}</h4>
      </div>
      <img src={dividerMyProfile} alt="" />
    </div>
  );
};

export default LineTable;
