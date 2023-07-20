import styles from './styles.module.scss';
import theme from './styles.module.scss';
import getSalesChartData from '../../services/chartService';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
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
      ticks: {
        font: {
          family: theme.fontFamily,
          weight: '700',
          size: 14,
          lineHeight: 'normal',
        },
        color: '#424242',
      },

      beginAtZero: true,
      grid: {
        tickColor: 'white',
      },

      border: {
        width: 3,
        color: '#9E9E9E',
      },
    },
    x: {
      offset: true,
      border: {
        width: 3,
        color: '#9E9E9E',
      },

      ticks: {
        font: {
          family: theme.fontFamily,
          weight: '500',
          size: 13,
          lineHeight: 'normal',
        },
        color: '#424242',
      },
      grid: {
        display: false,
      },
    },
  },
};

const info = {
  labels: [
    'Dipirona',
    'Colecalciferol',
    'DORZOLAMIDA',
    'PIOGLITAZONA',
    'GLICLAZIDA',
    'BETAMETASONA',
    'SODIO BICARBONATO',
  ],
  datasets: [
    {
      label: 'Vendas Mercado',
      data: [31, 9, 42, 40, 15, 22, 70],
    },
    {
      label: 'Minhas vendas',
      data: [10, 100, 35, 71, 69, 103, 23],
    },
  ],
};

const labels = info.labels;

export const data = {
  labels,
  datasets: [
    {
      label: info.datasets[0].label,
      data: info.datasets[0].data,
      backgroundColor: '#FF7043',
    },
    {
      label: info.datasets[1].label,
      data: info.datasets[1].data,
      backgroundColor: '#26C6DA',
    },
  ],
};

const BarChart = () => {
  return (
    <div className={styles.barChart}>
      <Bar
        aria-label="Gráfico de maiores vendas"
        options={options}
        data={data}
      />
    </div>
  );
};

export default BarChart;
