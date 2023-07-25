import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Client from './components/client';
import Admin from './components/admin';
import SaleReport from './components/admin/sale';
import ClientReport from './components/admin/client';
import Home from './layouts/Home';
import Header from './layouts/BaseLayout/Header';
import ClientLogin from './components/auth/ClientLogin';
import AdminLogin from './components/auth/AdminLogin';
import ClientRegister from './components/auth/ClientRegister';
import useAuth from './hooks/useAuth';

function App() {
  const { isAdmin, isClient, token } = useAuth();
  useEffect(() => {
    isAdmin();
    isClient();
  }, [])
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="client/dashboard" element={<Client />} />
        <Route path="admin/dashboard" element={<Admin />} />
        <Route path="admin/dashboard/sale" element={<SaleReport />} />
        <Route path="admin/dashboard/client" element={<ClientReport />} />
        <Route path="client/login" element={<ClientLogin />} />
        <Route path="client/register" element={<ClientRegister />} />
        <Route path="admin/login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}

export default App;
