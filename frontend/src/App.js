// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Products from './components/Products';
import Cart from './components/Cart';
import { CartProvider } from './contexts/CartContext';
import Login from './components/Login';
import Logout from './components/Logout';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container mt-5">
            <Routes>
              <Route path="/" element={<h1 className="text-center">Welcome to Dagnys Bullar</h1>} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;