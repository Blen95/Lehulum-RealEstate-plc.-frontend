// src/api/apartmentapi.js
import axios from "axios";

// Create axios instance with base URL
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  withCredentials: true,
});

const getToken = () => localStorage.getItem("authToken") || "";

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

// Fetch all apartments
export const fetchApartments = async () => {
  const { data } = await API.get("/apartments", {
    headers: authHeaders(),
  });
  return data;
};

// Update apartment availability
export const updateApartmentAvailability = async (apartmentId, remaining_available) => {
  const { data } = await API.patch(
    `/apartments/${apartmentId}/availability`,
    { remaining_available },
    {
      headers: authHeaders(),
    }
  );
  return data;
};

// Update apartment pricing
export const updateApartmentPricing = async (apartmentId, pricingData) => {
  const { data } = await API.patch(
    `/apartments/${apartmentId}/pricing`,
    pricingData,
    {
      headers: authHeaders(),
    }
  );
  return data;
};
