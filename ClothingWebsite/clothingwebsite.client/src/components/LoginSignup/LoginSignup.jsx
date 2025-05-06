import React, { useState } from "react";
import "./LoginSignup.css";

const Login_Signup = () => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="pageBackground">
      <div className="authContainer">
        <div className="authBox">
          <h2>{isSignup ? "Đăng Ký" : "Đăng Nhập"}</h2>
          <form>
            {isSignup && (
              <input
                type="text"
                placeholder="Họ và tên"
                required
                className="inputField"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              required
              className="inputField"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="inputField"
            />
            {isSignup && (
              <input
                type="password"
                placeholder="Confirm Password"
                required
                className="inputField"
              />
            )}
            <button type="submit" className="authButton">
              {isSignup ? "Đăng Ký" : "Đăng Nhập"}
            </button>
          </form>
          <p className="toggleText" onClick={toggleAuthMode}>
            {isSignup
              ? "Bạn đã có tài khoản rồi? Đăng nhập thôi"
              : "Bạn chưa có tài khoản? Đăng ký ở đây"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login_Signup;
