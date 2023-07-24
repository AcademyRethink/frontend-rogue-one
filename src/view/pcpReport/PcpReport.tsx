import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalMyProfile from '../myProfile/ModalMyProfile/ModalMyProfile';
import style from './style.module.scss';
import axios from '../../axios.config';
import { CustomDatePicker, CustomSelect } from '../../components/Filter';
import { MdGridView } from 'react-icons/md';
import dayjs from 'dayjs';
import { getCategories } from '../../services/categories';
import { getProductsFromReport } from '../../services/report';
import { ProductsResponse } from '../../types/types';

const truncateMolecule = (molecule: string, numberOfWords: number) => {
  const words = molecule.split('|');
  return words.slice(0, numberOfWords).join(' | ');
};
const formatNumber = (number: number) => {
  return number.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
};

const PcpReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [categoriesData, setCategoriesData] = useState<any>();
  const [category, setCategory] = useState<ChangeEvent<Element>>();
  const [yearMonth, setYearMonth] = useState<dayjs.Dayjs | null>(
    dayjs(new Date())
  );
  const [sessionData, setSessionData] = useState(
    localStorage.getItem('session')
  );

  useEffect(() => {
    setSessionData(localStorage.getItem('session'));
  }, []);

  useEffect(() => {
    if (sessionData) {
      console.log(JSON.parse(sessionData).cnpj);
      getCategories(JSON.parse(sessionData).cnpj)
        .then((resp) =>
          resp.map((el) => {
            return {
              label: el.category.split('_').join(' '),
              value: el.category,
            };
          })
        )
        .then((result) => {
          return setCategoriesData(result);
        })
        .catch((error) => alert(error));
    }
  }, [sessionData]);

  useEffect(() => {
    setCategory(categoriesData ? categoriesData[0].value : undefined);
  }, [categoriesData]);

  const onChangeCategories = (category: any) => {
    setCategory(category);
  };

  const onChangeDate = (date: any) => {
    setYearMonth(date);
  };

  const [data, setData] = useState<ProductsResponse[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionData && category && yearMonth)
      getProductsFromReport({
        limit: 100,
        cnpj: JSON.parse(sessionData).cnpj,
        orderSort: 'desc',
        orderField: 'sale_competitors_month',
        category: category,
        period: `${yearMonth?.format('YYYY-MM')}-01`,
      })
        .then((res) => setData(res))
        .catch((error) => alert(error));
  }, [category, yearMonth]);

  return (
    <div>
      <ModalMyProfile
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          navigate('/home');
        }}
      >
        <div className={style.pcpReportContainer}>
          <div className={style.pcpReportHeader}>
            <h1>Relatório PCP | IQVIA</h1>
            <div className={style.pcpReportFilterContainer}>
              <div className={style.pcpReportFilter}>
                <CustomSelect
                  Icon={MdGridView}
                  data={categoriesData}
                  onChangeFunction={onChangeCategories}
                  selectValue={category}
                />
              </div>
              <div className={style.pcpReportFilter}>
                <CustomDatePicker
                  onChangeFunction={onChangeDate}
                  yearMonth={yearMonth}
                />
              </div>
            </div>
          </div>
          <div></div>
          <div className={style.pcpReportTable}>
            {/* Renderização das divs de cabeçalho */}
            <div className={` ${style.grayRow} ${style.pcpReportTitle}`}>
              <div className={style.moleculeCell}>
                <h5>Molécula</h5>
              </div>
              <div className={style.laboratoryCell}>
                <h5>Laboratório</h5>
              </div>
              <div className={`${style.demandCell} ${style.centeredCell}`}>
                <h5>
                  Demanda média por
                  <br /> loja concorrente
                  <br />{' '}
                </h5>
                <p>(unidades vendidas)</p>
              </div>
              <div className={`${style.demandCell} ${style.centeredCell}`}>
                <h5>
                  Demanda mensal
                  <br /> da minha loja
                  <br />{' '}
                </h5>
                <p>(unidades vendidas)</p>
              </div>
              <div className={`${style.valueCell} ${style.centeredCell}`}>
                <h5>
                  Valor médio praticado
                  <br /> pelo mercado <br />
                </h5>
                <p>(valor por unidade do produto)</p>
              </div>
            </div>

            {/* Renderização das divs de cada linha */}
            {data.map((item, index) => (
              <div
                key={item.report_id}
                className={`${style.pcpReportRow} ${
                  index % 2 === 0 ? style.whiteRow : style.grayRow
                }`}
              >
                <div className={style.moleculeCell}>
                  <h4>{truncateMolecule(item.molecule, 2)}</h4>
                </div>
                <div className={style.laboratoryCell}>
                  <h4>{item.laboratory}</h4>
                </div>
                <div className={`${style.demandCell} ${style.centeredCell}`}>
                  <h4>{item.sale_competitors_month}</h4>
                </div>
                <div className={`${style.demandCell} ${style.centeredCell}`}>
                  <h4>{item.sale_pharmacy_month}</h4>
                </div>
                <div className={`${style.valueCell} ${style.centeredCell}`}>
                  <h4>
                    <span>R$</span> &nbsp;&nbsp;
                    {formatNumber(item.competitors_unity_price)}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ModalMyProfile>
    </div>
  );
};

export default PcpReport;
