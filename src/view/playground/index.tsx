import Sidebar from '../../layout/sidebar/index';
import './styles.css';

const Playground = (...args: any) => {
  return (
    <>
      <div>
        <Sidebar opened />
      </div>
    </>
  );
};

export default Playground;
