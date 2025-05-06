import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity, size) => {
    // Kiểm tra nếu sản phẩm cùng ID và size đã có trong giỏ hàng
    const existingIndex = cartItems.findIndex(
      item => item.maSanPham === product.maSanPham && item.size === size
    );

    if (existingIndex !== -1) {
      // Tăng số lượng nếu đã có
      const updatedCart = [...cartItems];
      updatedCart[existingIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      // Thêm mới nếu chưa có
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity,
          size,
        },
      ]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.maSanPham === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.maSanPham !== productId)
    );
  };

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    // Các hàm khác như removeFromCart, clearCart nếu bạn cần
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
