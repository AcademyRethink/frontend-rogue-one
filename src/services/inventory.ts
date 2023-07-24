import { categoriesResponse } from '../types/types';
import api, { validToken } from './api';

export async function getProductsFromInventory(data: any): Promise<string[]> {
  let config = {
    headers: {
      Authorization: 'Bearer ' + validToken(),
    },
  };
  const response = await api.post(
    'http://localhost:8080/dashboard/inventory/products',
    data,
    config
  );
  return response.data;
}
