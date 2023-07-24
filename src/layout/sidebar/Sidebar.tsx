import insert_chart from '../../assets/insert_chart.svg';
import logo from '../../assets/logo.svg';
import sair from '../../assets/sair.svg';
import closeButton from '../../assets/closeButton.svg';
import openButton from '../../assets/openButton.svg';

import pessoa from '../../assets/pessoa.svg';
import report from '../../assets/report.svg';
import { useState } from 'react';
import SidebarRoute from './SidebarRoute/SidebarRoute';
import styles from './styles.module.scss';

import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = (open: any) => {
  const [opened, setOpened] = useState(open);
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  const handleClosingSidebar = () => {
    setOpened(!opened);
    setDisplay(!display);
  };

  const logOut = () => {
    localStorage.removeItem('session'); 
    navigate('/');
  };
  return (
    <div
      className={`${opened ? styles.opened : styles.closed} ${styles.sidebar} `}
    >
      <button
        className={`${styles.sidebarOpenButton} ${
          opened ? '' : styles.gapAtClosedSidebar
        }`}
        onClick={handleClosingSidebar}
      >
        {opened ? (
          <img className={styles.black} src={closeButton} alt="Seta para esquerda, com função de recolher o menu lateral" ></img>
        ) : (
          <img src={openButton} alt="Seta para direita, com função de expandir o menu lateral"></img>
        )}
      </button>
      <div className={styles.sidebarTitles}>
        <img className={display ? styles.logo : ''} src={logo} alt="Logo Farma View"></img>
      </div>
      <hr className={opened ? styles.sufix : styles.sufixClosed}></hr>
      <div className={styles.sidebarRoutes}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? styles.activeRoute : styles.inactiveRoute
          }
        >
          <SidebarRoute
            title="Visão geral"
            icon={insert_chart}
            display={display}
          
          />
        </NavLink>
        <NavLink
          to="/report"
          className={({ isActive }) =>
            isActive ? styles.activeRoute : styles.inactiveRoute
          }
        >
          <SidebarRoute title="Relatório PCP" icon={report} display={display} />
        </NavLink>
        <NavLink
          to="/my-profile"
          className={({ isActive }) =>
            isActive ? styles.activeRoute : styles.inactiveRoute
          }
        >
          <SidebarRoute title="Meu perfil" icon={pessoa} display={display} />
        </NavLink>
      </div>
      <div
        className={`${styles.sidebarButtonDiv} ${
          opened ? styles.logoutButtonOpened : styles.logoutButtonClosed
        }`}
      >
        <button
          className={`${styles.sidebarButton} ${styles.logoutButton} ${styles.sidebarButtonText}`}
          onClick={logOut}
        >
          <img src={sair}  alt="Botão de sair do Dashboard"></img>
          <span className={styles.buttonText}>Sair da conta</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
