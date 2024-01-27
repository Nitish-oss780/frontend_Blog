// Router.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Update from './pages/Update';
import Create from './pages/Create';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
    <Header/>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/update/:id" element={<Update/>} />
        <Route path="/create" element={<Create/>} />
      </Routes>
    </Router>
  );
};

export default App;
