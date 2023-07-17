import LineTable from './LineTable/LineTable';
import style from './style.module.scss'

import { useState } from 'react';

const MyProfile = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const profileData = {
    name: 'Luana Lima de Oliveira',
    cnpj: '000000000-00',
    birthDate: '20/02/1985',
    country: 'Brasil',
    typeAccount: 'admin',
    email: 'luana@luana.com',
    password: 'asdasa', // Senha em asteriscos inicialmente
  };

  const handlePasswordToggle = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className={style.myProfileContainer}>
      <div className={style.tableContainer}>
      <LineTable title="Nome" value={profileData.name}/>
      <LineTable title="CNPJ" value={profileData.cnpj}/>
      <LineTable title="Data de nascimento" value={profileData.birthDate}/>
      <LineTable title="País ou região" value={profileData.country}/>
      <LineTable title="Tipo de conta" value={profileData.typeAccount}/>
      <LineTable title="E-mail" value={profileData.email}/>
      <LineTable title="Senha" value={profileData.password}/>
      </div>
      <button>Redefinir senha</button>
    </div>
  );
};

export default MyProfile;
