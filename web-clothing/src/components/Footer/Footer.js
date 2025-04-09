import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="newsletter">
        <h2>STAY UP TO DATE ABOUT<br></br> OUR LATEST OFFERS</h2>
        <div className="newsletter-input">
          <input type="email" placeholder="Enter your email address" />
          <button>Subscribe to Newsletter</button>
        </div>
      </div>
      <div className="footer-content">
        <div className="footer-section">
          <h1>SHOP.CO</h1>
          <p>We have clothes that suit your style and<br></br> which you’re proud to wear. From<br></br> women to men.</p>
          <div className="social-icons">
            <FaTwitter className="icon" />
            <FaFacebookF className="icon" />
            <FaInstagram className="icon" />
            <FaGithub className="icon" />
          </div>
        </div>
        <div className="footer-section">
          <h3>COMPANY</h3>
          <ul>
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>HELP</h3>
          <ul>
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>FAQ</h3>
          <ul>
            <li>Account</li>
            <li>Manage Deliveries</li>
            <li>Orders</li>
            <li>Payments</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>RESOURCES</h3>
          <ul>
            <li>Free eBooks</li>
            <li>Development Tutorial</li>
            <li>How to - Blog</li>
            <li>Youtube Playlist</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Shop.co © 2000-2023, All Rights Reserved</p>
        <div className="payment-icons">
          <img src="./img/visa.png" alt="Visa" />
          <img src="./img/mastercard.png" alt="MasterCard" />
          <img src="./img/Paypal.png" alt="PayPal" />
          <img src="./img/Apple_Pay.png" alt="Apple Pay" />
          <img src="./img/Google_Pay.png" alt="Google Pay" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
