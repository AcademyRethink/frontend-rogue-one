interface ReportItem {
  report_id: number;
  cnpj: string;
  molecule: string;
  laboratory: string;
  ean: string;
  product_name: string;
  category: string;
  sale_pharmacy_month: number;
  sale_competitors_month: number;
  month_year: string;
  competitors_unity_price: number;
}

export type{ReportItem}