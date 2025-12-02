import axios from "axios";

// Direct backend URL - fallback if env var not set
const API_URL = import.meta.env.VITE_API_URL || 'https://ak-mobiles-ecommerce.onrender.com';

console.log("Frontend using API URL:", API_URL); // DEBUG - Updated for redeploy

const api = axios.create({
  baseURL: API_URL,       // Backend base URL comes from Vercel
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
