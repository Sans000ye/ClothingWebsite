import React, { useState } from 'react';
// import pancakes from "./img/pancakes";
import './Cart.css';

const Cart = () => {
  const initialItems = [
    { id: 'item1', name: 'Gradient Graphic T-shirt', size: 'Large', color: 'White', price: 145, quantity: 1 },
    { id: 'item2', name: 'Checkered Shirt', size: 'Medium', color: 'Red', price: 180, quantity: 1 },
    { id: 'item3', name: 'Skinny Fit Jeans', size: 'Large', color: 'Blue', price: 240, quantity: 1 },
  ];

  const [cartItems, setCartItems] = useState(initialItems);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (itemId, type) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: type === 'inc' ? item.quantity + 1 : item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleApplyPromo = () => {
    if (promoCode === 'DISCOUNT20') {
      setDiscount(0.2);
    } else {
      setDiscount(0);
      alert('Invalid promo code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = subtotal * discount;
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discountAmount + deliveryFee;

  return (
    
    <div className="cart-container">
      <h1>YOUR CART</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              {/* <img src={pancakes} alt={item.name} className="cart-image" /> */}
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Size: {item.size}</p>
                <p>Color: {item.color}</p>
                <p className="item-price">${item.price}</p>
              </div>
              <div className="cart-actions">
                <button onClick={() => handleQuantityChange(item.id, 'dec')}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, 'inc')}>+</button>
              </div>
              <button className="remove-item" onClick={() => handleRemoveItem(item.id)}>🗑️</button>
            </div>
          ))}
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="summary-item discount">
            <span>Discount ({discount * 100}%)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Delivery Fee</span>
            <span>${deliveryFee}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="promo-code">
            <input
              type="text"
              placeholder="Add promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={handleApplyPromo}>Apply</button>
          </div>
          <button className="checkout-button" disabled={cartItems.length === 0}>
            Go to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;