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

import { NavLink, Navigate } from 'react-router-dom';
import MyProfile from '../../view/myProfile/MyProfile';

const Sidebar = (open: any) => {
  const [opened, setOpened] = useState(open);
  const [display, setDisplay] = useState(false);

  const handleClosingSidebar = () => {
    setOpened(!opened);
    setDisplay(!display);
  };

  const logOut = () => {
    //fazer logica de logOut
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
          <img className={styles.black} src={closeButton}></img>
        ) : (
          <img src={openButton}></img>
        )}
      </button>
      <div className={styles.sidebarTitles}>
        <img className={display ? styles.logo : ''} src={logo}></img>
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
          <img src={sair}></img>
          <span className={styles.buttonText}>Sair da conta</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
