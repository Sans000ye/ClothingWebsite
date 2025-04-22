// Casual.js
import React from "react";
import "./Casual.css";

const API_BASE = "http://localhost:5000";

const products = [
  {
    id: 1,
    name: "Gradient Graphic T-shirt",
    image: `${API_BASE}/images/gradient-graphic.png`,
    price: 145,
    rating: 4.5
  },
  {
    id: 2,
    name: "Polo with Tipping Details",
    image: `${API_BASE}/images/polo-tipping.png`,
    price: 180,
    rating: 4.5
  },
  {
    id: 3,
    name: "Black Striped T-shirt",
    image: `${API_BASE}/images/black-striped.png`,
    price: 120,
    originalPrice: 150,
    discount: "-20%",
    rating: 4.2
  },
  {
    id: 4,
    name: "Skinny Fit Jeans",
    image: `${API_BASE}/images/skinny-jeans.png`,
    price: 240,
    originalPrice: 260,
    discount: "-10%",
    rating: 3.5
  },
  {
    id: 5,
    name: "Checkered Shirt",
    image: `${API_BASE}/images/checkered-shirt.png`,
    price: 180,
    rating: 4.5
  },
  {
    id: 6,
    name: "Sleeve Striped T-shirt",
    image: `${API_BASE}/images/sleeve-striped.png`,
    price: 130,
    originalPrice: 160,
    discount: "-30%",
    rating: 4.5
  },
  {
    id: 7,
    name: "Vertical Striped Shirt",
    image: `${API_BASE}/images/vertical-striped.png`,
    price: 212,
    originalPrice: 232,
    discount: "-8%",
    rating: 4.0
  },
  {
    id: 8,
    name: "Courage Graphic T-shirt",
    image: `${API_BASE}/images/courage-graphic.png`,
    price: 145,
    rating: 4.4
  },
  {
    id: 9,
    name: "Loose Fit Bermuda Shorts",
    image: `${API_BASE}/images/bermuda-shorts.png`,
    price: 180,
    rating: 4.3
  }
];

const Casual = () => {
  return (
    <div className="casual-container">
      <h2 className="page-title">Casual</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-img" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-rating">{"⭐".repeat(Math.floor(product.rating))} {product.rating}/5</div>
              <div className="product-price">
                <span className="price">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="original-price">${product.originalPrice}</span>
                    <span className="discount">{product.discount}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination buttons */}
      <div className="pagination">
        <button>{"< Previous"}</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>{"Next >"}</button>
      </div>
    </div>
  );
};

export default Casual;
