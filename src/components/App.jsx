import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import BookList from './booklist';

import Categories from './category';

import Navbar from './navbar';

import './App.css';

const App = () => (
  <div className="container">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<BookList />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Router>
  </div>

);

export default App;
