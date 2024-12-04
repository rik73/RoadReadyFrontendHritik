import React, { useState } from "react";
import carImage from "../assets/carImage.jpg"; // Update with your car image path

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 font-sans">
      <div className="flex flex-col md:flex-row w-[90%] max-w-4xl bg-white p-8 md:p-12 rounded-lg shadow-xl">
        {/* Login Form Section */}
        <div className="md:w-1/2">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Welcome Back!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Log in to access your RoadReady account and manage your reservations.
          </p>
          <form>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 pr-12 mt-2 border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-blue-500 hover:text-blue-700"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold text-lg rounded-full hover:bg-blue-600 transition-transform transform hover:-translate-y-1"
            >
              Log In
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-500 font-semibold hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>

        {/* Car Image Section */}
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <img
            src={carImage}
            alt="Car"
            className="w-4/5 max-h-72 object-cover rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
