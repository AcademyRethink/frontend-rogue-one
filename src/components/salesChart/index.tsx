import { useEffect, useState, ChangeEvent } from 'react';
import type { ChartData, ChartOptions } from 'chart.js';
import ChartContainer from '../ChartContainer';
import styles from './styles.module.scss';
import theme from './styles.module.scss';
import SellFilter from '../SellFilters';
import dayjs from 'dayjs';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const orderSortData: any = [
  { label: 'Maiores Vendas', value: 'desc' },
  { label: 'Menores Vendas', value: 'asc' },
];

const orderFieldData: any = [
  { label: 'Ranking mercado', value: 'sale_competitors_month' },
  { label: 'Ranking loja', value: 'sale_pharmacy_month' },
];

const [categoriesData, setCategoriesData] = useState<any>();
const [orderSort, setOrderSort] = useState<ChangeEvent<Element>>(
  orderSortData[0].value
);
const [orderField, setOrderField] = useState<ChangeEvent<Element>>(
  orderFieldData[0].value
);
const [category, setCategory] = useState<ChangeEvent<Element>>();
const [yearMonth, setYearMonth] = useState<dayjs.Dayjs | null>(
  dayjs(new Date())
);

const [bestSellerContent, setBestSellerContent] = useState<any>();

useEffect(() => {
  setCategory(categoriesData ? categoriesData[0].value : undefined);
}, [categoriesData]);

const onChangeOrderSort = (orderSort: any) => {
  setOrderSort(orderSort);
};

const onChangeOrderField = (orderField: any) => {
  setOrderField(orderField);
};

const onChangeCategories = (category: any) => {
  setCategory(category);
};

const onChangeDate = (date: any) => {
  setYearMonth(date);
};

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
      <ChartContainer
        showDetails={true}
        showInfo={true}
        showFilter={true}
        chartTitle="Vendas"
        chartSubTitle="Top produtos do mercado x minha loja"
        key={1}
        infoText="Gráfico de maiores vendas"
        filter={
          <SellFilter
            onChangeOrderSort={onChangeOrderSort}
            onChangeOrderField={onChangeOrderField}
            onChangeCategories={onChangeCategories}
            onChangeDate={onChangeDate}
            yearMonth={yearMonth}
            orderSort={orderSort}
            orderField={orderField}
            category={category}
            dataCategories={categoriesData}
            dataOrderField={orderFieldData}
            dataOrderSort={orderSortData}
          />
        }
      >
        <Bar
          aria-label="Gráfico de maiores vendas"
          options={options}
          data={data}
        />
      </ChartContainer>
    </div>
  );
};

export default BarChart;
