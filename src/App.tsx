import FilterContainer from './components/FiltersContainer';
import { SelectData } from './types/types';
import { Select } from './components/Filter';
import { MdTrendingUp } from 'react-icons/md';

import './App.css';

const data: SelectData[] = [
  { description: 'Maiores Vendas', value: 'desc' },
  { description: 'Menores Vendas', value: 'asc' },
];

function App() {
  return (
    <>
      <FilterContainer>
        <Select
          Icon={MdTrendingUp}
          defaultValue={data[0].value}
          selectId="orderSort"
          selectName="orderSort"
          data={data}
        />
        <Select
          Icon={MdTrendingUp}
          defaultValue={data[0].value}
          selectId="orderSort"
          selectName="orderSort"
          data={data}
        />
      </FilterContainer>
    </>
  );
}

export default App;
