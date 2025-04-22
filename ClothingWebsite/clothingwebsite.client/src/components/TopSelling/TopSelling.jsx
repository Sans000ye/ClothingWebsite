import React, { useState } from "react";
import "./TopSelling.css";
import { createProduct } from "../../Helper/productHelper";
import { API_BASE } from "../../config";
import { Link } from 'react-router-dom';


const topSellingProducts = [
  createProduct(1, `${API_BASE}/images/tshirt-tape-details.png`, "T-shirt with Tape Details", 4.7, 300),
  createProduct(2, "/images/top2.jpg", "High-Waist Trousers", 4.3, 120, 150, "-20%"),
  createProduct(3, "/images/top3.jpg", "Casual Sneakers", 4.6, 90),
  createProduct(4, "/images/top4.jpg", "Elegant Blouse", 4.5, 80, 100, "-20%"),
  createProduct(5, "/images/top5.jpg", "Sporty Hoodie", 4.4, 70),
  createProduct(6, "/images/top6.jpg", "Designer Handbag", 4.8, 250, 300, "-16%"),
  createProduct(7, "/img/clother/tshirt.jpg", "Designer Handbag", 4.8, 250, 300, "-16%"),
  createProduct(8, "/img/Banner.png", "Designer Handbag", 4.8, 250, 300, "-16%"),

];

const TopSelling = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProducts = showAll ? topSellingProducts : topSellingProducts.slice(0, 4);

  return (
    <div className="top-selling">
      <h2 className="top-selling-title">TOP SELLING</h2>
      <div className="top-selling-list">
        {displayedProducts.map((product) => (
          <Link to={`/product/${product.id}`}>
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
          </Link>
        ))}
      </div>
      <button className="top-selling-view-all" onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show Less" : "View All"}
      </button>
    </div>
  );
};

export default TopSelling;