import axios from "axios";

// Direct backend URL - fallback if env var not set
const API_URL = import.meta.env.VITE_API_URL || 'https://ak-mobiles-ecommerce.onrender.com';

console.log("Frontend using API URL:", API_URL); // DEBUG (You can remove later)

const api = axios.create({
  baseURL: API_URL,       // Backend base URL comes from Vercel
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,  // If your backend uses JWT/cookies
});

export default api;
