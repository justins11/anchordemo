// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

const App = () => (
  <Router>
    <Routes>
      <Route path="/dashboard" element={ <Dashboard /> } />
      <Route path="/" element={ <SignIn /> }  />
    </Routes>
  </Router>
);

export default App;
