import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // To handle navigation
import "../styles/Register.css"; // Ensure you create appropriate styles
import carImage from "../assets/logincar.png"; // Your car image

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "", // Added phone number
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    // Password matching validation
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Log the form data for debugging
    console.log("Form Data Sent to Backend: ", {
      UserName: formData.username,
      Email: formData.email,
      Password: formData.password,
      PhoneNumber: formData.phoneNumber, // Send phone number
      Role: "User", // Hardcoded role
    });

    try {
      // Make the API call to register the user
      const response = await axios.post("https://localhost:7087/api/Authentication/register", {
        UserName: formData.username,
        Email: formData.email,
        Password: formData.password,
        PhoneNumber: formData.phoneNumber, // Send phone number
        Role: "User", // Hardcoded role
      });

      console.log("Registration Successful: ", response.data);

      // Set success message
      setSuccessMessage("Registration successful! Redirecting to login...");
      setErrorMessage("");

      // Navigate to login page after a delay
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error("Registration Error: ", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "Failed to register. Please try again."
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Registration Form */}
        <div className="register-form-container">
          <h2 className="register-title">Create Your Account</h2>
          <p className="register-subtitle">Join RoadReady and start your journey today!</p>
          <form className="register-form" onSubmit={handleRegister}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            <button type="submit" className="register-btn">Register</button>
          </form>
        </div>

        {/* Car Image */}
        <div className="car-image-container">
          <img src={carImage} alt="Car" className="car-image" />
        </div>
      </div>
    </div>
  );
};

export default Register;
