import axios from "axios";

const BASE_URL = "https://the-curve-studet-platfrom-backend.vercel.app/api";

export const createAssessment = async (data) => {
    try {
        const res = await axios.post(`${BASE_URL}/create-assessment`, data);
        console.log("Assessment created:", res.data);
        return res;
    } catch (error) {
        console.error("Error creating assessment:", error.response?.data || error.message);
        throw error;
    }
};

export const getOneUserAssessments = async (data) => {
  // console.log("Fetching assessments for user:", data);

  try {
    const response = await axios.get(`${BASE_URL}/getOneuser/${data}`);
    console.log("Assessments fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || "Unknown error";
    console.error("Failed to fetch assessments:", errorMsg);
    throw new Error(errorMsg); 
  }
};

export const approveAssessment = async (id) => {
  try {
    const res = await axios.put(`${BASE_URL}/approve-assessment/${id}`);
    console.log("Assessment approved:", res.data);
    return res;
  } catch (error) {
    console.error("Error approving assessment:", error.response?.data || error.message);
    throw error;
  }
};

export const getAllUser = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/getAlluser`);
    console.log("All users:", res.data);
    return res;
  } catch (error) {
    console.error("Error approving assessment:", error.response?.data || error.message);
    throw error;
  }
};