import { ProductsResponse } from '../types/types';
import api from './api';

export async function getProductsFromReport({
  limit,
  orderSort,
  orderField,
  category,
  period,
}: {
  limit: any;
  orderSort?: any;
  orderField?: any;
  category?: any;
  period?: any;
}): Promise<ProductsResponse[]> {
  const response = await api.get(
    `dashboard/report?cnpj=00111222000133&limit=${limit}&orderSort=${orderSort}&orderField=${orderField}&category=${category}&period=${period}`
  );
  return response.data;
}
