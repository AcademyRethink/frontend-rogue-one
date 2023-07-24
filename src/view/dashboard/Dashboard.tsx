import React from 'react';

import style from './style.module.scss';

import BestSellerChart from '../../components/BestSellerChart';
import EvolutionChart from '../../components/EvolutionChart';
import BestSalesBarChart from '../../components/BestSalesBarChart/BestSalesBarChart';

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
      {/* <ChartLaboratoriesModal
        category="MIP_MARCA"
        period="2023-03-01"
        molecule="DIPIRONA SODICA"
        productName="DIPIRONA SODICA MG GOTAS 500MG 20ML x 1 /ML"
        onClose={() => {}}
      /> */}
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
