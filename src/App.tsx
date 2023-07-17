import SellFilter from './components/SellFilters';
import EvolutionFilter from './components/EvolutionFilter';
import ChartTitle from './components/ChartTitle';
import ChartRightText from './components/ChartRightText';

function App() {
  return (
    <>
      <ChartTitle title="Maiores vendas" subtitle="Top produtos do mercado" />

      <ChartRightText />
      <SellFilter />
      <EvolutionFilter />
    </>
  );
}

export default App;
