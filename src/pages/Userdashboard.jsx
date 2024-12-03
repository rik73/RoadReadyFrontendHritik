import React, { useState, useEffect } from "react";
import CarService from '../services/CarService.js';
import ReservationService from '../services/ReservationService.js';
import ReviewService from '../services/ReviewService.js';
import PaymentService from '../services/PaymentService.js';
import UserService from '../services/UserService.js'
import "../styles/Userdash.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    // const [cars, setCars] = useState([]);
    // const [reservations, setReservations] = useState([]);
    // const [reviews, setReviews] = useState([]);
    // const [payments, setPayments] = useState([]);

    

    useEffect(() => {
        // Fetch user data from localStorage or context (mocked in this case)
        const loggedInUser = localStorage.getItem("token"); // Get user from localStorage (if available)
    
        if (!loggedInUser) {
          // Redirect to login page if the user is not logged in
          navigate('/login');
        } else {
          setUser(loggedInUser);
          // Fetching the user-specific data like cars, reservations, reviews, and payments
        //   CarService.getCars().then(fetchedCars => {setCars(fetchedCars);});
        //   UserService.getUserById().then(fetchedUser => {setUser(fetchedUser);});
        //   UserService.updateUser().then(updatedUser => {setUser(updatedUser)});
        //   ReservationService.addReservation().then(addReser => {setReservations(addReser)});
        //   ReservationService.getReservationById().then(fetchedCars => {setCars(fetchedCars);});
        //   PaymentService.addPayment().then(setPayments);
        //   PaymentService.getPaymentById().then(fetchedCars => {setCars(fetchedCars);});
        //   ReviewService.addReview().then(setReviews);
        //   ReviewService.getReviewById().then(setReviews);

        }
      }, [navigate]);

const handleBrowseCarClick = () => {
    const token = localStorage.getItem("token"); // Check if the user is logged in by checking localStorage for token
    if (token) {
      // If logged in, navigate to the dashboard
      navigate("/browsecar");
    } else {
      // If not logged in, navigate to the login page
      navigate("/login");
    }
    }
  
    const handleProfilePageClick = () => {
        const token = localStorage.getItem("token"); // Check if the user is logged in by checking localStorage for token
        if (token) {
          // If logged in, navigate to the dashboard
          navigate("/profilepage");
        } else {
          // If not logged in, navigate to the login page
          navigate("/login");
        }
        }
        const handleBookReservationClick = () => {
            const token = localStorage.getItem("token"); // Check if the user is logged in by checking localStorage for token
            if (token) {
              // If logged in, navigate to the dashboard
              navigate("/bookreservation");
            } else {
              // If not logged in, navigate to the login page
              navigate("/login");
            }
            }
            const handleReviewsClick = () => {
                const token = localStorage.getItem("token"); // Check if the user is logged in by checking localStorage for token
                if (token) {
                  // If logged in, navigate to the dashboard
                  navigate("/reviews");
                } else {
                  // If not logged in, navigate to the login page
                  navigate("/login");
                }
                }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to RoadReady</h1>
        <nav className="dashboard-nav">
          <a href="/profilepage">Profile</a>
          <a href="/browsecar">Browse Cars</a>
          <a href="/login">Logout</a>
        </nav>
      </header>
      <main className="dashboard-main">
        <section className="welcome-section">
          <h2>Hello Dear User</h2>
          <p>Explore your favourite cars and Rent them at affordable prices !!!!</p>
        </section>
        <section className="actions-section">
          <div className="action-card">
            <h3>Book Reservations</h3>
            <p>Make a booking for you trip.</p>
            <button onClick = {handleBookReservationClick}>Go to Reservations</button>
          </div>
          <div className="action-card">
            <h3>Browse Cars</h3>
            <p>Explore available cars for your next trip.</p>
            <button onClick={handleBrowseCarClick}>Browse Cars</button>
          </div>
          <div className="action-card">
            <h3>Edit Profile</h3>
            <p>Update your personal information and payment methods.</p>
            <button onClick = {handleProfilePageClick}>Edit Profile</button>
          </div>
          <div className="action-card">
            <h3>Provide Reviews</h3>
            <p>Give ratings to our Service.</p>
            <button onClick = {handleReviewsClick}>Reviews</button>
          </div>
        </section>
      </main>
      <footer className="dashboard-footer">
        <p>© 2024 RoadReady. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserDashboard;
