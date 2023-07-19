import { categoriesResponse } from '../types/types';
import api from './api';

export async function getProductsFromInventory(data: any): Promise<string[]> {
  const response = await api.post(
    'http://localhost:8080/dashboard/inventory/products',
    data
  );
  return response.data;
}
