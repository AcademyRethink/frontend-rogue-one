import FilterContainer from '../FiltersContainer';
import { SelectData } from '../../types/types';
import { CustomSelect, CustomDatePicker } from '../Filter';
import { MdTrendingUp, MdApartment, MdGridView } from 'react-icons/md';
import { ChangeEventHandler, useEffect, useState } from 'react';

import { getCategories } from '../../services/categories';
import dayjs from 'dayjs';

const dataBestSeller: SelectData[] = [
  { label: 'Maiores Vendas', value: 'desc' },
  { label: 'Menores Vendas', value: 'asc' },
];

const dataRanking: SelectData[] = [
  { label: 'Ranking mercado', value: 'sale_competitors_month' },
  { label: 'Ranking loja', value: 'sale_' },
];

const SellFilter = ({
  onChangeOrderField,
  onChangeOrderSort,
  onChangeCategories,
  onChangeDate,
}: {
  onChangeOrderSort: ChangeEventHandler;
  onChangeOrderField: ChangeEventHandler;
  onChangeCategories: ChangeEventHandler;
  onChangeDate:
    | ((value: dayjs.Dayjs | null, dateString: string) => void)
    | undefined;
}) => {
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
      .catch((error) => alert(error));
  }, []);
  return (
    <>
      <FilterContainer>
        <CustomSelect
          Icon={MdTrendingUp}
          data={dataBestSeller}
          onChangeFunction={onChangeOrderSort}
        />
        <CustomSelect
          Icon={MdApartment}
          data={dataRanking}
          onChangeFunction={onChangeOrderField}
        />
        <CustomSelect
          Icon={MdGridView}
          data={categories}
          onChangeFunction={onChangeCategories}
        />
        <CustomDatePicker onChangeFunction={onChangeDate} />
      </FilterContainer>
    </>
  );
};

export default SellFilter;
