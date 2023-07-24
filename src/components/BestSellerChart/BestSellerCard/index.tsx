

import { ChangeEvent } from 'react';
import styles from './styles.module.scss';
const BestSellerCard = ({
  orderField,
  position,
  productName,
  productLaboratory,
  productUnitys,
}: {
  orderField?: ChangeEvent<Element>;
  position: number;
  productName: string;
  productLaboratory: string;
  productUnitys: number;
}) => {
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
        {position}
      </div>
      <div className={styles.productDetails}>
        <h5 title={productName}>{productName}</h5>
        <p>{productLaboratory}</p>
      </div>
      <div className={styles.productQuantity}>
        <h5>Unidades</h5>
        <p>{productUnitys}</p>
      </div>
    </div>
  );
};

export default BestSellerCard;
