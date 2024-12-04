import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/image2.jpg";

const BookReservations = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("https://localhost:7087/api/Car");
        setCars(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load car data. Please try again later.");
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleBookNow = (car) => {
    setSelectedCar(car);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = calculateTotal();
    const reservationData = {
      carId: selectedCar.carId,
      userId: 1, // Replace with the logged-in user's ID
      pickupDate,
      dropoffDate,
      totalAmount,
    };

    try {
      const response = await axios.post(
        "https://localhost:7087/api/Reservation",
        reservationData
      );
      navigate("/payment", {
        state: {
          reservationId: response.data.reservationId,
          car: selectedCar,
          pickupDate,
          dropoffDate,
          totalAmount,
        },
      });
      alert(`Booking confirmed: ${response.data.message}`);
    } catch (err) {
      alert("Failed to create reservation. Please try again later.");
    }

    setSelectedCar(null);
    setPickupDate("");
    setDropoffDate("");
  };

  const calculateTotal = () => {
    if (!selectedCar || !pickupDate || !dropoffDate) return 0;
    const pickup = new Date(pickupDate);
    const dropoff = new Date(dropoffDate);
    const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));
    return days > 0 ? days * selectedCar.pricePerDay : 0;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <nav className="relative z-10 bg-blue-600 text-white py-4 px-6 flex justify-between">
        <a href="/dashboard" className="font-semibold hover:underline">
          Home
        </a>
        <a href="/login" className="font-semibold hover:underline">
          Logout
        </a>
      </nav>

      <h1 className="relative z-10 text-5xl text-center text-white font-bold mt-8">
        Book Your Favorite Car
      </h1>

      <div className="relative z-10 flex flex-wrap justify-center gap-8 mt-12 px-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white border-2 border-blue-500 p-6 rounded-lg shadow-xl w-80 transform hover:scale-105 transition"
          >
            <img
              src={car.image || "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c51905b0000b639a185eeb080dd879bf007f5604/photos/3yAdBvJw-XFZanOvN4W-(edit).jpg?t=167160626359"}
              alt={car.model}
              className="h-48 w-full object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2 text-center">
              {car.carId}. {car.model}
            </h2>
            <p className="text-green-600 font-semibold text-center">
              Price : Rs.{car.pricePerDay}/day
            </p>
            <button
              onClick={() => handleBookNow(car)}
              className="mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 block mx-auto"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {selectedCar && (
        <div className="relative z-10 bg-white bg-opacity-90 p-8 rounded-lg shadow-xl max-w-lg mx-auto mt-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
            Booking Details
          </h2>
          <form onSubmit={handleSubmit}>
            <p className="mb-4">
              <strong>Selected Car:</strong> {selectedCar.model}
            </p>
            <p className="mb-4">
              <strong>Price per Day:</strong> ${selectedCar.pricePerDay}
            </p>

            <div className="mb-4">
              <label htmlFor="pickup-date" className="block font-semibold mb-1">
                Pickup Date:
              </label>
              <input
                type="date"
                id="pickup-date"
                className="w-full border rounded-lg py-2 px-3"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dropoff-date" className="block font-semibold mb-1">
                Dropoff Date:
              </label>
              <input
                type="date"
                id="dropoff-date"
                className="w-full border rounded-lg py-2 px-3"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                required
              />
            </div>

            <p className="mb-4">
              <strong>Total Price:</strong> ${calculateTotal()}
            </p>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookReservations;
