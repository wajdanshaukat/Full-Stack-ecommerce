import axios from "axios";

const token = localStorage.getItem("token");


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
  headers: {
    Authorization: token ? `Bearer ${token}` : undefined,
  },
});

export default api;