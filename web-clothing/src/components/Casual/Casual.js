import React, { useState} from "react";
import axios from "axios";
import Filters from "../Filters/Filters";
import { Link } from "react-router-dom";

const Casual = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (filters = {}) => {
    console.log("📦 Filters gửi lên:", filters); 
  
    try {
      const response = await axios.post("http://localhost:7139/api/SanPham/ApplyFilters", {
        Type: "Casual",
        ...filters,
      });
      setProducts(response.data);
    } catch (error) {
      console.error("❌ Lỗi khi lấy sản phẩm:", error);
      if (error.response) {
        console.error("📨 Response data:", error.response.data);
      }
    }
  };
  

  return (
    <div className="casual-container">
      <h2 className="page-title">Casual</h2>
      <Filters onApply={fetchProducts} />
      <div className="product-grid">
        {products.map((product) => (
          <Link
            to={`/product/${product.MaSanPham}`} // 👈 Điều hướng đến trang chi tiết sản phẩm
            key={product.MaSanPham}
            className="product-card"
          >
            <img src={product.image} alt={product.TenSanPham} className="product-img" />
            <div className="product-info">
              <h3 className="product-name">{product.TenSanPham}</h3>
              <div className="product-rating">
                {"⭐".repeat(Math.floor(product.Rating))} {product.Rating}/5
              </div>
              <div className="product-price">
                <span className="price">{product.Gia} VND</span>
              </div>
            </div>
          </Link>
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

export default Casual;
