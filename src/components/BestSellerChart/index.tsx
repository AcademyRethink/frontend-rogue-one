import { ChangeEvent, useState } from 'react';
import ChartContainer from '../ChartContainer';
import SellFilter from '../SellFilters';
import dayjs from 'dayjs';
import BestSellerCard from './BestSellerCard';

import styles from './styles.module.scss';

const BestSellerChart = () => {
  const [orderSort, setOrderSort] = useState<ChangeEvent<Element>>();
  const [orderField, setOrderField] = useState<ChangeEvent<Element>>();
  const [category, setCategory] = useState<ChangeEvent<Element>>();
  const [yearMonth, setYearMonth] = useState<dayjs.Dayjs | null>(
    dayjs(new Date())
  );

  const [bestSellerContent, setBestSellerContent] = useState();

  const onChangeOrderSort = (orderSort: any) => {
    setOrderSort(orderSort);
    console.log(orderSort);
  };

  const onChangeOrderField = (orderField: any) => {
    setOrderField(orderField);
    console.log(orderField);
  };

  const onChangeCategories = (category: any) => {
    setCategory(category);
    console.log(category);
  };

  const onChangeDate = (date: any) => {
    setYearMonth(date);
    console.log(date);
  };
  return (
    <div>
      <ChartContainer
        showDetails={false}
        showFilter={true}
        showInfo={true}
        infoText={
          orderField?.toString() === 'sale_competitors_month' ||
          orderField == undefined
            ? 'Média de unidades vendidas por loja concorrente'
            : 'Média de unidades vendidas pela minha loja'
        }
        chartSubTitle={
          orderField?.toString() === 'sale_competitors_month' ||
          orderField == undefined
            ? 'Top produtos do mercado'
            : 'Top produtos da minha loja'
        }
        chartTitle="Maiores vendas"
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
          />
        }
      >
        <ul className={styles.bestSellerList}>
          <li key={1}>
            <BestSellerCard orderField={orderField} />
          </li>
          <li key={2}>
            <BestSellerCard orderField={orderField} />
          </li>
          <li key={3}>
            <BestSellerCard orderField={orderField} />
          </li>
        </ul>
      </ChartContainer>
    </div>
  );
};

export default BestSellerChart;
