import { Outlet } from 'react-router-dom';
import TopBar from './TopBar/TopBar';
import Sidebar from './sidebar/Sidebar';
import style from './style.module.scss';
import { useEffect, useState } from 'react';

const DashboardLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const sessionData = localStorage.getItem('session');
  const token = sessionData ? JSON.parse(sessionData).token : '';

  useEffect(() => {
    if (token) setIsLoggedIn(true);
  }, [token]);
  return (
    <div className={style.dashboardLayoutContainer}>
      {location.pathname !== '/' && isLoggedIn ? (
        <>
          <header className={style.dashboardLayoutTopBar}>
            <TopBar updateDate="20/07/2023" />
          </header>
          <aside className={style.dashboardLayoutSideBar}>
            <Sidebar />
          </aside>
          <main className={style.dashboardContent}>
            <Outlet />
          </main>
        </>
      ) : null}
    </div>
  );
};

export default DashboardLayout;
