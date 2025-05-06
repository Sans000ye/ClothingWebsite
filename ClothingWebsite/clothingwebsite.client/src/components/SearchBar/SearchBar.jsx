import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './SearchBar.css'; // optional CSS riêng

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-bar')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (searchTerm.length > 2) {
      setLoading(true);
      setIsDropdownOpen(true); // Mở dropdown khi có kết quả tìm kiếm
      try {
        const response = await fetch(`https://localhost:7193/api/TKSanPham/search?keyword=${searchTerm}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        } else {
          console.error("API không thành công.");
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
      setIsDropdownOpen(false); // Đóng dropdown nếu không có kết quả
    }
  };

  return (
    <div className={`search-bar ${isDropdownOpen ? 'open' : ''}`}>
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={handleSearch}
      />
      {loading && <div className="search-loading">Đang tìm...</div>}
      {results.length > 0 && (
        <div className="search-results">
          {results.map((item) => (
            <Link
              to={`/product/${item.maSanPham}`}
              key={item.maSanPham}
              className="search-result-item"
              onClick={() => setResults([])} // Ẩn kết quả khi click
            >
              {item.tenSanPham}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
