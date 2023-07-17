import FilterContainer from '../FiltersContainer';
import { SelectData } from '../../types/types';
import { CustomSelect, CustomDatePicker } from '../Filter';
import { MdTrendingUp, MdApartment, MdGridView } from 'react-icons/md';
import { useEffect, useState } from 'react';

import { getCategories } from '../../services/categories';

const dataBestSeller: SelectData[] = [
  { label: 'Maiores Vendas', value: 'desc' },
  { label: 'Menores Vendas', value: 'asc' },
];

const dataRanking: SelectData[] = [
  { label: 'Ranking mercado', value: 'sale_competitors_month' },
  { label: 'Ranking loja', value: 'sale_' },
];

const SellFilter = () => {
  const [categories, setCategories] = useState<SelectData[]>();

  useEffect(() => {
    getCategories()
      .then((resp) =>
        resp.map((el) => {
          return {
            label: el.category.split('_').join(' '),
            value: el.category,
          };
        })
      )
      .then((result) => setCategories(result))
      .then()
      .catch((error) => alert(error));
  }, []);
  return (
    <>
      <FilterContainer>
        <CustomSelect
          Icon={MdTrendingUp}
          data={dataBestSeller}
          onChangeFunction={() => {}}
        />
        <CustomSelect
          Icon={MdApartment}
          data={dataRanking}
          onChangeFunction={() => {}}
        />
        <CustomSelect
          Icon={MdGridView}
          data={categories}
          onChangeFunction={() => {}}
        />
        <CustomDatePicker />
      </FilterContainer>
    </>
  );
};

export default SellFilter;
