import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Client from './components/client';
import Admin from './components/admin';
import SaleReport from './components/admin/sale';
import ClientReport from './components/admin/client';
import Home from './layouts/Home';
import Header from './layouts/BaseLayout/Header';
import useAuth from './hooks/useAuth';

function App() {
  const { isClient, token } = useAuth();
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="client/dashboard" element={<Client />} />
        <Route path="admin/dashboard" element={<Admin />} />
        <Route path="admin/dashboard/sale" element={<SaleReport />} />
        <Route path="admin/dashboard/client" element={<ClientReport />} />
      </Routes>
    </div>
  );
}

export default App;
