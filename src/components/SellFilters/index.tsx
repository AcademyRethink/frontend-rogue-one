import FilterContainer from '../FiltersContainer';
import { CustomSelect, CustomDatePicker } from '../Filter';
import {
  MdTrendingDown,
  MdTrendingUp,
  MdApartment,
  MdGridView,
} from 'react-icons/md';
import { ChangeEvent, ChangeEventHandler } from 'react';

import dayjs from 'dayjs';

const SellFilter = ({
  onChangeOrderField,
  onChangeOrderSort,
  onChangeCategories,
  onChangeDate,
  orderSort,
  orderField,
  category,
  yearMonth,
  dataCategories,
  dataOrderField,
  dataOrderSort,
}: {
  orderSort?: ChangeEvent<Element>;
  orderField?: ChangeEvent<Element>;
  category?: ChangeEvent<Element>;
  yearMonth: dayjs.Dayjs | null;
  dataCategories: any;
  dataOrderField: any;
  dataOrderSort: any;
  onChangeOrderSort: ChangeEventHandler;
  onChangeOrderField: ChangeEventHandler;
  onChangeCategories: ChangeEventHandler;
  onChangeDate:
    | ((value: dayjs.Dayjs | null, dateString: string) => void)
    | undefined;
}) => {
  return (
    <>
      <FilterContainer>
        <CustomSelect
          Icon={
            orderSort?.toString().toLowerCase() === 'desc'
              ? MdTrendingUp
              : MdTrendingDown
          }
          data={dataOrderSort}
          onChangeFunction={onChangeOrderSort}
          selectValue={orderSort}
        />
        <CustomSelect
          Icon={MdApartment}
          data={dataOrderField}
          onChangeFunction={onChangeOrderField}
          selectValue={orderField}
        />
        <CustomSelect
          Icon={MdGridView}
          data={dataCategories}
          onChangeFunction={onChangeCategories}
          selectValue={category}
        />
        <CustomDatePicker
          onChangeFunction={onChangeDate}
          yearMonth={yearMonth}
        />
      </FilterContainer>
    </>
  );
};

export default SellFilter;
