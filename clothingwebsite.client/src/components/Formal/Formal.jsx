import React, { useState, useEffect } from "react";
import axios from "axios";
import Filters from "../Filters/Filters"; // Import bộ lọc

const sampleProducts = [
  {
    id: 1,
    name: "Gradient Graphic T-shirt",
    image: "/images/Casual/Gradient T-shirt.png",
    price: 145,
    rating: 4.5
  },
  {
    id: 2,
    name: "Polo with Tipping Details",
    image: "",
    price: 180,
    rating: 4.5
  },
  {
    id: 3,
    name: "Black Striped T-shirt",
    image: "",
    price: 120,
    originalPrice: 150,
    discount: "-20%",
    rating: 4.2
  },
  {
    id: 4,
    name: "Skinny Fit Jeans",
    image: "",
    price: 240,
    originalPrice: 260,
    discount: "-10%",
    rating: 3.5
  },
  {
    id: 5,
    name: "Checkered Shirt",
    image: "",
    price: 180,
    rating: 4.5
  },
  {
    id: 6,
    name: "Sleeve Striped T-shirt",
    image: "",
    price: 130,
    originalPrice: 160,
    discount: "-30%",
    rating: 4.5
  },
  {
    id: 7,
    name: "Vertical Striped Shirt",
    image: "",
    price: 212,
    originalPrice: 232,
    discount: "-8%",
    rating: 4.0
  },
  {
    id: 8,
    name: "Courage Graphic T-shirt",
    image: "",
    price: 145,
    rating: 4.4
  },
  {
    id: 9,
    name: "Loose Fit Bermuda Shorts",
    image: "",
    price: 180,
    rating: 4.3
  }
];

const Formal = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (filters = {}) => {
    try {
      const response = await axios.post("http://localhost:7232/api/SanPham/ApplyFilters", {
        Type: "Formal", // Loại sản phẩm là Formal
        ...filters
      });
      if (response.data?.length > 0) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  };
  const displayedProducts = products.length > 0 ? products : sampleProducts;

  useEffect(() => {
    fetchProducts(); // Lấy sản phẩm mặc định
  }, []);

  return (
    <div className="formal-container">
      <div className="formal-content">
        <div className="filters-column">
          <Filters onApply={fetchProducts} />
        </div>
      <h2 className="page-title">Formal</h2>
      
      {/* Layout 2 cột */}
        {/* Cột phải: Danh sách sản phẩm */}
        <div className="products-column">
          <div className="product-grid">
            {displayedProducts.map((product) => (
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
        </div>
      </div>
  
          {/* Pagination */}
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
