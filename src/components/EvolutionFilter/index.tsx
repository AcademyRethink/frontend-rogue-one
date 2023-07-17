import FilterContainer from '../FiltersContainer';
import { SelectData } from '../../types/types';
import { CustomSelect } from '../Filter';

const data: SelectData[] = [
  { label: 'Maiores Vendas', value: 'desc' },
  { label: 'Menores Vendas', value: 'asc' },
];

const EvolutionFilter = () => {
  return (
    <div>
      <FilterContainer>
        <CustomSelect
          symbolClass="material-symbols-outlined"
          symbol="pill"
          data={data}
          onChangeFunction={() => {}}
        />
      </FilterContainer>
    </div>
  );
};

export default EvolutionFilter;
