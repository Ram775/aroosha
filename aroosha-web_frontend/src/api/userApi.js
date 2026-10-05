// src/api/userApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getHeaders = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
    "Content-Type": "application/json",
  },
});

export const createUser = async (payload) => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/users`,
    payload,
    getHeaders()
  );
  return response.data;
};

export const getMyProfile = async () => {
  const response = await axios.get(`${API_BASE_URL}/auth/me`, getHeaders());
  return response.data;
};



// ============================================================
// 📌 GET ALL USERS
// ============================================================
export const getAllUsers = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/auth/users`,
    getHeaders()
  );
  return Array.isArray(response.data) ? response.data : [];
};

// ============================================================
// 📌 DELETE USER
// ============================================================
export const deleteUser = async (user_id) => {
  const response = await axios.delete(
    `${API_BASE_URL}/auth/users/${user_id}`,
    getHeaders()
  );
  return response.data;
};