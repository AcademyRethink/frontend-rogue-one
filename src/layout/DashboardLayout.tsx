import { Outlet } from 'react-router-dom';
import TopBar from './TopBar/TopBar';
import Sidebar from './sidebar/Sidebar';
import style from './style.module.scss';
import { useEffect, useState } from 'react';
import { getLastDate } from '../services/report';
import dayjs from 'dayjs';
import NotificationModal from '../components/NotificationModal';


const DashboardLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [lastUpdateDate, setLastUpdateDate] = useState<string>('');

  const sessionData = localStorage.getItem('session');
  const token = sessionData ? JSON.parse(sessionData).token : '';
  const cnpj = sessionData ? JSON.parse(sessionData).cnpj : '';

  useEffect(() => {
    if (token) setIsLoggedIn(true);
  }, [token]);

  useEffect(() => {
    if (cnpj)
      getLastDate(cnpj).then((res) =>
        setLastUpdateDate(dayjs(res).format('DD/MM/YYYY'))
      );
  }, [cnpj]);
  return (
    <div className={style.dashboardLayoutContainer}>
      {location.pathname !== '/' && isLoggedIn ? (
        <>
          <header className={style.dashboardLayoutTopBar}>
            <TopBar updateDate={lastUpdateDate} />
          </header>
          <aside className={style.dashboardLayoutSideBar}>
            <Sidebar />
          </aside>
          <main className={style.dashboardContent}>
            <Outlet />
              <NotificationModal/>
          </main>

          
        </>
      ) : null}
    </div>
  );
};

export default DashboardLayout;
