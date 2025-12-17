import axios from "axios";

const API_DOMAIN = "http://localhost:5000";

const api = axios.create({
  baseURL: API_DOMAIN,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
