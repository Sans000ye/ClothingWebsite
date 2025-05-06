import React, { useState } from 'react'; 
import './Header.css';
import "./Menu.css";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

function Header() {
  const [showPromo, setShowPromo] = useState(true);

  const handleClosePromo = () => {
    setShowPromo(false);
  };
  return (
    <div>
      {showPromo && (
        <div className="promo-banner">
          <span className="promo-text">
            Sign up and get 20% off to your first order.
            <Link to="/about" className="promo-link">Sign Up Now</Link>
          </span>
          <button className="promo-close" onClick={handleClosePromo}>&times;</button>
        </div>
      )}
      <nav className="menu">
            <Link to={"/"} className="logo">SHOP.CO</Link>
            <ul className="nav-links">
              <li className="dropdown">
                <Link to="/Sort/shop">Shop ▾</Link>
                <ul className="dropdown-menu">
                  <li><Link to="/Sort/tshirt">T-shirts</Link></li>
                  <li><Link to="/Sort/short">Shorts</Link></li>
                  <li><Link to="/Sort/shirt">Shirts</Link></li>
                  <li><Link to="/Sort/hoodie">Hoodie</Link></li>
                  <li><Link to="/Sort/jean">Jeans</Link></li>
                </ul>
              </li>
              <li><a href="/sale">On Sale</a></li>
              <li><a href="/new-arrivals">New Arrivals</a></li>
            </ul>
            <SearchBar />            
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