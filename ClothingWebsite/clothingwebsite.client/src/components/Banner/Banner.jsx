import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-content left-align">
        <div className="banner-text">
          <h1>
            FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
          </h1>
          <p>
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <button className="shop-button">Shop Now</button>
          <div className="banner-stats">
          <div>
            <p className="stat-number">200+</p>
            <p className="stat-text">International Brands</p>
          </div>
          <div className="divider"></div>
          <div>
            <p className="stat-number">2,000+</p>
            <p className="stat-text">High-Quality Products</p>
          </div>
          <div className="divider"></div>
          <div>
            <p className="stat-number">30,000+</p>
            <p className="stat-text">Happy Customers</p>
          </div>
      </div>
        </div>
        <div className="banner-image">
        <img src="/images/banner.png" alt="" />
        </div>
      </div>
   
      <div className="banner-brands">
        <span className="brand-versace">VERSACE</span>
        <span className="brand-zara">ZARA</span>
        <span className="brand-gucci">GUCCI</span>
        <span className="brand-prada">PRADA</span>
        <span className="brand-calvin">Calvin Klein</span>
      </div>
    </div>
  );
};

export default Banner;
