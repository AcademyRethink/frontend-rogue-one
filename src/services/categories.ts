import { categoriesResponse } from '../types/types';
import api from './api';

export async function getCategories(): Promise<categoriesResponse[]> {
  const response = await api.get('dashboard/categories');
  return response.data;
}
