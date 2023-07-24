import { ProductsResponse } from '../types/types';
import api, { validToken } from './api';

export async function getProductsFromReport({
  limit,
  cnpj,
  orderSort,
  orderField,
  category,
  period,
}: {
  limit: any;
  cnpj: string;
  orderSort?: any;
  orderField?: any;
  category?: any;
  period?: any;
}): Promise<ProductsResponse[]> {
  let config = {
    headers: {
      Authorization: 'Bearer ' + validToken(),
    },
  };
  const response = await api.get(
    `dashboard/report?cnpj=${cnpj}&limit=${limit}&orderSort=${orderSort}&orderField=${orderField}&category=${category}&period=${period}`,
    config
  );
  return response.data;
}

export async function getLaboratories({
  limit,
  category,
  period,
  molecule,
  product_name,
  cnpj,
}: {
  limit: number;
  category: string | undefined;
  period: string | undefined;
  molecule: string | undefined;
  product_name: string | undefined;
  cnpj: string | undefined;
}) {
  let config = {
    headers: {
      Authorization: 'Bearer ' + validToken(),
    },
  };
  const response = await api.get(
    `dashboard/report/laboratories?cnpj=${cnpj}&limit=${limit}&category=${category}&period=${period}&molecule=${molecule}&product_name=${product_name}`,
    config
  );
  return response.data;
}
