import SellFilter from './components/SellFilters';
import EvolutionFilter from './components/EvolutionFilter';
import ChartTitle from './components/ChartTitle';
import ChartContainer from './components/ChartContainer';

function App() {
  return (
    <>
      <ChartTitle title="Maiores vendas" subtitle="Top produtos do mercado" />

      <ChartContainer />
      <SellFilter />
      <EvolutionFilter />
    </>
  );
}

export default App;
