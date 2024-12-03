import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Reviews.css";
import { jwtDecode } from "jwt-decode";
const ReviewsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [reviews, setReviews] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User is not logged in.");
        }
        // Decode the token to get the userId
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId; //

        const response = await axios.get("https://localhost:7087/api/Reservation", {
          params: { userId:userId }, // Replace with the logged-in user ID or fetch dynamically
        }); // Assuming this endpoint returns reservations for the logged-in user
        setReservations(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reservations:", err);
        setError("Failed to load reservations. Please try again later.");
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleReviewChange = (carId, value) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [carId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = reservations.map((reservation) => ({
        carId: reservation.car.carId,
        review: reviews[reservation.car.carId] || "",
      }));

      const response = await axios.post("https://localhost:7087/api/Review", {
        reviews: reviewData,
      }); // Replace with your actual API endpoint for submitting reviews

      console.log("Submitted Reviews: ", response.data);
      setSubmitted(true);
    } catch (err) {
      console.error("Error submitting reviews:", err);
      alert("Failed to submit reviews. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="reviews-container">
      <nav className="reviews-nav">
        <a href="/dashboard">Home</a>
        <a href="/login">Logout</a>
      </nav>

      <h1 className="reviews-title">Car Reviews</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          {reservations.map((reservation) => (
            <div key={reservation.reservationId} className="review-card">
              {/* <img
                src={reservation.car.image}
                alt={reservation.car.model}
                className="review-image"
              /> */}
              <div className="review-details">
                <h2>{reservation.car.make}</h2>
                <p>
                  <strong>Booking Date:</strong> {reservation.date}
                </p>
                <textarea
                  placeholder={`Write your review for ${reservation.car.model}...`}
                  value={reviews[reservation.car.carId] || ""}
                  onChange={(e) =>
                    handleReviewChange(reservation.car.carId, e.target.value)
                  }
                  required
                />
              </div>
            </div>
          ))}
          <button type="submit" className="submit-button">
            Submit Reviews
          </button>
        </form>
      ) : (
        <div className="thank-you-message">
          <h2>Thank you for your feedback!</h2>
          <p>Your reviews have been submitted successfully.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
