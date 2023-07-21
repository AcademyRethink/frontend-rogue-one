import style from './style.module.scss';
import dividerMyProfile from '../../../assets/dividerMyProfile.svg';
import { MyProfileData } from '../../../types/myProfileTypes';
const LineTable = (props: MyProfileData) => {
  const { title, value } = props;
  return (
    <div className={style.lineContainer}>
      <div className={style.lineInformation}>
        <div className={style.titleContainer}>
          <h2 className={style.title}>{title}</h2>
        </div>
        <div className={style.valueContainer}>
          <h4 className={style.value}>{value}</h4>
        </div>
      </div>
      <img src={dividerMyProfile} alt="" />
    </div>
  );
};

export default LineTable;
