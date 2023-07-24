import './App.scss';
import Login from './view/login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPassword from './view/login/ForgotPassword';
import WarningSendPassword from './view/login/WarningSendPassword';
import ResetPassword from './view/login/ResetPassword';
import Dashboard from './view/dashboard';
import DashboardLayout from './layout/DashboardLayout';
import MyProfile from './view/myProfile';
import PcpReport from './view/pcpReport';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" index element={<Dashboard />} />
          <Route path="/home" index element={<Dashboard />} />
          <Route path="/report" index element={<PcpReport />} />
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
