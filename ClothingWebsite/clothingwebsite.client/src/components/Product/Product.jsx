import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // 👈 Lấy ID từ URL
import './Product.css';

const Product = () => {
  const { id } = useParams(); // 👈 /product/:id
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    // Gọi API lấy chi tiết sản phẩm
    fetch(`https://localhost:7193/api/SanPham/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        // Khởi tạo giá trị mặc định
        setSelectedSize(data?.availableSizes?.[0] || '');
        setSelectedColor(data?.availableColors?.[0] || '');
      })
      .catch((err) => console.error('Error loading product:', err));
  }, [id]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === 'inc' ? prev + 1 : prev > 1 ? prev - 1 : 1));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-container">
      <div className="product-images">
        <div className="thumbnail-images">
          {product.images?.map((img, idx) => (
            <img key={idx} src={img} alt={`Thumbnail ${idx + 1}`} />
          ))}
        </div>
        <div className="main-image">
          <img src={product.mainImage || product.images?.[0]} alt="Main Product" />
        </div>
      </div>

      <div className="product-details">
        <h1>{product.name}</h1>
        <div className="product-rating">
          <span>⭐️⭐️⭐️⭐️⭐️ {product.rating || '4.5/5'}</span>
        </div>
        <div className="product-price">
          <span className="current-price">${product.price}</span>
          {product.originalPrice && (
            <>
              <span className="original-price">${product.originalPrice}</span>
              <span className="discount">
                -{Math.round(100 - (product.price / product.originalPrice) * 100)}%
              </span>
            </>
          )}
        </div>
        <p className="product-description">{product.description}</p>

        <div className="product-options">
          <div className="colors">
            <span>Select Colors</span>
            <div className="color-options">
              {product.availableColors?.map((color) => (
                <button
                  key={color}
                  className={selectedColor === color ? 'active' : ''}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="sizes">
            <span>Choose Size</span>
            <div className="size-options">
              {product.availableSizes?.map((size) => (
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
