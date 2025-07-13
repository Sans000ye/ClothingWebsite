import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Product.css';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://localhost:7193/api/QuanAo/ListQuanAo")
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.find((p) => p.maSanPham.toString() === id);
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedSize(foundProduct.availableSizes?.[0] || '');
        }
      })
      .catch((err) => console.error("Error loading product:", err));
  }, [id]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === 'inc' ? prev + 1 : prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Please select a size.");
    addToCart(product, quantity, selectedSize);
    alert("Added to cart!");
  };

  if (!product) return <div>Loading...</div>;

  // Sử dụng mảng hình ảnh từ product (nếu có)
  const imageList = product.images || [`https://localhost:7193/Images/${product.hinhAnh}`];

  return (
    <div className="product-container">
      <div className="product-images">
        <div className="thumbnail-images">
          {imageList.map((img, idx) => (
            <img
              key={idx}
              src={`${img}?v=${product.maSanPham}`} // Thêm query string để tránh cache
              alt={`Thumbnail ${idx + 1}`}
              onClick={() => document.querySelector('.main-image img').src = `${img}?v=${product.maSanPham}`} // Chuyển đổi hình ảnh chính khi click
            />
          ))}
        </div>
        <div className="main-image">
          <img
            src={`${imageList[0]}?v=${product.maSanPham}`} // Hiển thị ảnh chính
            alt="Main Product"
          />
        </div>
      </div>

      <div className="product-details">
        <h1>{product.tenSanPham}</h1>
        <div className="product-rating">
          <span>⭐️⭐️⭐️⭐️⭐️ {product.rating || '4.5/5'}</span>
        </div>
        <div className="product-price">
          <span className="current-price">{product.gia.toLocaleString()}₫</span>
          {product.giaGoc && (
            <>
              <span className="original-price">{product.giaGoc.toLocaleString()}₫</span>
              <span className="discount">
                -{Math.round(100 - (product.gia / product.giaGoc) * 100)}%
              </span>
            </>
          )}
        </div>
        <p className="product-description">{product.moTa}</p>

        <div className="product-options">
          <div className="sizes">
            <span>Choose Size</span>
            <div className="size-options">
              {(product.availableSizes || ['S', 'M', 'L']).map((size) => (
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
          <button className="cart-button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
