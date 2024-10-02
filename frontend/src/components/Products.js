import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext'; // Adjust the path as necessary

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // Use the useCart hook

  useEffect(() => {
    // Fetch products from your API or define them here
    const fetchProducts = async () => {
      const response = await fetch('https://localhost:7040/api/v1/products'); // Replace with your API endpoint
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {products.map(product => (
          <div key={product.Id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{product.Name}</h5>
                <p className="card-text">{product.Description}</p>
                <p className="card-text"><strong>{product.Price} kr</strong></p>
                <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button> {/* Add to Cart button */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;