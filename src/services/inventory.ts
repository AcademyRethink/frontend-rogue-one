import api from './api';

export async function getProductsFromInventory(data: any): Promise<string[]> {
  const session = localStorage.getItem('session');
  const token = session ? JSON.parse(session).token : '';

  const response = await api.post(
    'http://localhost:8080/dashboard/inventory/products',
    data,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
  return response.data;
}
