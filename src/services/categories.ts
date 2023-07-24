import { categoriesResponse } from '../types/types';
import api, { validToken } from './api';

export async function getCategories(
  cnpj: string
): Promise<categoriesResponse[]> {
  let config = {
    headers: {
      Authorization: 'Bearer ' + validToken(),
    },
  };
  const response = await api.get(`dashboard/categories?cnpj=${cnpj}`, config);
  return response.data;
}
