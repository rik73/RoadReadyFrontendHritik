import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../styles/Home.css"; // Make sure this file exists
import heroImage from "../assets/hero_banner.jpg"; // Add a suitable hero image to assets

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate hook for page navigation

  // Fetch reviews from the backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://localhost:7087/api/Review"); // Replace with your actual API endpoint
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Handle click on Book Your Reservation button
  const handleReservationClick = () => {
    const token = localStorage.getItem("token"); // Check if the user is logged in by checking localStorage for token
    if (token) {
      // If logged in, navigate to the dashboard
      navigate("/dashboard");
    } else {
      // If not logged in, navigate to the login page
      navigate("/login");
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <img src={heroImage} alt="Hero" className="hero-image" />
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to RoadReady</h1>
          <p className="hero-subtitle">
            Your trusted car rental service for every journey.
          </p>
          {/* Book Reservation Button */}
          <button className="book-reservation-btn" onClick={handleReservationClick}>
            Book Your Reservation
          </button>
        </div>
      </div>

      {/* Services Section */}
      <section className="services-section">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Car Rentals</h3>
            <p>Affordable and reliable car rental services tailored to your needs.</p>
          </div>
          <div className="service-card">
            <h3>Flexible Booking</h3>
            <p>Book your car with flexible options for pick-up and drop-off locations.</p>
          </div>
          <div className="service-card">
            <h3>24/7 Support</h3>
            <p>Get assistance anytime with our 24/7 customer support team.</p>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="reviews-section">
        <h2 className="section-title">Customer Reviews</h2>
        <div className="reviews-carousel">
          {reviews.map((review) => (
            <div key={review.reviewId} className="review-card">
              <h4 className="review-title">{review.carModel || "General Review"}</h4>
              <p className="review-body">{review.comments}</p>
              <p className="review-rating">Rating: {review.rating} / 5</p>
              <p className="review-author">- {review.userName || "Anonymous"}</p>
              <p className="review-date">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 RoadReady. All rights reserved.</p>
        <p>Contact us: support@roadready.com</p>
      </footer>
    </div>
  );
};

export default Home;
