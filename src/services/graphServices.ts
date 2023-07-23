import axios, { AxiosResponse } from "axios";

export const fetchEvolutionGraph = async (productName?: string) => {
  const response = await axios.post(
    'http://localhost:8080/dashboard/graphs/2/2023-01/2023-03',
    {
      cnpj: '00111222000133',
      product_name: productName,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  ).then((response : AxiosResponse) => response.data);

  return response;
};

fetchEvolutionGraph().then(console.log);
