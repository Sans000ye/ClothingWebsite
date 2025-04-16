// Party.js
import React from "react";
import "./Party.css";

const API_BASE = "http://localhost:5000";

const products = [
  {
    id: 1,
    name: "Sequin Party Dress",
    image: `${API_BASE}/images/sequin-dress.jpg`,
    price: 320,
    rating: 4.8
  },
  {
    id: 2,
    name: "Velvet Blazer",
    image: `${API_BASE}/images/velvet-blazer.jpg`,
    price: 290,
    rating: 4.6
  },
  {
    id: 3,
    name: "Lace Evening Gown",
    image: `${API_BASE}/images/evening-gown.jpg`,
    price: 380,
    rating: 4.9
  },
  {
    id: 4,
    name: "Sparkling Skirt",
    image: `${API_BASE}/images/sparkling-skirt.jpg`,
    price: 240,
    rating: 4.4
  },
  {
    id: 5,
    name: "Tuxedo Set",
    image: `${API_BASE}/images/tuxedo.jpg`,
    price: 410,
    rating: 4.7
  },
  {
    id: 6,
    name: "Shiny Button Shirt",
    image: `${API_BASE}/images/shiny-shirt.jpg`,
    price: 215,
    rating: 4.3
  }
];

const Party = () => {
  return (
    <div className="party-container">
      <h2 className="page-title">Party</h2>
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

export default Party;