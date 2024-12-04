import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/carr.avif";

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://localhost:7087/api/Review");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const handleReservationClick = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/dashboard" : "/login");
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans leading-relaxed">
      {/* Hero Section */}
      <div
        className="relative w-full h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent flex flex-col justify-center items-start px-8 sm:px-16">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-4 shadow-md">
            Welcome to RoadReady
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-4">
            Your trusted car rental service for every journey.
          </p>
          <button
            onClick={handleReservationClick}
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-blue-700 transform transition-all"
          >
            Book Your Reservation
          </button>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          Our Services
        </h2>
        <div className="w-16 h-1 mx-auto bg-blue-600 mb-8"></div>
        <div className="flex flex-wrap justify-center gap-8 px-4">
          {[
            {
              title: "Car Rentals",
              description:
                "Affordable and reliable car rental services tailored to your needs.",
            },
            {
              title: "Flexible Booking",
              description:
                "Book your car with flexible options for pick-up and drop-off locations.",
            },
            {
              title: "24/7 Support",
              description:
                "Get assistance anytime with our 24/7 customer support team.",
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className={`w-80 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg hover:scale-105 transition-transform`}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Customer Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
          {reviews.map((review) => (
            <div
              key={review.reviewId}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                {review.carModel || "General Review"}
              </h4>
              <p className="text-gray-600 italic mb-2">"{review.comments}"</p>
              <p className="text-sm text-gray-500 mb-1">
                Rating: {review.rating} / 5
              </p>
              <p className="text-sm text-gray-400">{review.userName || "Anonymous"}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 text-center">
        <p className="mb-2">© 2024 RoadReady. All rights reserved.</p>
        <p className="mb-2">Contact us: support@roadready.com</p>
        <button
          onClick={() => navigate("/contact")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          Contact Us
        </button>
      </footer>
    </div>
  );
};

export default Home;
