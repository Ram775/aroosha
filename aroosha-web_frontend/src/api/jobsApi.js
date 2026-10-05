// src/api/jobsApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => localStorage.getItem("adminToken");

const getHeaders = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

// 🔧 safe trim
const safeTrim = (val) => (typeof val === "string" ? val.trim() : "");

// 🔧 array normalize
const toArray = (data) => {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && Array.isArray(data.results)) return data.results;
  if (data && Array.isArray(data.items)) return data.items;
  return [];
};

// 🔧 payload builder
const buildJobPayload = (data = {}) => ({
  title: safeTrim(data.title),
  designation: safeTrim(data.designation),
  description: safeTrim(data.description),
  department_id: Number(data.department_id),
  job_type_id: Number(data.job_type_id),
  location: safeTrim(data.location),
  experience_required: safeTrim(data.experience_required),
});

// ============================================================
// 📌 1️⃣ GET ALL JOBS
// ============================================================
export const getJobs = async () => {
  const response = await axios.get(`${API_BASE_URL}/jobs/`, getHeaders());
  return toArray(response.data);
};

// ============================================================
// 📌 2️⃣ GET JOB BY ID
// ============================================================
export const getJobById = async (job_id) => {
  const response = await axios.get(
    `${API_BASE_URL}/jobs/${job_id}`,
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 3️⃣ CREATE JOB
// ============================================================
export const createJob = async (data) => {
  const response = await axios.post(
    `${API_BASE_URL}/jobs/`,
    buildJobPayload(data),
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 4️⃣ UPDATE JOB
// ============================================================
export const updateJob = async (job_id, data) => {
  const response = await axios.put(
    `${API_BASE_URL}/jobs/${job_id}`,
    buildJobPayload(data),
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 5️⃣ DELETE JOB
// ============================================================
export const deleteJob = async (job_id) => {
  const response = await axios.delete(
    `${API_BASE_URL}/jobs/${job_id}`,
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 6️⃣ UPDATE JOB ACTIVE STATUS (PATCH)
//     PATCH /jobs/{job_id}/active
//     body: { "is_active": true | false }
// ============================================================
export const updateJobActiveStatus = async (job_id, is_active) => {
  const response = await axios.patch(
    `${API_BASE_URL}/jobs/${job_id}/active`,
    { is_active: Boolean(is_active) },
    getHeaders()
  );
  return response.data;
};