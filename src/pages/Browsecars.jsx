import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/browsecars.jpg";

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("https://localhost:7087/api/Car"); // Replace with your actual API URL
        setCars(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError("Failed to load car data. Please try again later.");
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleBookNow = (carName) => {
    setMessage(`You have selected ${carName}. Proceed to booking!`);
    navigate("/bookreservation");
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center text-red-600 mt-8">{error}</div>;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-800"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Navigation Bar */}
      <nav className="bg-blue-600 bg-opacity-90 text-white flex justify-between items-center py-4 px-6 shadow-lg">
        <a href="/dashboard" className="hover:underline font-semibold">
          Previous
        </a>
        <div className="space-x-4">
          <a href="/profilepage" className="hover:underline font-semibold">
            Profile
          </a>
          <a href="#reservations" className="hover:underline font-semibold">
            My Reservations
          </a>
          <a href="/login" className="hover:underline font-semibold">
            Logout
          </a>
        </div>
      </nav>

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-blue-700 mt-8">
        Browse Cars
      </h1>

      {/* Cars Grid */}
      <div className="flex flex-wrap justify-center gap-6 mt-12 px-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white border border-gray-300 rounded-lg shadow-lg w-80 hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {car.carId}. {car.model}
              </h2>
              <h3 className="text-md font-semibold text-gray-600 mb-2">
                {car.make}
              </h3>
              <p className="text-gray-500 mb-4">{car.description}</p>
              <p className="text-lg font-bold text-green-600 mb-4">
                ${car.price}
              </p>
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full"
                onClick={() => handleBookNow(car.model)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Message */}
      {message && (
        <div className="text-center text-green-600 font-semibold mt-8">
          {message}
        </div>
      )}
    </div>
  );
};

export default BrowseCars;
