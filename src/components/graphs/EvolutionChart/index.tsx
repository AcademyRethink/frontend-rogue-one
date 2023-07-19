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
import { Box, Button, Modal } from '@mui/material';

//Services
import { fetchEvolutionGraph } from '../../../services/graphServices';

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
  // title: string;
  // subtitle: string;
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setProductName(event.currentTarget.value);

  const handleModalChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setModalProductName(event.currentTarget.value);

  useEffect(() => {
    fetchEvolutionGraph(productName)
      .then((json) => setData(addColorConfig(json)))
      .catch(console.error);
  }, [productName]);

  useEffect(() => {
    fetchEvolutionGraph(modalProductName)
      .then((json) => setModalData(addColorConfig(json)))
      .catch(console.error);
  }, [modalProductName]);

  useEffect(() => {
    if (data.datasets.length) setLoading(false);
  }, [data]);

  const axisWidth = 2.175;

  const options: ChartOptions<'line'> = {
    responsive: true,
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
          borderWidth: axisWidth,
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
          borderWidth: axisWidth,
          borderColor: theme.gridLine,
          tickColor: 'white',
        },
      },
    },
  };

  return (
    <div className={`${styles.LineChartContainer} ${className}`}>
      {loading ? (
        <Loader
          height="100"
          width="100"
          wrapperClass={`${styles.LineChartContainer} ${className}`}
          color={theme.color_2}
          ariaLabel="Carregando"
        />
      ) : (
        <ChartType options={options} data={data} />
      )}

      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <ChartType options={options} data={modalData} />
          ,
          <input
            type="text"
            value={modalProductName}
            onChange={handleModalChange}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default EvolutionChart;
