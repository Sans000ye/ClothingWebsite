import React, { useState } from "react";
import "./LoginSignup.css";

function LoginSignup () {
  const [isSignup, setIsSignup] = useState(false);

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isSignup ? "Đăng Ký" : "Đăng Nhập"}</h2>
        <form>
          {isSignup && <input type="text" placeholder="Họ và tên" required />}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          {isSignup && <input type="password" placeholder="Confirm Password" required />}
          <button type="submit" className="auth-button">{isSignup ? "Đăng Ký" : "Đăng Nhập"}</button>
        </form>
        <p className="toggle-text" onClick={toggleAuthMode}>
          {isSignup ? "Bạn đã có tài khoản rồi? Đăng nhập thôi" : "Bạn chưa có tài khoản? Đăng ký ở đây"}
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
