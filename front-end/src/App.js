import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Form/Register';
import Login from './components/Form/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Grupos from './components/Grupos/Group';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/grupos' element={<Grupos/>}/>
      </Routes>
    </Router>
  )
}

export default App;
