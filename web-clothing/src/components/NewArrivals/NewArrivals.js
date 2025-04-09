import React, { useState } from "react";
import "./NewArrivals.css";
import { createProduct } from "../../Helper/productHelper";
import { API_BASE } from "../../config";

const products = [
  createProduct(1, `${API_BASE}/images/black-striped.png`, "T-shirt with Tape Details", 4.5, 120),
  createProduct(2, `${API_BASE}/images/skinny-jeans.png`, "Skinny Fit Jeans", 3.5, 240, 260, "-20%"),
  createProduct(3, `${API_BASE}/images/checkered-shirt.png`, "Checkered Shirt", 4.5, 180),
  createProduct(4, `${API_BASE}/images/sleeve-striped.png`, "Sleeve Striped T-shirt", 4.5, 130, 160, "-30%"),
  createProduct(5, `${API_BASE}/images/checkered-shirt.png`, "Product 5", 4.0, 150),
  createProduct(6, `${API_BASE}/images/checkered-shirt.png`, "Product 6", 4.2, 200, 250, "-20%"),
  createProduct(7, `${API_BASE}/images/checkered-shirt.png`, "Product 7", 4.2, 200, 250, "-20%"),
  createProduct(8, `${API_BASE}/images/checkered-shirt.png`, "Product 8", 4.2, 200, 250, "-20%"),
  createProduct(9, `${API_BASE}/images/checkered-shirt.png`, "Product 8", 4.2, 200, 250, "-20%"),

];

const NewArrivals = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProducts = showAll ? products : products.slice(0, 4);

  return (
    <div className="new-arrivals">
      <h2 className="title">NEW ARRIVALS</h2>
      <div className="product-list">
        {displayedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <p className="product-name">{product.name}</p>
            <div className="product-rating">
              {"⭐".repeat(Math.floor(product.rating))} {product.rating}/5
            </div>
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
        ))}
      </div>
      <button className="view-all" onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show Less" : "View All"}
      </button>
    </div>
  );
};

export default NewArrivals;