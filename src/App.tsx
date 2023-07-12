import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Playground from './view/playground/index';
import Home from './view/home/index';
import Sidebar from './layout/sidebar';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/" />
            <Route path="/dashboard" element={<Home />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
      <Playground />
    </>
  );
}

export default App;
