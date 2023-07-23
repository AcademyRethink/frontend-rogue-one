import Api from './api';

const getSalesChartData = async (
  startDate: String,
  finishDate: String
  // body: any
): Promise<string[]> => {
  const body = JSON.stringify({
    cnpj: '00111222000133',
    product_name: 'DIPIRONA',
  });
  const response = await Api.post(
    `//dashboard/graphs/2/${startDate}/${finishDate}`,
    body
  );
  return response.data;
};

export default getSalesChartData;
