import React from 'react';
import './Header.css';
import "./Menu.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
      <div className="promo-banner">
        <span className="promo-text">
          Sign up and get 20% off to your first order.
          <Link to="/about" className="promo-link">Sign Up Now</Link>
        </span>
        <button className="promo-close">&times;</button>
      </div>
      <nav className="menu">
        <Link to="/" className="logo">SHOP.CO</Link>
        <ul className="nav-links">
          <li className="dropdown">
            {/* Outer link to show all products */}
            <Link to="/Sort" className="dropdown-toggle">Shop ▾</Link>
            <ul className="dropdown-menu">
              <li><Link to="/Sort/T-shirts">T-shirts</Link></li>
              <li><Link to="/Sort/Shorts">Shorts</Link></li>
              <li><Link to="/Sort/shirts">shirts</Link></li>
              <li><Link to="/Sort/Hoodie">Hoodie</Link></li>
              <li><Link to="/Sort/Jeans">Jeans</Link></li>
            </ul>
          </li>
          <li><Link to="/sale">On Sale</Link></li>
          <li><Link to="/new-arrivals">New Arrivals</Link></li>
          <li><Link to="/brands">Brands</Link></li>
        </ul>
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search for products..." />
        </div>
        <div className="icons">
          <Link to="/cart">
            <FaShoppingCart className="icon" />
          </Link>
          <Link to="/about">
            <FaUser className="icon" />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;