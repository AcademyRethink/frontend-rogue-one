import FilterContainer from '../FiltersContainer';
import { SelectData } from '../../types/types';
import { Select, Date } from '../Filter';
import {
  MdTrendingUp,
  MdApartment,
  MdGridView,
  MdOutlineCalendarMonth,
} from 'react-icons/md';

const dataBestSeller: SelectData[] = [
  { description: 'Maiores Vendas', value: 'desc' },
  { description: 'Menores Vendas', value: 'asc' },
];

const dataRanking: SelectData[] = [
  { description: 'Ranking mercado', value: 'sale_competitors_month' },
  { description: 'Ranking loja', value: 'sale_' },
];

const dataCategory: SelectData[] = [
  { description: 'MIP genérico', value: 'MIP_GENERICO' },
  { description: 'MIP marca', value: 'MIP_MARCA' },
];


const SellFilter = () => {
  return (
    <>
      <FilterContainer>
        <Select
          Icon={MdTrendingUp}
          defaultValue={dataBestSeller[0].value}
          selectId="orderSort"
          selectName="orderSort"
          data={dataBestSeller}
        />
        <Select
          Icon={MdApartment}
          defaultValue={dataRanking[0].value}
          selectId="orderField"
          selectName="orderField"
          data={dataRanking}
        />
        <Select
          Icon={MdGridView}
          defaultValue={dataCategory[0].value}
          selectId="category"
          selectName="category"
          data={dataCategory}
        />
        <Date
          Icon={MdOutlineCalendarMonth}
          defaultValue={dataRanking[0].value}
          selectId="period"
          selectName="period"
        />
      </FilterContainer>
    </>
  );
};

export default SellFilter;
