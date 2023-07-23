import { EvolutionChart } from '../../components/graphs/EvolutionChart';
import './styles.css';
import './styles.module.scss';

const Playground = () => {
  return (
    <>
      <div>
        {/* <Sidebar /> */}
        <EvolutionChart className={''} />
      </div>
    </>
  );
};

export default Playground;
