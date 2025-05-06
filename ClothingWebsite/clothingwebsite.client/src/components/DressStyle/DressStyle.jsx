import React from "react";
import "./DressStyle.css";
import { Link } from "react-router-dom";

const DressStyle = () => {
  return (
    <div className="dress-style-container">
      <h2 className="dress-style-title">BROWSE BY DRESS STYLE</h2>

    
      <div className="dress-style-row">
          <Link to ="/casual" className="dress-category casual">
            <div>
                <img src="/images/Casual.png" alt="" />
                  <span>Casual</span>
            </div>
          </Link>

          <Link to ="/formal" className="dress-category formal">
            <div>
                <img src= "/images/Formal.png"alt="" />
                  <span>Formal</span>
            </div>
        </Link>
      </div>


      <div className="dress-style-row">
        <Link to ="/party" className="dress-category party">
          <div >
              <img src="/images/Party.png" alt="" />
                <span>Party</span>
          </div>
        </Link>

        <Link to ="/gym" className="dress-category gym">
          <div>
              <img src="/images/Gym.png" alt="" />
                <span>Gym</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DressStyle;
