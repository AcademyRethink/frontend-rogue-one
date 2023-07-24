//React related imports
import { useState, useEffect } from 'react';
import { LineWave as Loader } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

//Chart.JS related imports
import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line as ChartType } from 'react-chartjs-2';

//Styling related imports
import theme from './styles.module.scss';

//Modal related imports
import { Box, Modal, Button } from '@mui/material';

//Services
import { fetchEvolutionGraph } from '../../services/graphServices';

//aria-labels
import labels from './aria-labels.json';

//components
import ChartContainer from '../ChartContainer';
import EvolutionFilter from '../EvolutionFilter';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

import styles from './styles.module.scss';

import ChartTitle from '../ChartTitle';

import CloseButton from '../CloseButton';

const addColorConfig = (data: any) => {
  return {
    labels: data.labels,
    datasets: data.datasets.map(
      (dataset: { label: string; data: number[] }, index: number) => {
        return {
          ...dataset,
          borderColor: theme[`color_${index + 1}`],
          backgroundColor: theme[`color_${index + 1}`],
        };
      }
    ),
  };
};

export const EvolutionChart = (): JSX.Element => {
  const [data, setData] = useState({ labels: [], datasets: [] } as ChartData<
    'line',
    number[],
    unknown
  >);

  const [modalData, setModalData] = useState({
    labels: [],
    datasets: [],
  } as ChartData<'line', number[], unknown>);

  const [productName, setProductName] = useState<any>();
  const [modalProductName, setModalProductName] = useState<any>();

  const [loading, setLoading] = useState(true);
  const [loadingModal, setLoadingModal] = useState(true);

  //Modal related states
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (value: any) => {
    setProductName(value);
  };

  const handleModalChange = (value: any) => {
    setModalProductName(value);
  };

  useEffect(() => {
    fetchEvolutionGraph(productName, 6)
      .then((json) => setData(addColorConfig(json)))
      .catch(console.error);
  }, [productName]);

  useEffect(() => {
    fetchEvolutionGraph(modalProductName) //modalProductName
      .then((json) => setModalData(addColorConfig(json)))
      .catch(console.error);
  }, [modalProductName]);

  useEffect(() => {
    if (data.datasets.length) setLoading(false);
  }, [data]);

  useEffect(() => {
    if (modalData.datasets.length) setLoadingModal(false);
  }, [modalData]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxHeight: 5,
          font: {
            family: theme.fontFamily,
            size: 12,
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          align: 'end',
          text: 'Unidades',
          display: true,
        },
        ticks: {
          font: {
            family: theme.fontFamily,
            size: 12,
          },
        },
        beginAtZero: true,
        grid: {

          color: theme.gridLine,

          /* borderColor: theme.gridLine, */

          /* borderColor: theme.gridLine, */

          tickColor: 'white',
        },
      },
      x: {
        offset: true,
        ticks: {
          font: {
            family: theme.fontFamily,
            size: 12,
          },
        },
        grid: {

          color: theme.gridLine,

          /* borderColor: theme.gridLine, */

          /* borderColor: theme.gridLine, */

          tickColor: 'white',
        },
      },
    },
  };

  const modalBoxId = 'evolution-chart-modal-box';
  const navigate = useNavigate();

  return (
    <ChartContainer
      className={styles.evolutionChart}
      chartTitle="Evolução"
      chartSubTitle="Vendas e estoque"
      showFilter={true}
      key={1}
      filter={
        <EvolutionFilter
          onChangeProductName={handleChange}
          key={1}
          selectedProduct={productName}
          parentId=""
        />
      }
      showInfo={false}
      showDetails={true}
      onClickDetails={handleOpen}
      infoText={''}
    >
      <div className={styles.chartSubContainerBody}>
        {loading ? (
          <Loader
            height="180"
            width="fit-content"
            wrapperClass={styles.chartSubContainerBody}
            color={theme.color_2}
            ariaLabel="Carregando"
          />
        ) : (
          <ChartType
            options={options}
            data={data}
            aria-label="Grafico de evolução das vendas e do estoque"
          />
        )}
      </div>
      {/* <Button title="Relatorio PCP" onClick={() => console.log('Teste')} /> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-label={labels.Chart}
        style={{ backdropFilter: 'blur(5px)' }}
      >
        <Box
          className={styles.modalBox}
          id={modalBoxId}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'calc(100% - 74px)',
            height: 'calc(100% - 74px)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            padding: 4,
          }}
        >
          <div className={styles.modalHeader}>
            <EvolutionFilter
              onChangeProductName={handleModalChange}
              key={1}
              selectedProduct={modalProductName}
              parentId={modalBoxId}
            />
            <Button
              style={{
                backgroundColor: theme.button_color,
              }}
              variant="contained"
              onClick={() => navigate('/report')}
            >
              Relatório PCP
            </Button>
            {/* <div className={styles.infoIconContainer}>

            <InfoIcon placement="right" title="Teste" />
            </div> */}
            <div className={styles.closeButtonContainer}>
              <CloseButton handleClose={handleClose} key={6} />
            </div>
          </div>

          <div className={styles.chartTitleModal}>
            <ChartTitle subtitle="Vendas e evolução" title="Evolução" key={2} />
          </div>
          <div className={styles.chartSubContainerModal}>
            {loadingModal ? (
              <Loader
                height="100"
                width="100"
                wrapperClass={styles.chartSubContainerModal}
                color={theme.color_2}
                ariaLabel="Carregando"
              />
            ) : (
              <ChartType
                options={options}
                data={modalData}
                aria-label={labels.Chart}
              />
            )}
          </div>
        </Box>
      </Modal>
    </ChartContainer>
  );
};

export default EvolutionChart;
