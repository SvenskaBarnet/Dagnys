import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.Id === product.Id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.Id === product.Id ? { ...item, Quantity: item.Quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, Quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.Id === productId);
      if (existingProduct.Quantity > 1) {
        return prevCart.map((item) =>
          item.Id === productId ? { ...item, Quantity: item.Quantity - 1 } : item
        );
      } else {
        return prevCart.filter((item) => item.Id !== productId);
      }
    });
  };

  const deleteFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.Id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, deleteFromCart }}>
      {children}
    </CartContext.Provider>
  );
};