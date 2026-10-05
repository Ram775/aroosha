// src/api/jobTypesApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => localStorage.getItem("adminToken");

const getHeaders = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

// ============================================================
// 📌 1️⃣ GET ALL JOB TYPES
// ============================================================

export const getJobTypes = async () => {
  const response = await axios.get(`${API_BASE_URL}/job-types/`, getHeaders());
  return response.data;
};

// ============================================================
// 📌 2️⃣ GET JOB TYPE BY ID
// ============================================================

export const getJobTypeById = async (job_type_id) => {
  const response = await axios.get(
    `${API_BASE_URL}/job-types/${job_type_id}`,
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 3️⃣ CREATE JOB TYPE
// ============================================================

export const createJobType = async (type_name) => {
  const response = await axios.post(
    `${API_BASE_URL}/job-types/`,
    { type_name: type_name.trim() },
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 4️⃣ UPDATE JOB TYPE
// ============================================================

export const updateJobType = async (job_type_id, type_name) => {
  const response = await axios.put(
    `${API_BASE_URL}/job-types/${job_type_id}`,
    { type_name: type_name.trim() },
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 5️⃣ DELETE JOB TYPE
// ============================================================
export const deleteJobType = async (job_type_id) => {
  const response = await axios.delete(
    `${API_BASE_URL}/job-types/delete`,
    {
      ...getHeaders(),
      params: { job_type_id },
    }
  );
  return response.data;
};