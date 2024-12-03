import axios from "axios";

const API_URL = "https://localhost:7087/api/Car"; // Adjust the URL to your backend endpoint
class CarService{
// Function to fetch all cars
static getCars = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the token for authentication
      },
    });
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error; // Rethrow the error to be handled in the component
  }
};

// Function to fetch a single car by its ID
static getCarById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching car:", error);
    throw error;
  }
};
// Add a new Car
static addCar = async (car) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(API_URL, car, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the created car extra data
    } catch (error) {
      console.error("Error adding car:", error);
      throw error;
    }
  };
  
  // Update an existing Car
  static updateCar = async (id, car) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/${id}`, car, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the updated car extra data
    } catch (error) {
      console.error(`Error updating car with ID ${id}:`, error);
      throw error;
    }
  };
  
  // Delete a Car by ID
  static deleteCar = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return confirmation of deletion
    } catch (error) {
      console.error(`Error deleting car with ID ${id}:`, error);
      throw error;
    }
  };
}
export default CarService;