import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalMyProfile from '../myProfile/ModalMyProfile/ModalMyProfile';
import style from './style.module.scss';
import axios from '../../axios.config';
import {ReportItem} from '../../types/pcpReportTypes'


const truncateMolecule = (molecule: string, numberOfWords: number) => {
  const words = molecule.split('|');
  return words.slice(0, numberOfWords).join(' | ');
};
const formatNumber = (number: number) => {
  return number.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
};

const PcpReport = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [data, setData] = useState<ReportItem[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get<ReportItem[]>(
          'http://localhost:8080/dashboard/report',
          {
            params: {
              cnpj: '00111222000133',
              limit: 100,
              orderSort: 'desc',
              orderField: 'sale_competitors_month',
              category: 'MIP_MARCA',
              period: '2023-03-01',
            },
          }
        );

        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
            <div>FILTROS</div>
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
