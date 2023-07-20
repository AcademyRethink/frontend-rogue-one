export type Prop = string | JSX.Element | JSX.Element[];

export type SelectData = {
  label: string;
  value: string;
};

export type categoriesResponse = {
  category: string;
};

export type ProductsResponse = {
  position: number;
  report_id: number;
  cnpj: string;
  molecule: string;
  laboratory: string;
  ean: string;
  product_name: string;
  category: string;
  sale_pharmacy_month: number;
  sale_competitors_month: number;
  month_year: Date;
  competitors_unity_price: number;
};
