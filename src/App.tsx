import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Playground from './view/playground/index';
import Home from './view/home/index';
import TopBar from './layout/TopBar/TopBar';

import Sidebar from './layout/sidebar/Sidebar';
import './App.css';

function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          {/* <Sidebar> */}
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          {/* </Sidebar> */}
        </BrowserRouter>

        {/* <TopBar updateDate="12/01/2023" /> */}
        <div className="tela"></div>
      </div>
    </>
  );
}

export default App;
