import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ProfilePage.css";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User is not logged in.");
        }
        // Decode the token to get the userId
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId; // Adjust this key based on your token structure

        const userResponse = await axios.get(`http://localhost:7087/api/User/${userId}`);
        setUser(userResponse.data);
        setUpdatedUser(userResponse.data);

        // Fetch reservations specific to the user
        const reservationsResponse = await axios.get(`https://localhost:7087/api/Reservation`, {
          params: { userId },
        });
        setReservations(reservationsResponse.data);

        // Fetch payments specific to the user
        const paymentsResponse = await axios.get(`https://localhost:7087/api/Payment`, {
          params: { userId },
        });
        setPayments(paymentsResponse.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile data. Please try again later.");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put("https://localhost:7087/api/User", updatedUser); // API to update user profile
      setUser(updatedUser);
      setEditMode(false);
      alert("Profile updated successfully.");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-container">
      <nav className="profile-nav">
        <a href="/dashboard">Previous</a>
        <a href="/login">Logout</a>
      </nav>

      <h1 className="profile-title">My Profile</h1>
      <div className="profile-section">
        <h2>Personal Information</h2>
        {editMode ? (
          <div className="profile-edit-form">
            <input
              type="text"
              name="firstName"
              value={updatedUser.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={updatedUser.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="tel"
              name="phone"
              value={updatedUser.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        ) : (
          <div className="profile-info">
            <p>
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phoneNumber}
            </p>
            <button onClick={() => setEditMode(true)}>Edit Information</button>
          </div>
        )}
      </div>
      <div className="profile-section">
        <h2>Reservation History</h2>
        <table className="profile-table">
          <thead>
            <tr>
              <th>Car</th>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.reservationId}>
                {/* <td>{reservation.carName}</td> */}
                <td>{reservation.pickupDate}</td>
                <td>{reservation.dropoffDate}</td>
                <td>{reservation.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="profile-section">
        <h2>Payment History</h2>
        <table className="profile-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.paymentId}>
                <td>{payment.amount}</td>
                <td>{payment.paymentDate}</td>
                <td>{payment.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;
