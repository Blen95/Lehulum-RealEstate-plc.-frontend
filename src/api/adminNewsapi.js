import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Function to get token from localStorage (or anywhere you store it)
const getToken = () => localStorage.getItem("authToken") || "";

// Helper to return headers with Bearer token
const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

// Fetch news
export const fetchNews = async (page = 1) => {
  const { data } = await API.get(`/news?page=${page}`, { headers: authHeaders() });
  return data;
};

// Add news
export const addNews = async (payload) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("content", payload.content);
  if (payload.image) formData.append("image", payload.image);

  const { data } = await API.post("/news", formData, {
    headers: { 
      "Content-Type": "multipart/form-data",
      ...authHeaders(),
    },
  });
  return data;
};

// Update news
export const updateNews = async (id, payload) => {
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("content", payload.content);
  if (payload.image) formData.append("image", payload.image);

  // Laravel expects _method=PUT for file uploads
  formData.append("_method", "PUT");

  const { data } = await API.post(`/news/${id}`, formData, {
    headers: { 
      "Content-Type": "multipart/form-data",
      ...authHeaders(),
    },
  });
  return data;
};


// Delete news
export const deleteNews = async (id) => {
  const { data } = await API.delete(`/news/${id}`, { headers: authHeaders() });
  return data;
};
