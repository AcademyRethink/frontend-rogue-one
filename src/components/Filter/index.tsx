import './styles.scss';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineCalendarMonth,
} from 'react-icons/md';
import 'material-symbols/outlined.css';

import { SelectData } from '../../types/types';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';

import { ConfigProvider, DatePicker, Select, Space } from 'antd';
import locale from 'antd/locale/pt_BR';

const CustomSelect = ({
  Icon,
  symbol,
  symbolClass,
  data,
  widthMin,
  onChangeFunction,
  selectValue,
}: {
  Icon?: React.ElementType;
  symbol?: string;
  symbolClass?: string;
  widthMin?: number;
  data?: any;
  onChangeFunction: ChangeEventHandler;
  selectValue?: ChangeEvent<Element>;
}) => {
  return (
    <div>
      {data && (
        <Space className="selectContainer">
          {Icon && <Icon className="frontIcon" />}
          {symbol && (
            <span className={`${symbolClass} frontSymbol`}>{symbol}</span>
          )}
          <Select
            options={data}
            suffixIcon={<MdKeyboardArrowDown />}
            size="middle"
            bordered={false}
            className="customAntdSelect"
            popupClassName="customAntdSelectPopup"
            style={
              widthMin
                ? {
                    minWidth: widthMin,
                  }
                : {}
            }
            popupMatchSelectWidth={false}
            placement="bottomRight"
            onChange={onChangeFunction}
            value={selectValue ? selectValue : data[0]}
          ></Select>
        </Space>
      )}
    </div>
  );
};

const CustomDatePicker = ({
  onChangeFunction,
  yearMonth,
}: {
  yearMonth: Dayjs | null;
  onChangeFunction:
    | ((value: dayjs.Dayjs | null, dateString: string) => void)
    | undefined;
}) => {
  return (
    <div className="selectContainer">
      <MdOutlineCalendarMonth />
      <ConfigProvider locale={locale}>
        <DatePicker
          suffixIcon={<MdKeyboardArrowDown />}
          superPrevIcon={<MdKeyboardArrowLeft />}
          superNextIcon={<MdKeyboardArrowRight />}
          bordered={false}
          picker="month"
          size="middle"
          className="datePickerClass"
          popupClassName="datePickerPopUpClass"
          placement="bottomRight"
          value={yearMonth}
          format={'MMMM YYYY'}
          onChange={onChangeFunction}
        />
      </ConfigProvider>
    </div>
  );
};

export { CustomSelect, CustomDatePicker };
