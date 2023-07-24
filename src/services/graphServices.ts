import axios, { AxiosResponse } from 'axios';
import { validToken } from './api';

export const fetchEvolutionGraph = async (
  productName?: string,
  limit?: number,
  completeLabel?: boolean
) => {
  const session = localStorage.getItem('session');
  const { cnpj } = JSON.parse(session!);
  const response = await axios
    .post(
      `http://localhost:8080/dashboard/graphs/2/${limit}`,
      {
        cnpj,
        product_name: productName,
        completeLabel
      },
      {
        headers: {
          Authorization: `Bearer ${validToken()}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
    .then((response: AxiosResponse) => response.data);

  return response;
};
