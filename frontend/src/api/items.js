import axios from "axios";

// ⚠️  This reads from .env — update VITE_API_URL after deploying to Railway
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://mern-item-manager-production-96e8.up.railway.app",
});

export const getItems    = ()         => API.get("/items");
export const getItem     = (id)       => API.get(`/items/${id}`);
export const createItem  = (data)     => API.post("/items", data);
export const updateItem  = (id, data) => API.put(`/items/${id}`, data);
export const deleteItem  = (id)       => API.delete(`/items/${id}`);
