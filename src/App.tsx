import EvolutionFilter from './components/EvolutionFilter';

function App() {
  return (
    <>
      <EvolutionFilter
        onChangeProductName={(product) => console.log(product)}
      />
    </>
  );
}

export default App;
