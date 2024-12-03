import axios from 'axios';

const apiUrl = 'https://localhost:7087/api/Reservation';  // Update with your actual API base URL

class ReservationService {
  // Get all reservations
  static getAllReservations() {
    return axios.get(`${apiUrl}`)
      .then(response => response.data)
      .catch(error => {
        console.error("There was an error fetching the reservations!", error);
        throw error;
      });
  }

  // Get a single reservation by ID
  static getReservationById(id) {
    return axios.get(`${apiUrl}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error("There was an error fetching the reservation!", error);
        throw error;
      });
  }

  // Add a new reservation
  static addReservation(reservationData) {
    return axios.post(apiUrl, reservationData)
      .then(response => response.data)
      .catch(error => {
        console.error("There was an error adding the reservation!", error);
        throw error;
      });
  }

  // Update an existing reservation
  static updateReservation(id, reservationData) {
    return axios.put(`${apiUrl}/${id}`, reservationData)
      .then(response => response.data)
      .catch(error => {
        console.error("There was an error updating the reservation!", error);
        throw error;
      });
  }

  // Delete a reservation
  static deleteReservation(id) {
    return axios.delete(`${apiUrl}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error("There was an error deleting the reservation!", error);
        throw error;
      });
  }
}

export default ReservationService;