import axios from "axios";

const API_URL = "https://example.com/api"; // Replace with your API base URL

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // Return token or user details
};

export const registerUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, { email, password });
  return response.data;
};
