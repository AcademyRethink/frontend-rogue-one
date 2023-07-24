import { useEffect, useState } from 'react';
import axios from '../../axios.config';
import BarChart from '../../components/SalesChart/SalesChart';
import React from 'react';

import style from './style.module.scss';

import BestSellerChart from '../../components/BestSellerChart';
import EvolutionChart from '../../components/graphs/EvolutionChart';
const Dashboard = () => {
  /*  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result = await axios.get(
          'http://localhost:8080/dashboard/categories',
          {
            params: {
              cnpj: '00111222000133',
            },
          }
        );
        console.log(result);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }; */
  /*    fetchDashboardData(); */
  /*  }, []);
  console.log('render');
  Check if userData is available and user is logged in
  if (isLoading) {
    return <div>Loading...</div>;
  } else { */
  return (
    <div className={style.dashboardLayout}>
      {/* <ChartLaboratoriesModal /> */}
      <div className={style.graph1}>
        <BestSellerChart />
      </div>
      <div className={style.graph2}>Gráfico 2</div>
      <div className={style.graph3}>
        <BarChart></BarChart>
      </div>
    </div>
  );
};

/*   );
  } 
};*/

export default React.memo(Dashboard);
