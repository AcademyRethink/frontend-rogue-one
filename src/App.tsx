
import './App.css';
import Login from './view/login/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPassword from './view/login/ForgotPassword/ForgotPassword';
import WarningSendPassword from './view/login/WarningSendPassword/WarningSendPassword';
import ResetPassword from './view/login/ResetPassword/ResetPassword';
import Dashboard from './view/dashboard/Dashboard';
import DashboardLayout from './layout/DashboardLayout';
import MyProfile from './view/myProfile/MyProfile';
import PcpReport from './view/pcpReport/PcpReport';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} /> 
       
         <Route element={<DashboardLayout />}>
          <Route path="/dashboard" index element={<Dashboard />} />
          <Route path="/home" index element={<Dashboard />} />
          <Route path="/report" index element={<PcpReport/>} />
          <Route path="/my-profile" index element={<MyProfile />} />
        </Route>

       
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/warning-send-password"
          element={<WarningSendPassword />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
