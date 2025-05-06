// src/components/NewArrivals/ProductCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./NewArrivals.css";

// const products =  ([
//   {
//     id: 'SP001',
//     name: "Áo Thun Đen",
//     image: "/images/NewArrivals/tshirt-tape-details.png",
//     price: 150000,
//     rating: 4.5
//   },
//   {
//     id: 2,
//     name: "Skinny Fit Jeans",
//     image: "/images/NewArrivals/skinny-jeans.png",
//     price: 240,
//     originalPrice: 260,
//     discount: "-20%",
//     rating: 3.5
//   },
//   {
//     id: 3,
//     name: "Checkered Shirt",
//     image: "/images/NewArrivals/checkered-shirt.png",
//     price: 180,
//     rating: 4.5
//   },
//   {
//     id: 4,
//     name: "Sleeve Striped T-shirt",
//     image: "/images/NewArrivals/sleeve-striped.png",
//     price: 130,
//     originalPrice: 160,
//     discount: "-30%",
//     rating: 4.5
//   },
// ]);

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.MaSanPham}`} key={product.MaSanPham}>
      <div className="product-card">
        <img
          src={`/images/${product.HinhAnh}?v=${product.MaSanPham}`}
          alt={product.TenSanPham}
          className="product-image"
        />
        <p className="product-name">{product.TenSanPham}</p>
        <div className="product-rating">⭐⭐⭐⭐ 4.5/5</div>
        <div className="product-price">
          <span className="price">{product.Gia.toLocaleString()}₫</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
