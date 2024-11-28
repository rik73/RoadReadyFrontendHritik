import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // To handle navigation
import "../styles/Login.css"; // Ensure you create appropriate styles
import carImage from "../assets/logincar.png"; // Your car image

function Login() {
  const [username, setUsername] = useState(""); // Username input
  const [password, setPassword] = useState(""); // Password input
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [passwordVisible, setPasswordVisible] = useState(false); // Password visibility toggle

  const navigate = useNavigate(); // Initialize navigate hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      UserName: username,
      Password: password,
    };

    try {
      const response = await axios.post("https://localhost:7087/api/Authentication/login", loginData);
      localStorage.setItem("token", response.data.token); // Store JWT token
      window.location.href = "/dashboard"; // Redirect to dashboard after successful login
    } catch (error) {
      setErrorMessage("Invalid credentials, please try again.");
    }
  };

  // Toggle the password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Redirect to the registration page
  const redirectToRegister = () => {
    navigate("/register"); // Navigates to the register page
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Login Form */}
        <div className="login-form-container">
          <h2 className="login-title">Login to Your Account</h2>
          <p className="login-subtitle">Welcome back to RoadReady!</p>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group password-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-container">
                <input
                  type={passwordVisible ? "text" : "password"} // Toggle between password and text
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}
                >
                  {/* Eye Icon */}
                  {passwordVisible ? (
                    <i className="fas fa-eye-slash"></i>
                  ) : (
                    <i className="fas fa-eye"></i>
                  )}
                </button>
              </div>
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <button type="submit" className="login-btn">Login</button>
          </form>

          {/* Don't have an account? Link */}
          <div className="no-account">
            <p>
              Don't have an account?{" "}
              <span className="register-link" onClick={redirectToRegister}>
                Sign Up
              </span>
            </p>
          </div>
        </div>

        {/* Car Image */}
        <div className="car-image-container">
          <img src={carImage} alt="Car" className="car-image" />
        </div>
      </div>
    </div>
  );
}

export default Login;
