import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart(); // Lấy giỏ hàng và các hành động từ CartContext
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (productId, type) => {
    const item = cartItems.find((i) => i.maSanPham === productId);
    if (!item) return;
    const newQuantity = type === 'inc' ? item.quantity + 1 : item.quantity > 1 ? item.quantity - 1 : 1;
    updateQuantity(productId, newQuantity); // Cập nhật số lượng sản phẩm
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId); // Xóa sản phẩm khỏi giỏ hàng
  };

  const handleApplyPromo = () => {
    if (promoCode === 'DISCOUNT20') {
      setDiscount(0.2);
    } else {
      setDiscount(0);
      alert('Invalid promo code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.gia * item.quantity, 0); // Dùng gia để tính tổng
  const discountAmount = subtotal * discount;
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discountAmount + deliveryFee;

  return (
    <div className="cart-container">
      <h1>YOUR CART</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.maSanPham} className="cart-item">
              <div className="cart-details">
                <h3>{item.tenSanPham}</h3> {/* Tên sản phẩm */}
                <p>Size: {item.size}</p>
                <p className="item-price">{item.gia.toLocaleString('vi-VN')}₫</p> {/* Hiển thị giá */}
              </div>
              <div className="cart-actions">
                <button onClick={() => handleQuantityChange(item.maSanPham, 'dec')}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.maSanPham, 'inc')}>+</button>
              </div>
              <button className="remove-item" onClick={() => handleRemoveItem(item.maSanPham)}>🗑️</button>
            </div>
          ))}
        </div>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Subtotal</span>
            <span>{subtotal.toLocaleString('vi-VN')}₫</span>
          </div>
          <div className="summary-item discount">
            <span>Discount ({discount * 100}%)</span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span>Delivery Fee</span>
            <span>{deliveryFee.toLocaleString('vi-VN')}₫</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>{total.toLocaleString('vi-VN')}₫</span>
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
