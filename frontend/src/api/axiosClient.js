import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const client = axios.create({
  baseURL: API_BASE
});

// يضيف Authorization تلقائياً إذا فيه توكن
client.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default client;
