import React, { useState } from 'react';
import pancakes from '../img/pancakes.png';

import './Product.css';

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Large');
  const [selectedColor, setSelectedColor] = useState('brown');

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === 'inc' ? prev + 1 : prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="product-container">
      <div className="product-images">
        <div className="thumbnail-images">
          <img src={pancakes} alt="Thumbnail 1" />
          <img src={pancakes} alt="Thumbnail 2" />
          <img src={pancakes} alt="Thumbnail 3" />
        </div>
        <div className="main-image">
          <img src={pancakes} alt="Main Product" />
        </div>
      </div>

      <div className="product-details">
        <h1>ONE LIFE GRAPHIC T-SHIRT</h1>
        <div className="product-rating">
          <span>⭐️⭐️⭐️⭐️⭐️ 4.5/5</span>
        </div>
        <div className="product-price">
          <span className="current-price">$260</span>
          <span className="original-price">$300</span>
          <span className="discount">-40%</span>
        </div>
        <p className="product-description">
          This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
        </p>

        <div className="product-options">
          <div className="colors">
            <span>Select Colors</span>
            <div className="color-options">
              <button className={selectedColor === 'brown' ? 'active' : ''} onClick={() => setSelectedColor('brown')}></button>
              <button className={selectedColor === 'green' ? 'active' : ''} onClick={() => setSelectedColor('green')}></button>
              <button className={selectedColor === 'navy' ? 'active' : ''} onClick={() => setSelectedColor('navy')}></button>
            </div>
          </div>

          <div className="sizes">
            <span>Choose Size</span>
            <div className="size-options">
              {['Small', 'Medium', 'Large', 'X-Large'].map((size) => (
                <button
                  key={size}
                  className={selectedSize === size ? 'active' : ''}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="add-to-cart">
          <div className="quantity-selector">
            <button onClick={() => handleQuantityChange('dec')}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange('inc')}>+</button>
          </div>
          <button className="cart-button">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
