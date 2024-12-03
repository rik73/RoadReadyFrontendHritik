import axios from 'axios';

const apiUrl = 'https://localhost:7087/api/Payment'; // Update with your actual API base URL

class PaymentService {
  // Get all payments
  static getAllPayments() {
    return axios.get(apiUrl)
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching payments:", error);
        throw error;
      });
  }

  // Get a payment by ID
  static getPaymentById(id) {
    return axios.get(`${apiUrl}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching payment:", error);
        throw error;
      });
  }
  // Add a new payment
  static addPayment(paymentData) {
    return axios.post(apiUrl, paymentData)
      .then(response => response.data)
      .catch(error => {
        console.error("Error adding payment:", error);
        throw error;
      });
  }

  // Update a payment
  static updatePayment(id, paymentData) {
    return axios.put(`${apiUrl}/${id}`, paymentData)
      .then(response => response.data)
      .catch(error => {
        console.error("Error updating payment:", error);
        throw error;
      });
  }

  // Delete a payment
  static deletePayment(id) {
    return axios.delete(`${apiUrl}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error("Error deleting payment:", error);
        throw error;
      });
  }
}

export default PaymentService;