import './App.css'
import Login from "./view/login/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./layout/sidebar";
import PrivateRoute from './view/login/PrivateRoute';




function App() {

  return (
    <BrowserRouter>
     <div className="App" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Sidebar />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
