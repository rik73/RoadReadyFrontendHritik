import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Payment.css";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { reservationId, car, pickupDate, dropoffDate, totalAmount } = state || {};
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const handlePayment = async () => {
    if (!reservationId) {
      alert("Invalid reservation details.");
      return;
    }

    const paymentData = {
      reservationId,
      paymentMethod,
      amount: totalAmount,
    };

    try {
      const response = await axios.post(
        "https://localhost:7087/api/Payment", 
        paymentData
      );
      alert(`Payment Successful: ${response.data.message}`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error processing payment:", err);
      alert("Failed to process payment. Please try again.");
    }
  };

  return (
    <div className="payment-page-container">
      <h1>Payment Details</h1>
      <div className="booking-summary">
        <p>
          <strong>Car:</strong> {car.model}
        </p>
        <p>
          <strong>Pick-Up Date:</strong> {pickupDate}
        </p>
        <p>
          <strong>Drop-Off Date:</strong> {dropoffDate}
        </p>
        <p>
          <strong>Total Amount:</strong> ${totalAmount}
        </p>
      </div>
      <div className="payment-method">
        <label htmlFor="payment-method">Select Payment Method:</label>
        <select
          id="payment-method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>
      <button onClick={handlePayment}>Make Payment</button>
    </div>
  );
};

export default PaymentPage;
