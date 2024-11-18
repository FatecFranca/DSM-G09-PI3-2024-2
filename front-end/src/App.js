import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Form/Register';
import Login from './components/Form/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Grupos from './components/Grupos/Group';
import Financeiro from './components/Check/Financeiro';
import './globalCSS/GlobalStyle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/grupos' element={<Grupos/>}/>
        <Route path='/financeiro' element={<Financeiro/>}/>
      </Routes>
    </Router>
  )
}

export default App;
