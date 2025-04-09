import React from 'react';
import './Header.css'; // Đường dẫn tương đối đến tệp CSS
import "./Menu.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
function Header() {
  return (
    <div>
      <div className="promo-banner">
        <span className="promo-text">
          Sign up and get 20% off to your first order.<Link to ="/about" className="promo-link">Sign Up Now</Link>
          
        </span>
        <button className="promo-close">&times;</button>
      </div>
      <nav className="menu">
            <Link to={"/"} className="logo">SHOP.CO</Link>
            <ul className="nav-links">
              <li className="dropdown">
                <a href="/">Shop ▾</a>
                <ul className="dropdown-menu">
                  <li><a href="/me1">T-shirts</a></li>
                  <li><a href="/me2">Shorts</a></li>
                  <li><a href="/me2">shirts</a></li>
                  <li><a href="/me2">Hoodie</a></li>
                  <li><a href="/me2">Jeans</a></li>
                </ul>
              </li>
              <li><a href="/sale">On Sale</a></li>
              <li><a href="/new-arrivals">New Arrivals</a></li>
              <li className="dropdown1">
                <a href="/brands">Brands ▾</a>
                <ul className="dropdown-menu1">
                  <li><a href="/me1">VERSACE</a></li>
                  <li><a href="/me2">ZARA</a></li>
                  <li><a href="/me2">GUCCI</a></li>
                  <li><a href="/me2">PRADA</a></li>
                  <li><a href="/me2">Calvin Klein</a></li>
                </ul>
              </li>
            </ul>
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Search for products..." />
            </div>
            <div className="icons">
                <Link to = "/cart">
                  <FaShoppingCart className="icon" />
                </Link>
                <Link to = "/login">
                  <FaUser className="icon" />
                </Link>
            </div>
          </nav>
        </div>
  );
}

export default Header;