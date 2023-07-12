import FilterContainer from '../FiltersContainer';
import { SelectData } from '../../types/types';
import { Select } from '../Filter';

const data: SelectData[] = [
  { description: 'Maiores Vendas', value: 'desc' },
  { description: 'Menores Vendas', value: 'asc' },
];

const EvolutionFilter = () => {
  return (
    <div>
      <FilterContainer>
        <Select
          symbolClass="material-symbols-outlined"
          symbol="pill"
          defaultValue={data[0].value}
          selectId="productName"
          selectName="productName"
          data={data}
        />
      </FilterContainer>
    </div>
  );
};

export default EvolutionFilter;
