/* import { useEffect, useState } from 'react';
import axios from '../../axios.config'; */
import React from 'react';

import style from './style.module.scss';

import BestSellerChart from '../../components/BestSellerChart';
import EvolutionChart from '../../components/EvolutionChart';
import BestSalesBarChart from '../../components/BestSalesBarChart';

const Dashboard = () => {
  return (
    <div className={style.dashboardLayout}>
      <div className={style.graph1}>
        <BestSellerChart />
      </div>
      <div className={style.graph2}>
        <EvolutionChart />
      </div>
      <div className={style.graph3}>
        <BestSalesBarChart></BestSalesBarChart>
      </div>
    </div>
  );
};

export default React.memo(Dashboard);
