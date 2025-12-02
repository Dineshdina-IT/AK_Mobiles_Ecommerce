import axios from "axios";

// Load backend URL from Vercel environment variables
const API_URL = import.meta.env.VITE_API_URL;

console.log("Frontend using API URL:", API_URL); // DEBUG (You can remove later)

const api = axios.create({
  baseURL: API_URL,       // Backend base URL comes from Vercel
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,  // If your backend uses JWT/cookies
});

export default api;
