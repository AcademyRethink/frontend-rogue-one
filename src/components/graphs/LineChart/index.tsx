// import { ChartData, ScatterDataPoint } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import colors from '../../../utils/base.module.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = () => {
  const opacity = 'B3';

  const mockData: ChartData<'line', number[], unknown> = {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'Sales',
        data: [10, 15, 20],
        borderColor: colors.first,
        backgroundColor: colors.first + opacity,
      },
      {
        label: 'Sales Competitors',
        data: [12, 14, 0],
        borderColor: colors.second,
        backgroundColor: colors.second + opacity,
      },
      {
        label: 'Inventory',
        data: [30, 12, 27],
        borderColor: colors.third,
        backgroundColor: colors.third + opacity,
      },
    ],
  };

  const options: ChartOptions = {};

  return (
    <div className='LineChart'>
      <Line options={options} data={mockData} />
    </div>
  );
};
