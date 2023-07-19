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
          <Sidebar>
            <Routes>
              <Route path="/" />
              <Route path="/home" element={<Home />} />
            </Routes>
          </Sidebar>
        </BrowserRouter>
        <TopBar updateDate="12/01/2023" />
        <Playground />
      </div>
    </>
  );
}

export default App;
