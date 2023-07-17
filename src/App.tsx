import SellFilter from './components/SellFilters';
import EvolutionFilter from './components/EvolutionFilter';
import ChartTitle from './components/ChartTitle';
import ChartContainer from './components/ChartContainer';

function App() {
  return (
    <>
      <ChartContainer
        showDetails={true}
        showFilter={true}
        showInfo={true}
        chartSubTitle="Top produtos do mercado"
        chartTitle="Maiores vendas"
        filter={<SellFilter />}
      >
        teste
      </ChartContainer>

      {/* <EvolutionFilter /> */}
    </>
  );
}

export default App;
