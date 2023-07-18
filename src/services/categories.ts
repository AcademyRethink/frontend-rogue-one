import { categoriesResponse } from '../types/types';
import api from './api';

export async function getCategories(): Promise<categoriesResponse[]> {
  const response = await api.get('dashboard/categories?cnpj=00111222000133');
  return response.data;
}
