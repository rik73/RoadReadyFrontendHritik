import axios from "axios";

const API_URL = "https://localhost:7087/api/Review"; 

class ReviewService{
static getAllReviews = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};

static getReviewById = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Review:", error);
    throw error;
  }
};
static getReviewByUserId = async (id) =>{
try{
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/${id}`,{
    headers:{
      Authorization :`Bearer ${token}`,
    },
  });
  return response.data;
}catch(error){
  console.error("Error fetching Reviews:",error);
  throw error;
}
};
 static getReviewByCarId = async (carId) => {
  try {
    const response = await axios.get(`${API_URL}/car/${carId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching review for carId ${carId}:`, error);
    throw error;
  }
};

static addReview = async (review) => {
  try {
    const response = await axios.post(API_URL, review);
    return response.data;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

static updateReview = async (review) => {
  try {
    const response = await axios.put(`${API_URL}/${review.reviewId}`, review);
    return response.data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};
}
export default ReviewService;