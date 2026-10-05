// src/api/careerApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ============================================================
// 📌 PUBLIC JOBS API — Only 2 endpoints exist
// ============================================================

// GET all public jobs (active only)
export const getPublicJobs = async () => {
  const response = await axios.get(`${API_BASE_URL}/jobs/public`);
  return response.data;
};

// GET single public job by ID
export const getPublicJobById = async (job_id) => {
  const response = await axios.get(`${API_BASE_URL}/jobs/public/${job_id}`);
  return response.data;
};

// ============================================================
// 📌 SUBMIT APPLICATION (multipart/form-data)
// ============================================================
export const submitApplication = async (data) => {
  const formData = new FormData();

  formData.append("job_id", Number(data.job_id));
  formData.append("applicant_name", data.applicant_name.trim());
  formData.append("email", data.email.trim());

  if (data.phone?.trim()) formData.append("phone", data.phone.trim());
  if (data.experience?.trim())
    formData.append("experience", data.experience.trim());

  formData.append("resume", data.resume);

  const response = await axios.post(
    `${API_BASE_URL}/job-applications/`,
    formData
  );

  return response.data;
};

// ============================================================
// 🔧 Helper — normalize response to array
// ============================================================
export const toArray = (data) => {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && Array.isArray(data.results)) return data.results;
  if (data && Array.isArray(data.items)) return data.items;
  return [];
};