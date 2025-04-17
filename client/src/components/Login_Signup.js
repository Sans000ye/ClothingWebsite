import React, { useState } from "react";
import axios from "axios";
import "./Login_Signup.css";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    try {
      const url = isSignup 
        ? "https://localhost:7056/api/auth/register" 
        : "https://localhost:7056/api/auth/login";

      const { data } = await axios.post(url, formData);
      console.log(data);
      alert(isSignup ? "Đăng ký thành công!" : "Đăng nhập thành công!");
      
    } catch (error) {
      alert(error.response?.data?.message || "Có lỗi xảy ra");
    }
  };

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isSignup ? "Đăng Ký" : "Đăng Nhập"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            onChange={handleChange}
            required
          />
          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              onChange={handleChange}
              required
            />
          )}
          <button type="submit" className="auth-button">
            {isSignup ? "Đăng Ký" : "Đăng Nhập"}
          </button>
        </form>
        <p className="toggle-text" onClick={toggleAuthMode}>
          {isSignup
            ? "Bạn đã có tài khoản? Đăng nhập"
            : "Chưa có tài khoản? Đăng ký"}
        </p>
      </div>
    </div>
  );
};

export default Auth;