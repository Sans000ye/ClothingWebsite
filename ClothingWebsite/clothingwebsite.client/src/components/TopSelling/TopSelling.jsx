import React, { useState, useEffect } from "react";
import "./TopSelling.css";
import { API_BASE } from "../../config";
import { Link } from 'react-router-dom';

const TopSelling = () => {
  const [products, setProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const displayedProducts = showAll ? products : products.slice(0, 4);

  useEffect(() => {
    fetch("https://localhost:7193/api/QuanAo/ListQuanAoByLoai?loai=2")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching top-selling products:", error));
  }, []);

  return (
    <div className="top-selling">
      <h2 className="top-selling-title">TOP SELLING</h2>
      <div className="top-selling-list">
        {displayedProducts.map((product) => (
          <Link to={`/product/${product.maSanPham}`} key={product.maSanPham}>
            <div className="top-selling-card">
              <img
                src={`${API_BASE}/Images/${product.hinhAnh}?v=${product.maSanPham}`}
                alt={product.tenSanPham}
                className="top-selling-image"
              />
              <p className="top-selling-name">{product.tenSanPham}</p>
              {/* Tạm thời không có rating thực, bạn có thể tính rating nếu có trường đó */}
              <div className="top-selling-rating">⭐⭐⭐⭐ 4.5/5</div>
              <div className="top-selling-price">
                <span className="top-selling-current-price">{product.gia.toLocaleString()}₫</span>
                {/* Nếu có giá gốc, hiển thị thêm */}
                {product.giaGoc && (
                  <>
                    <span className="top-selling-original-price">{product.giaGoc.toLocaleString()}₫</span>
                    <span className="top-selling-discount">
                      {`-${Math.round(((product.giaGoc - product.gia) / product.giaGoc) * 100)}%`}
                    </span>
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
