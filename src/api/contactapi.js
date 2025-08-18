import axios from "axios";

// Set your Laravel backend API URL
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // change if different
  withCredentials: true, // if using Sanctum or cookies
});

// Complaints
export const submitComplaint = async (formData) => {
  const { data } = await API.post("/complaints", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.complaint;
};

export const trackComplaint = async (trackingNumber) => {
  const { data } = await API.get(`/complaints/${trackingNumber}`);
  return data;
};

// Tips & Suggestions
export const submitTip = async (payload) => {
  const { data } = await API.post("/tips", payload);
  return data;
};

// General Inquiries
export const submitInquiry = async (payload) => {
  const { data } = await API.post("/inquiries", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
};