import MyProfile from "./view/myProfile/MyProfile"
import './App.css';
import Login from './view/login/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ForgotPassword from './view/login/ForgotPassword/ForgotPassword';
import WarningSendPassword from './view/login/WarningSendPassword/WarningSendPassword';
import ResetPassword from './view/login/ResetPassword/ResetPassword';
import Dashboard from './view/dashboard/Dashboard';


function App() {
  return (

    <BrowserRouter>
      <div className="App" style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/warning-send-password"
            element={<WarningSendPassword />}
          />
          <Route path='/reset-password' element={<ResetPassword />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
  }

export default App;
