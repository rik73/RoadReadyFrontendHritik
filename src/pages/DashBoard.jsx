import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CarService from '../services/CarService.js';
import ReservationService from '../services/ReservationService.js';
import ReviewService from '../services/ReviewService.js';
import PaymentService from '../services/PaymentService.js';
import '../styles/DashBoard.css';
import carImage from "../assets/Cardashboard.jpg";
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [cars, setCars] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [payments, setPayments] = useState([]);
  const [showAllCars, setShowAllCars] = useState(false); 
  const navigate = useNavigate(); 

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(prevState => !prevState);  // Toggle the sidebar visibility state
  };
  
  

  useEffect(() => {
    // Fetch user data from localStorage or context (mocked in this case)
    const loggedInUser = localStorage.getItem("token"); // Get user from localStorage (if available)

    if (!loggedInUser) {
      // Redirect to login page if the user is not logged in
      navigate('/login');
    } else {
      setUser(loggedInUser);
      // Fetching the user-specific data like cars, reservations, reviews, and payments
      CarService.getCars().then(setCars);

    }
  }, [navigate]);

  const handleToggleCars = () => {
    setShowAllCars((prevState) => !prevState); // Toggle visibility of cars
    if (!showAllCars) {
      // Fetch cars only when showing them
      CarService.getCars().then(fetchedCars => {
        setCars(fetchedCars); // Fetch and display cars
      });    }
  };

  return (
    <div className="dashboard">
      <img src={carImage} alt="Car" className="car-image" />
      <button className="hamburger" onClick={toggleSidebar}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>Home</li>
          <li>Cars</li>
          <li>Reservations</li>
          <li>Payments</li>
          <li>Reviews</li>
        </ul>
      </div>
    

      <div className="content">
        <header>
          
          <h1>Welcome to Car Rental System!</h1>
          
        </header>

        <section className="cars">
          <h2>Available Cars</h2>
          <button className='view-all-cars' onClick={handleToggleCars}>
            {showAllCars ? 'Hide Cars' : 'Show All Cars'} {/* Toggle button text */}
          </button>

          {showAllCars && cars.length > 0 && (
            <div className="car-grid">
              {cars.map((car) => (
                <div key={car.id} className="car-card">
                  <h3>{car.carId}.{car.model} ({car.year})</h3>
                  {/* <img src={car.imageUrl1} alt={`${car.model} image 1`} />
                  <img src={car.imageUrl2} alt={`${car.model} image 2`} />
                  {car.imageUrl3 && <img src={car.imageUrl3} alt={`${car.model} image 3`} />} */}
                  <p>{car.make}</p>
                </div>
              ))}
            </div>
          )}

          {showAllCars && cars.length === 0 && <p>No cars available.</p>}
        </section>

        <section className="reservations">
          <h2>Your Reservations</h2>
          {reservations.length === 0 ? (
            <p>No reservations found.</p>
          ) : (
            <ul>
              {reservations.map((reservation) => (
                <li key={reservation.id}>
                  {reservation.carModel} from {reservation.pickupDate} to {reservation.dropoffDate}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="reviews">
          <h2>Your Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews found.</p>
          ) : (
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>{review.text}</li>
              ))}
            </ul>
          )}
        </section>

        <section className="payments">
          <h2>Your Payments</h2>
          {payments.length === 0 ? (
            <p>No payments found.</p>
          ) : (
            <ul>
              {payments.map((payment) => (
                <li key={payment.id}>Amount: ${payment.amount}, Date: {payment.date}</li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
