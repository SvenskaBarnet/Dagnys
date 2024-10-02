import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // Adjust the path as necessary
import { getToken } from '../utils/auth'; // Adjust the path as necessary

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cart } = useCart(); // Use the useCart hook to access the cart

  // Function to check if the user is logged in
  const checkLoginStatus = () => {
    const token = getToken();
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkLoginStatus();

    const handleTokenChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('tokenChanged', handleTokenChange);

    return () => {
      window.removeEventListener('tokenChanged', handleTokenChange);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Dagnys</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/products">Products</Link>
          </li>
        </ul>
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              Cart ({cart.length}) {/* Display the number of items in the cart */}
            </Link>
          </li>
          {!isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link text-danger" to="/logout">Log Out</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;