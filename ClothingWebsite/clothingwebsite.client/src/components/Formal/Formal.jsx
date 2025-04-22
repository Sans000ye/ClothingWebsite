// Formal.js
import React from "react";
import "./Formal.css";

const API_BASE = "http://localhost:5000";

const products = [
  {
    id: 1,
    name: "Classic White Shirt",
    image: `${API_BASE}/images/white-shirt.jpg`,
    price: 210,
    rating: 4.6
  },
  {
    id: 2,
    name: "Slim Fit Formal Pants",
    image: `${API_BASE}/images/formal-pants.jpg`,
    price: 190,
    rating: 4.3
  },
  {
    id: 3,
    name: "Grey Formal Blazer",
    image: `${API_BASE}/images/formal-blazer.jpg`,
    price: 350,
    rating: 4.7
  },
  {
    id: 4,
    name: "Blue Checkered Shirt",
    image: `${API_BASE}/images/formal-check-shirt.jpg`,
    price: 180,
    rating: 4.2
  },
  {
    id: 5,
    name: "Formal Vest",
    image: `${API_BASE}/images/formal-vest.jpg`,
    price: 230,
    rating: 4.4
  },
  {
    id: 6,
    name: "Tie and Shirt Combo",
    image: `${API_BASE}/images/tie-shirt.jpg`,
    price: 200,
    rating: 4.5
  }
];

const Formal = () => {
  return (
    <div className="formal-container">
      <h2 className="page-title">Formal</h2>
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

export default Formal;
