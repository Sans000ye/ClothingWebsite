import React, { useState, useEffect } from "react";
import "./NewArrivals.css";
import { API_BASE } from "../../config";
import { Link } from 'react-router-dom';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll ? products : products.slice(0, 4);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://localhost:7193/api/QuanAo/ListQuanAoByLoai?loai=2");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="new-arrivals">
      <h2 className="title">NEW ARRIVALS</h2>
      <div className="product-list">
        {displayedProducts.map((product) => (
          <Link to={`/product/${product.maSanPham}`} key={product.maSanPham} className="product-link">
            <div className="product-card">
              <img
                src={`${API_BASE}/Images/${product.hinhAnh}?v=${product.maSanPham}`} // <-- chỉ lấy từ database, không nối thêm gì
                alt={product.tenSanPham}
                className="product-image"
                onError={(e) => { e.target.src = '/fallback-image.jpg'; }} // fallback nếu lỗi ảnh
              />
              <p className="product-name">{product.tenSanPham}</p>
              <div className="product-rating">⭐⭐⭐⭐ 4.5/5</div>
              <div className="product-price">
                <span className="price">{product.gia?.toLocaleString() ?? 0}₫</span>
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
