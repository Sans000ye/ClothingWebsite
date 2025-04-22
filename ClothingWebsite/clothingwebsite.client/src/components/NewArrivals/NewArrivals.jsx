import React, { useState } from "react";
import "./NewArrivals.css";
import { API_BASE } from "../../config";
import { Link } from 'react-router-dom';



const products = [
  {
    id: 1,
    name: "T-shirt with Tape Details",
    image: `${API_BASE}/images/black-striped.png`,
    price: 120,
    rating: 4.5
  },
  {
    id: 2,
    name: "Skinny Fit Jeans",
    image: `${API_BASE}/images/skinny-jeans.png`,
    price: 240,
    originalPrice: 260,
    discount: "-20%",
    rating: 3.5
  },
  {
    id: 3,
    name: "Checkered Shirt",
    image: `${API_BASE}/images/checkered-shirt.png`,
    price: 180,
    rating: 4.5
  },
  {
    id: 4,
    name: "Sleeve Striped T-shirt",
    image: `${API_BASE}/images/sleeve-striped.png`,
    price: 130,
    originalPrice: 160,
    discount: "-30%",
    rating: 4.5
  },
  {
    id: 5,
    name: "Product 5",
    image: `${API_BASE}/images/product5.jpg`,
    price: 150,
    rating: 4.0
  },
  {
    id: 6,
    name: "Product 6",
    image: `${API_BASE}/images/product6.jpg`,
    price: 200,
    originalPrice: 250,
    discount: "-20%",
    rating: 4.2
  },
  {
    id: 7,
    name: "Product 7",
    image: `${API_BASE}/images/product7.jpg`,
    price: 200,
    originalPrice: 250,
    discount: "-20%",
    rating: 4.2
  },
  {
    id: 8,
    name: "Product 8",
    image: `${API_BASE}/images/product8.png`,
    price: 200,
    originalPrice: 250,
    discount: "-20%",
    rating: 4.2
  },
];

const NewArrivals = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProducts = showAll ? products : products.slice(0, 4);

  return (
    <div className="new-arrivals">
      <h2 className="title">NEW ARRIVALS</h2>
      <div className="product-list">
        {displayedProducts.map((product) => (
        <Link to={`/product/${product.id}`}>
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
        </Link>
        ))}
      </div>
      <button className="view-all" onClick={() => setShowAll(!showAll)}>
        {showAll ? "Show Less" : "View All"}
      </button>
    </div>
  );
};

export default NewArrivals;