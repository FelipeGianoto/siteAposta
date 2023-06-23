import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Preferences from './components/Preferences/Preferences';
import useToken from './services/useToken';

function App() {
  const { token, setToken } = useToken();
  const [saldo, setSaldo] = useState(100.01);

   if (!token) {
     return <Login setToken={setToken} />;
  }

  return (
    <div>
      <nav className="navbar">
        <div className="navbar__name"></div>
        <div className="navbar__balance">Saldo: R$ {saldo.toFixed(0)}</div>
        <button className="navbar__deposit-button">Fazer Depósito</button>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard saldo={saldo} setSaldo={setSaldo} setToken={setToken}/>} />
        <Route path="/preferences" element={<Preferences />} />
      </Routes>
    </div>
  );
}

export default App;
