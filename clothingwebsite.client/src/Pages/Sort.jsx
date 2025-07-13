import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Filters from "../components/Filters/Filters";

const API_BASE = "https://localhost:7193";

const Sort = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  // Default filter state
  const [filters, setFilters] = useState({
    maSanPham: "",
    tenSanPham: "",
    maLoai: 0,
    maMau: 0,
    maSize: 0,
    maStyle: 0,
    hinhAnh: "",
    gia: 0,
    soLuong: 0
  });

  // Fetch products with current filters
  const fetchProducts = async (customFilters = filters) => {
    try {
      const payload = { ...filters, ...customFilters };
      console.log("Sending payload:", payload);

      const response = await fetch(`${API_BASE}/api/SanPham/ApplyFilters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API response:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  // Handler for Filters component
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    fetchProducts(newFilters);
  };

  return (
    <div
      style={{
        display: "flex",
        marginTop: "70px",
        marginLeft: "100px",
        marginBottom: "300px",
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          width: "295px",
          border: "1px solid #e6e6e6",
          borderRadius: "15px",
          padding: "10px",
          boxSizing: "border-box",
          alignSelf: "flex-start"
        }}
      >
        <Filters onApply={handleApplyFilters} />
      </div>
      <div style={{ flex: 1, padding: "10px" }}>
        <div className="product-list">
          {products && products.length > 0 ? (
            products.map((product) => (
              <Link
                to={`/product/${product.maSanPham}`}
                key={product.maSanPham}
                className="product-link"
              >
                <div className="product-card">
                  <img
                    src={`${API_BASE}/Images/${product.hinhAnh}?v=${product.maSanPham}`}
                    alt={product.tenSanPham}
                    className="product-image"
                    onError={(e) => { e.target.src = '/fallback-image.jpg'; }}
                  />
                  <p className="product-name">{product.tenSanPham}</p>
                  <div className="product-rating">⭐⭐⭐⭐ 4.5/5</div>
                  <div className="product-price">
                    <span className="price">{product.gia?.toLocaleString() ?? 0}₫</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sort;