// src/api.js
import axios from 'axios';

const API_BASE = "https://localhost:50922/api";

export const fetchNewArrivals = async () => {
  try {
    const response = await axios.get(`${API_BASE}/QuanAo/ListQuanAo`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gọi API sản phẩm:", error);
    return [];
  }
};

export const fetchProductById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE}/QuanAo/${id}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      return null;
    }
  }