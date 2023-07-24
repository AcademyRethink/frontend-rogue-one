import LineTable from './LineTable';
import style from './style.module.scss';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import ResetPasswordMyProfile from './ResetPasswordMyProfile';
import ModalMyProfile from './ModalMyProfile';
import { UserData } from '../../types/myProfileTypes';

const MyProfile = () => {
  const [profileData, setProfileData] = useState<UserData>({} as UserData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const sessionData = localStorage.getItem('session');
    if (sessionData) {
      const userData = JSON.parse(sessionData);
      const formattedBirthDate = format(
        new Date(userData.birth_date),
        'dd/MM/yyyy'
      );

      setProfileData({
        ...userData,
        birth_date: formattedBirthDate,
      });
    } else {
      setProfileData({
        name: '',
        cnpj: '',
        birth_date: '',
        country: '',
        account_type: '',
        email: '',
      });
    }
  }, []);

  const openModalResetPassword = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={style.myProfileContainer}>
      <div className={style.tableContainer}>
        <LineTable title="Nome" value={profileData.name} />
        <LineTable title="CNPJ" value={profileData.cnpj} />
        <LineTable title="Data de nascimento" value={profileData.birth_date} />
        <LineTable title="País ou região" value={profileData.country} />
        <LineTable title="Tipo de conta" value={profileData.account_type} />
        <LineTable title="E-mail" value={profileData.email} />
      </div>
      <div className={style.buttonResetPasswordContainer}>
        <button
          className={style.buttonResetPassword}
          onClick={openModalResetPassword}
        >
          Redefinir senha
        </button>
        <ModalMyProfile isOpen={isModalOpen} onClose={closeModal}>
          <ResetPasswordMyProfile />
        </ModalMyProfile>
      </div>
    </div>
  );
};

export default MyProfile;
