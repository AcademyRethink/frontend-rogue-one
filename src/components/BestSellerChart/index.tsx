import { ChangeEvent, useEffect, useState } from 'react';
import ChartContainer from '../ChartContainer';
import SellFilter from '../SellFilters';
import dayjs from 'dayjs';
import BestSellerCard from './BestSellerCard';

import styles from './styles.module.scss';

import { getProductsFromReport } from '../../services/report';
import { getCategories } from '../../services/categories';
import { ProductsResponse } from '../../types/types';

const BestSellerChart = () => {
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

  const [bestSellerContent, setBestSellerContent] =
    useState<ProductsResponse[]>();

  useEffect(() => {
    getCategories()
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
  }, []);

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
    if (orderSort && orderField && category && yearMonth)
      getProductsFromReport({
        limit: 10,
        orderSort: orderSort,
        orderField: orderField,
        category: category,
        period: `${yearMonth?.format('YYYY-MM')}-01`,
      })
        .then((res) => setBestSellerContent(res))
        .catch((error) => alert(error));
  }, [orderSort, orderField, category, yearMonth]);

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
            dataCategories={categoriesData}
            dataOrderField={orderFieldData}
            dataOrderSort={orderSortData}
          />
        }
      >
        <div className={styles.bestSellerListContainer}>
          <ul className={styles.bestSellerList}>
            {Array.isArray(bestSellerContent) &&
              bestSellerContent.map((el) => {
                return (
                  <li key={el.position}>
                    <BestSellerCard
                      orderField={orderField}
                      position={el.position}
                      productName={el.product_name}
                      productLaboratory={el.laboratory}
                      productUnitys={
                        orderField?.toString() == 'sale_competitors_month'
                          ? el.sale_competitors_month
                          : el.sale_pharmacy_month
                      }
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </ChartContainer>
    </div>
  );
};

export default BestSellerChart;
