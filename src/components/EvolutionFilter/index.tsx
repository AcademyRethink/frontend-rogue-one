import FilterContainer from '../FiltersContainer';
import { SelectData } from '../../types/types';
import { CustomSelect } from '../Filter';
import { ChangeEventHandler } from 'react';

const data: SelectData[] = [
  { label: 'Maiores Vendas', value: 'desc' },
  { label: 'Menores Vendas', value: 'asc' },
];

const EvolutionFilter = ({
  onChangeProductName,
}: {
  onChangeProductName: ChangeEventHandler;
}) => {
  return (
    <div>
      <FilterContainer>
        <CustomSelect
          symbolClass="material-symbols-outlined"
          symbol="pill"
          data={data}
          onChangeFunction={onChangeProductName}
        />
      </FilterContainer>
    </div>
  );
};

export default EvolutionFilter;
