import { useState, useEffect } from 'react';
import { LineWave as Loader } from 'react-loader-spinner';

import { fetchEvolutionGraph } from '../../../services/graphServices';

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

import theme from './styles.module.scss';

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
export const LineChart = ({
  // title,
  // subtitle,
  className,
}: LineChartProps): JSX.Element => {
  const [data, setData] = useState({ labels: [], datasets: [] } as ChartData<
    'line',
    number[],
    unknown
  >);
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setProductName(event.currentTarget.value);

  useEffect(() => {
    fetchEvolutionGraph(productName)
      .then((json) => setData(addColorConfig(json)))
      .catch(console.error);
  }, [productName]);

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
        },
      },
    },
  };

  const graph = (
    <ChartType options={options} data={data} />
  );

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
        graph
      )}
    </div>
  );
};

export default LineChart;
