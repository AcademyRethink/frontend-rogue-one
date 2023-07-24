import 'material-symbols/outlined.css';
import './styles.scss';

import CloseButton from '../CloseButton';
import ChartContainer from '../ChartContainer';
import { getLaboratories } from '../../services/report';

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartLaboratoriesModal = ({
  category,
  period,
  molecule,
  productName,
  onClose,
}: {
  category: string;
  period: string;
  molecule: string;
  productName: string;
  onClose: () => void;
}) => {
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const [sessionData, setSessionData] = useState(
    localStorage.getItem('session')
  );

  const [laboratoriesData, setLaboratoriesData] = useState();

  useEffect(() => {
    setSessionData(localStorage.getItem('session'));
  }, []);

  useEffect(() => {
    if (sessionData && period && molecule && category && productName && period)
      getLaboratories({
        limit: 4,
        cnpj: JSON.parse(sessionData).cnpj,
        molecule: molecule,
        product_name: productName,
        category: category,
        period: period,
      })
        .then((res) => setLaboratoriesData(res))
        .catch((error) => alert(error));
  }, [category, period, molecule, productName]);

  useEffect(() => {}, [laboratoriesData]);

  const data = {
    labels: ['A', 'B', 'C', 'D'],
    datasets: [
      {
        label: 'Venda mercado',
        data: [3, 6, 9, 12],
        backgroundColor: '#FF7043',
        borderColor: '#FF7043',
        borderWidth: 1,
      },
    ],
  };

  const options = {};

  return (
    <div className="laboratoriesModalBackground" onClick={handleModalClick}>
      <div className="laboratoriesModalContainer">
        <div className="laboratoriesModalHeader">
          <div className="laboratoriesModalHeaderContent">
            <div>
              <span className="material-symbols-outlined laboratoriesModalSymbol">
                pill
              </span>
            </div>
            {productName}
          </div>
          <CloseButton handleClose={onClose} />
        </div>
        <hr />
        <div className="laboratoriesModalcontent">
          <ChartContainer
            showInfo={false}
            showDetails={false}
            showFilter={false}
            chartTitle="Vendas"
            chartSubTitle="Por laboratório"
          >
            <Bar data={data} options={options}></Bar>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartLaboratoriesModal;
