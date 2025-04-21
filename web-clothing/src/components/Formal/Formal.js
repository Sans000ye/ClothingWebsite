import React, { useState, useEffect } from "react";
import axios from "axios";
import Filters from "../Filters/Filters"; // Import bộ lọc
const API_BASE = "http://localhost:5000";

const Formal = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (filters = {}) => {
    try {
      const response = await axios.post("http://localhost:7232/api/SanPham/ApplyFilters", {
        Type: "Formal", // Loại sản phẩm là Formal
        ...filters
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Lấy sản phẩm mặc định
  }, []);

  return (
    <div className="formal-container">
      <h2 className="page-title">Formal</h2>
      <Filters onApply={fetchProducts} /> {/* Gọi bộ lọc */}
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.MaSanPham} className="product-card">
            <img src={`${API_BASE}/${product.HinhAnh}`} alt={product.TenSanPham} className="product-img" />
            <div className="product-info">
              <h3 className="product-name">{product.TenSanPham}</h3>
              <div className="product-rating">{"⭐".repeat(Math.floor(product.Rating))} {product.Rating}/5</div>
              <div className="product-price">
                <span className="price">{product.Gia} VND</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Formal;
