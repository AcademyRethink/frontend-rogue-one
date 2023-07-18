const mock = {
  report_id: 102223,
  cnpj: '00111222000133',
  molecule: 'CAFEINA| DIPIRONA SODICA| ORFENADRINA CITRATO',
  laboratory: 'SANOFI',
  ean: '7891058017507',
  product_name: 'DORFLEX CPR x 36',
  category: 'MIP_MARCA',
  sale_pharmacy_month: 0,
  sale_competitors_month: 30,
  month_year: '2023-03-01T03:00:00.000Z',
};

import { ChangeEvent } from 'react';
import styles from './styles.module.scss';
const BestSellerCard = ({
  orderField,
}: {
  orderField?: ChangeEvent<Element>;
}) => {
  console.log(orderField);
  return (
    <div className={styles.bestSellerChartCard}>
      <div
        className={
          orderField?.toString() === 'sale_competitors_month' ||
          orderField == undefined
            ? styles.sale_competitors_month_scheme
            : styles.sale_pharmacy_month_scheme
        }
      >
        1
      </div>
      <div className={styles.productDetails}>
        <h5>{mock.product_name}</h5>
        <p>{mock.laboratory}</p>
      </div>
      <div className={styles.productQuantity}>
        <h5>Unidades</h5>
        <p>{mock.sale_competitors_month}</p>
      </div>
    </div>
  );
};

export default BestSellerCard;
