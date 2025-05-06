import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Filters from "../components/Filters/Filters";
import Product from "../components/Product/Product";

const API_URL = "https://localhost:7193";

const Sort = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const hasFetched = useRef(false);

  const fetchProducts = async (filters = {}) => {
    try {
      const defaultFilter = {
        Type: category && category.toLowerCase() !== "shop" ? category : null,
        PriceRange: [0, 300],
        Style: null,
        Size: null,
        Color: null,
        ...filters
      };

      // Do NOT filter out nulls, always send all properties
      const payload = defaultFilter;

      console.log("Sending payload:", payload);

      const response = await fetch(`${API_URL}/api/SanPham/ApplyFilters`, {
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
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchProducts();
      hasFetched.current = true;
    }
  }, [category]);

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
          border: "1px solid black",
          borderRadius: "15px",
          padding: "10px",
          boxSizing: "border-box"
        }}
      >
        <Filters onApply={fetchProducts} />
      </div>
      <div style={{ flex: 1, padding: "10px" }}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <Product key={product.MaSanPham} product={product} />
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Sort;
