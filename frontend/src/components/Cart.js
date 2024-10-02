// src/components/Cart.js
import React from 'react';
import { useCart } from '../contexts/CartContext'; // Adjust the path as necessary

const Cart = () => {
  const { cart, addToCart, removeFromCart, deleteFromCart } = useCart();

  // Calculate the total cost of all items in the cart
  const totalCost = cart.reduce((sum, product) => sum + product.Price * product.Quantity, 0);

  return (
    <div className="container mt-5">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((product) => (
              <li key={product.Id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{product.Name}</h5>
                  <p>Quantity: {product.Quantity}</p>
                  <p>Price: {product.Price} kr</p>
                  <p>Total: {product.Price * product.Quantity} kr</p> {/* Total cost for this product type */}
                </div>
                <div>
                  <button className="btn btn-secondary me-2" onClick={() => removeFromCart(product.Id)}>-</button>
                  <button className="btn btn-secondary me-2" onClick={() => addToCart(product)}>+</button>
                  <button className="btn btn-danger" onClick={() => deleteFromCart(product.Id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total Cost: {totalCost} kr</h3> {/* Total cost of all items in the cart */}
        </>
      )}
    </div>
  );
};

export default Cart;