import api, { validToken } from './api';

export async function getProductsFromInventory(data?: any): Promise<string[]> {
  const session = localStorage.getItem('session');
  const { cnpj } = JSON.parse(session!);

  let config = {
    headers: {
      Authorization: 'Bearer ' + validToken(),
    },
  };
  const response = await api.post(
    'http://localhost:8080/dashboard/inventory/products',
    { cnpj, ...data },
    config
  );
  return response.data;
}
