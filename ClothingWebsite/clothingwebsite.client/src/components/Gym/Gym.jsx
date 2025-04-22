// Gym.js
import React from "react";
import "./Gym.css";

const API_BASE = "http://localhost:5000";

const products = [
  {
    id: 1,
    name: "Performance Tank Top",
    image: `${API_BASE}/images/gym-tank-top.jpg`,
    price: 150,
    rating: 4.5
  },
  {
    id: 2,
    name: "Compression Leggings",
    image: `${API_BASE}/images/compression-leggings.jpg`,
    price: 180,
    rating: 4.6
  },
  {
    id: 3,
    name: "Gym Shorts",
    image: `${API_BASE}/images/gym-shorts.jpg`,
    price: 130,
    rating: 4.2
  },
  {
    id: 4,
    name: "Breathable Hoodie",
    image: `${API_BASE}/images/breathable-hoodie.jpg`,
    price: 210,
    rating: 4.4
  },
  {
    id: 5,
    name: "Workout Set",
    image: `${API_BASE}/images/workout-set.jpg`,
    price: 250,
    rating: 4.7
  },
  {
    id: 6,
    name: "Athletic T-Shirt",
    image: `${API_BASE}/images/athletic-tshirt.jpg`,
    price: 140,
    rating: 4.3
  }
];

const Gym = () => {
  return (
    <div className="gym-container">
      <h2 className="page-title">Gym</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-img" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-rating">{"⭐".repeat(Math.floor(product.rating))} {product.rating}/5</div>
              <div className="product-price">
                <span className="price">${product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
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

export default Gym;
