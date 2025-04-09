import React, { useState } from "react";
import "./TopSelling.css";
import { createProduct } from "../../Helper/productHelper";
import { API_BASE } from "../../config";

const topSellingProducts = [
  createProduct(1, `${API_BASE}/images/black-striped.png`, "Classic Leather Jacket", 4.7, 300),
  createProduct(2, `${API_BASE}/images/black-striped.png`, "High-Waist Trousers", 4.3, 120, 150, "-20%"),
  createProduct(3, `${API_BASE}/images/black-striped.png`, "Casual Sneakers", 4.6, 90),
  createProduct(4, `${API_BASE}/images/black-striped.png`, "Elegant Blouse", 4.5, 80, 100, "-20%"),
  createProduct(5, `${API_BASE}/images/black-striped.png`, "Sporty Hoodie", 4.4, 70),
  createProduct(6, `${API_BASE}/images/black-striped.png`, "Designer Handbag", 4.8, 250, 300, "-16%"),
  createProduct(7, `${API_BASE}/images/black-striped.png`, "Designer Handbag", 4.8, 250, 300, "-16%"),
  createProduct(8, `${API_BASE}/images/black-striped.png`, "Designer Handbag", 4.8, 250, 300, "-16%"),

];

const TopSelling = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProducts = showAll ? topSellingProducts : topSellingProducts.slice(0, 4);

  return (
    <div className="top-selling">
      <h2 className="top-selling-title">TOP SELLING</h2>
      <div className="top-selling-list">
        {displayedProducts.map((product) => (
          <div key={product.id} className="top-selling-card">
            <img src={product.image} alt={product.name} className="top-selling-image" />
            <p className="top-selling-name">{product.name}</p>
            <div className="top-selling-rating">
              {"⭐".repeat(Math.floor(product.rating))} {product.rating}/5
            </div>
            <div className="top-selling-price">
              <span className="top-selling-current-price">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="top-selling-original-price">${product.originalPrice}</span>
                  <span className="top-selling-discount">{product.discount}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <button className="top-selling-view-all" onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show Less" : "View All"}
      </button>
    </div>
  );
};

export default TopSelling;