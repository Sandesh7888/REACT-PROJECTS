import axios from "axios";

const base = (import.meta.env.VITE_API_URL || "http://localhost:5000") + "/api";

const api = axios.create({
  baseURL: base,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) {
    cfg.headers.Authorization = `Bearer ${token}`;
    // If backend uses x-auth-token instead, use:
    // cfg.headers["x-auth-token"] = token;
  }
  return cfg;
});

export default api;
