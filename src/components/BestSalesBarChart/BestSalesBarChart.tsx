import { getProductsFromReport } from '../../services/report';
import { getCategories } from '../../services/categories';
import { useEffect, useState, ChangeEvent } from 'react';
import type { ChartOptions } from 'chart.js';
import { ProductsResponse } from '../../types/types';
import ModalMyProfile from '../../view/myProfile/ModalMyProfile/ModalMyProfile';
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

const BestSalesChart = () => {
  const orderSortData: any = [
    { label: 'Maiores Vendas', value: 'desc' },
    { label: 'Menores Vendas', value: 'asc' },
  ];

  const orderFieldData: any = [
    { label: 'Ranking mercado', value: 'sale_competitors_month' },
    { label: 'Ranking loja', value: 'sale_pharmacy_month' },
  ];

  const [sessionData, setSessionData] = useState(
    localStorage.getItem('session')
  );
  const [categoriesData, setCategoriesData] = useState<any>();
  const [modalOpen, setModalOpen] = useState<any>(false);
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

  const handleClose = () => {
    setModalOpen(!modalOpen);
  };

  const [bestSellerContent, setBestSellerContent] =
    useState<ProductsResponse[]>();
  // console.log(bestSellerContent);

  useEffect(() => {
    setSessionData(localStorage.getItem('session'));
  }, []);

  useEffect(() => {
    if (sessionData) {
      getCategories(JSON.parse(sessionData).cnpj)
        .then((resp) =>
          resp.map((el) => {
            return {
              label: el.category.split('_').join(' '),
              value: el.category,
            };
          })
        )
        .then((result) => {
          return setCategoriesData(result);
        })
        .catch((error) => alert(error));
    }
  }, [sessionData]);

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

  useEffect(() => {
    if (sessionData && orderSort && orderField && category && yearMonth)
      getProductsFromReport({
        limit: 10,
        cnpj: JSON.parse(sessionData).cnpj,
        orderSort: orderSort,
        orderField: orderField,
        category: category,
        period: `${yearMonth?.format('YYYY-MM')}-01`,
      })
        .then((res) => setBestSellerContent(res))
        .catch((error) => alert(error));
  }, [orderSort, orderField, category, yearMonth]);
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
          // callback: function (value, index, ticks) {
          //   return '$' + value;
          // },
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

  const dataCompetitors = (sliceSize: number) => {
    const contentSliced = bestSellerContent?.slice(0, sliceSize);
    return contentSliced?.map((item) => item.sale_competitors_month);
  };

  const dataPharmacy = (sliceSize: number) => {
    const contentSliced = bestSellerContent?.slice(0, sliceSize);
    return contentSliced?.map((item) => item.sale_pharmacy_month);
  };

  const bestSellerData = bestSellerContent?.map((item) => {
    const itemArr = item.product_name.split(' ');
    return `${itemArr[0]} ${itemArr[1]}`;
  });

  /* const teste = (sliceSize: number) => {
    const slicedData = bestSellerContent?.slice(0, sliceSize);
    // console.log(slicedData);

    slicedData?.map((item) => {
      const itemArr = item.product_name.split(' ');

      return `${itemArr[0]} ${itemArr[1]}`;
    });
  }; */

  // console.log(teste(7));

  const info = {
    labels: bestSellerData?.slice(0, 7),
    datasets: [
      {
        label: 'Vendas Mercado',
        data: dataCompetitors(7),
      },
      {
        label: 'Minhas vendas',
        data: dataPharmacy(7),
      },
    ],
  };
  const infoModal = {
    labels: bestSellerData?.slice(0, 9),
    datasets: [
      {
        label: 'Vendas Mercado',
        data: dataCompetitors(9),
      },
      {
        label: 'Minhas vendas',
        data: dataPharmacy(9),
      },
    ],
  };

  const data = {
    labels: bestSellerData?.slice(0, 7),
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
  const modaldata = {
    labels: bestSellerData?.slice(0, 9),
    datasets: [
      {
        label: infoModal.datasets[0].label,
        data: infoModal.datasets[0].data,
        backgroundColor: '#FF7043',
      },
      {
        label: infoModal.datasets[1].label,
        data: infoModal.datasets[1].data,
        backgroundColor: '#26C6DA',
      },
    ],
  };

  return (
    <div className={styles.barChart}>
      <ChartContainer
        showDetails={true}
        showInfo={true}
        showFilter={true}
        chartTitle="Vendas"
        chartSubTitle="Top produtos do mercado x minha loja"
        infoText="Gráfico de maiores vendas"
        onClickDetails={handleClose}
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
        <div className={styles.chartStyle}>
          <Bar
            aria-label="Gráfico de maiores vendas"
            options={options}
            data={data}
          />
        </div>
      </ChartContainer>
      <ModalMyProfile isOpen={modalOpen} onClose={handleClose}>
        <div className={styles.modalMajorSales}>
          <ChartContainer
            showDetails={false}
            showInfo={true}
            showFilter={true}
            chartTitle="Vendas"
            chartSubTitle="Top produtos do mercado x minha loja"
            infoText="Gráfico de maiores vendas"
            onClickDetails={handleClose}
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
            <div className={styles.modalChart}>
              <Bar
                aria-label="Gráfico de maiores vendas"
                options={options}
                data={modaldata}
              />
            </div>
          </ChartContainer>
        </div>
      </ModalMyProfile>
    </div>
  );
};

export default BestSalesChart;
