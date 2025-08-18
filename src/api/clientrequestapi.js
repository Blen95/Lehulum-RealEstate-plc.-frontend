// src/api/adminClientRequestsApi.js
import axios from "axios";

// Base Axios instance
const API = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

// Add your token here if needed
const getToken = () => localStorage.getItem("authToken") || "";

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

// ===== Inquiries =====
export const fetchInquiries = async (page = 1) => {
  const { data } = await API.get(`/inquiries?page=${page}`, { headers: authHeaders() });
  return data;
};

export const fetchInquiry = async (id) => {
  const { data } = await API.get(`/inquiries/${id}`, { headers: authHeaders() });
  return data;
};

// ===== Tips & Suggestions =====
export const fetchTips = async (page = 1) => {
  const { data } = await API.get(`/tips?page=${page}`, { headers: authHeaders() });
  return data;
};

export const fetchTip = async (id) => {
  const { data } = await API.get(`/tips/${id}`, { headers: authHeaders() });
  return data;
};

// ===== Complaints =====
export const fetchComplaints = async (page = 1) => {
  const { data } = await API.get(`/complaints?page=${page}`, { headers: authHeaders() });
  return data;
};

export const fetchComplaint = async (id) => {
  const { data } = await API.get(`/complaints/${id}`, { headers: authHeaders() });
  return data;
};

export const resolveComplaint = async (id, payload) => {
  // payload = { status: 'resolved' | 'rejected', response: string }
  const { data } = await API.put(`/complaints/${id}/resolve`, payload, {
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
  });
  return data;
};
