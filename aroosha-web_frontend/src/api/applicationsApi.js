// src/api/applicationsApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 🔧 Auth headers
const getHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};

// 🔧 Response to array
const toArray = (data) => {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && Array.isArray(data.results)) return data.results;
  if (data && Array.isArray(data.items)) return data.items;
  return [];
};

// ============================================================
// 📌 1️⃣ GET ALL APPLICATIONS (admin)
// ============================================================
export const getApplications = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/job-applications/`,
    getHeaders()
  );
  return toArray(response.data);
};

// ============================================================
// 📌 2️⃣ GET APPLICATION BY ID (admin)
// ============================================================
export const getApplicationById = async (application_id) => {
  const response = await axios.get(
    `${API_BASE_URL}/job-applications/${application_id}`,
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 3️⃣ UPDATE APPLICATION STATUS (admin)
// PATCH /job-applications/{id}/status
// body: { "status": "pending" | "approved" | "rejected" }
// ============================================================
export const updateApplicationStatus = async (application_id, status) => {
  const response = await axios.patch(
    `${API_BASE_URL}/job-applications/${application_id}/status`,
    { status },
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 4️⃣ APPLY FOR JOB (public — no auth)
// POST /job-applications/  (multipart/form-data)
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
    // Content-Type set nahi karna — axios boundary ke saath khud set karega
  );

  return response.data;
};

// ============================================================
// 📌 Status constants (dropdown/buttons ke liye)
// ============================================================
export const APPLICATION_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

// ============================================================
// 📌 Status badge helper (har jagah same look)
// ============================================================
export const getStatusBadgeClass = (status) => {
  const s = String(status || "pending").toLowerCase();
  if (s === "approved" || s === "accepted")
    return "bg-emerald-100 text-emerald-700";
  if (s === "rejected") return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-800";
};

export const getStatusLabel = (status) => {
  const s = String(status || "pending").toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
};


// ============================================================
// 📌 6️⃣ GET APPROVED APPLICATIONS (Optional)
// ============================================================

export const getApprovedApplications = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/job-applications/approved`,
    getHeaders()
  );
  return toArray(response.data);
};