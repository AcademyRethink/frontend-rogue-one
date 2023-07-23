//React related imports
import { useState, useEffect } from 'react';
import { LineWave as Loader } from 'react-loader-spinner';

//Chart.JS related imports
import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line as ChartType } from 'react-chartjs-2';

//Styling related imports
import theme from './styles.module.scss';

//Modal related imports
import { Box, Modal, Button } from '@mui/material';

//Services
import { fetchEvolutionGraph } from '../../../services/graphServices';

//aria-labels
import labels from './aria-labels.json';

//components
import ChartContainer from '../../ChartContainer';
import EvolutionFilter from '../../EvolutionFilter';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

import styles from './styles.module.scss';

const addColorConfig = (data: any) => {
  return {
    labels: data.labels,
    datasets: data.datasets.map(
      (dataset: { label: string; data: number[] }, index: number) => {
        return {
          ...dataset,
          borderColor: theme[`color_${index + 1}`],
          backgroundColor: theme[`color_${index + 1}`],
        };
      }
    ),
  };
};

type LineChartProps = {
  className: string;
};
export const EvolutionChart = ({
  // title,
  // subtitle,
  className,
}: LineChartProps): JSX.Element => {
  const [data, setData] = useState({ labels: [], datasets: [] } as ChartData<
    'line',
    number[],
    unknown
  >);

  const [modalData, setModalData] = useState({
    labels: [],
    datasets: [],
  } as ChartData<'line', number[], unknown>);

  const [productName, setProductName] = useState('');
  const [modalProductName, setModalProductName] = useState('');
  const [loading, setLoading] = useState(true);

  //Modal related states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (value: string) => {
    setProductName(value);
  };

  const handleModalChange = (value: string) => {
    setModalProductName(value);
  };

  useEffect(() => {
    fetchEvolutionGraph(productName)
      .then((json) => setData(addColorConfig(json)))
      .catch(console.error);
  }, [productName]);

  useEffect(() => {
    fetchEvolutionGraph(modalProductName) //modalProductName
      .then((json) => setModalData(addColorConfig(json)))
      .catch(console.error);
  }, [modalProductName]);

  useEffect(() => {
    if (data.datasets.length) setLoading(false);
  }, [data]);

  const options: ChartOptions<'line'> = {
    // responsive: true,
    plugins: {
      legend: {
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxHeight: 5,
          font: {
            family: theme.fontFamily,
            size: 12,
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          align: 'end',
          text: 'Unidades',
          display: true,
        },
        ticks: {
          font: {
            family: theme.fontFamily,
            size: 12,
          },
        },
        beginAtZero: true,
        grid: {
          borderColor: theme.gridLine,
          tickColor: 'white',
        },
      },
      x: {
        offset: true,
        ticks: {
          font: {
            family: theme.fontFamily,
            size: 12,
          },
        },
        grid: {
          borderColor: theme.gridLine,
          tickColor: 'white',
        },
      },
    },
  };

  const modalBoxId = 'evolution-chart-modal-box';

  return (
    <ChartContainer
      chartTitle="Evolução"
      chartSubTitle="Vendas e estoque"
      showFilter={true}
      key={1}
      filter={
        <EvolutionFilter
          onChangeProductName={handleChange}
          key={1}
          selectedProduct={productName}
          parentId=""
        />
      }
      showInfo={false}
      showDetails={true}
      onClickDetails={handleOpen}
    >
      {loading ? (
        <Loader
          height="100"
          width="100"
          wrapperClass={`${styles.LineChartContainer} ${className}`}
          color={theme.color_2}
          ariaLabel="Carregando"
        />
      ) : (
        <ChartType
          options={options}
          data={data}
          aria-label="Grafico de evolução das vendas e do estoque"
        />
      )}
      <Button title="Relatorio PCP" onClick={() => console.log('Teste')} />

      <Modal open={open} onClose={handleClose} aria-label={labels.Chart}>
        <Box
          id={modalBoxId}
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Button variant="contained" onClick={() => console.log('Teste')}>
            Relatório PCP
          </Button>
          <EvolutionFilter
            onChangeProductName={handleModalChange}
            key={1}
            selectedProduct={modalProductName}
            parentId={modalBoxId}
          />
          <ChartType
            options={options}
            data={modalData}
            aria-label={labels.Chart}
          />
          <p>{modalProductName || 'Vazio'}</p>
        </Box>
      </Modal>
    </ChartContainer>
  );
};

export default EvolutionChart;
