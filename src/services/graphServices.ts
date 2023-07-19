export const fetchEvolutionGraph = async (productName?: string) => {
  const response = await fetch(
    'http://localhost:8080/dashboard/graphs/2/2023-01/2023-03',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        cnpj: '00111222000133',
        product_name: productName,
      }),
    }
  ).then((response) => response.json());

  return response;

};

