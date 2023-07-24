// import Sidebar from '../../layout/sidebar/index';
import { EvolutionChart } from '../../components/EvolutionChart';
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
