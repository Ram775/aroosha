// src/api/teamMembersApi.js
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
// 📌 1️⃣ GET ALL TEAM MEMBERS
// ============================================================

export const getTeamMembers = async () => {
  const response = await axios.get(`${API_BASE_URL}/team-members/`, getHeaders());
  return response.data;
};

// ============================================================
// 📌 2️⃣ GET APPROVED TEAM MEMBERS
// ============================================================

export const getApprovedTeamMembers = async () => {
  const response = await axios.get(`${API_BASE_URL}/team-members/approved`, getHeaders());
  return response.data;
};

// ============================================================
// 📌 3️⃣ GET TEAM MEMBER BY ID
// ============================================================

export const getTeamMemberById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/team-members/${id}`, getHeaders());
  return response.data;
};

// ============================================================
// 📌 4️⃣ CREATE TEAM MEMBER
// ============================================================

export const createTeamMember = async (data) => {
  const response = await axios.post(
    `${API_BASE_URL}/team-members/`,
    {
      department_id: Number(data.department_id),
      team_id: Number(data.team_id),
      name: data.name,
      designation: data.designation,
      joining_date: data.joining_date,
      photo_url: data.photo_url || "",
      linkedin_url: data.linkedin_url || "",
      display_order: Number(data.display_order) || 0,
    },
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 5️⃣ UPDATE TEAM MEMBER
// ============================================================

export const updateTeamMember = async (id, data) => {
  const response = await axios.put(
    `${API_BASE_URL}/team-members/${id}`,
    {
      department_id: Number(data.department_id),
      team_id: Number(data.team_id),
      name: data.name,
      designation: data.designation,
      joining_date: data.joining_date,
      photo_url: data.photo_url || "",
      linkedin_url: data.linkedin_url || "",
      display_order: Number(data.display_order) || 0,
    },
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 6️⃣ UPDATE TEAM MEMBER STATUS (Approve/Block/Delete - Sab Ek Hi)
// ============================================================

export const updateTeamMemberStatus = async (id, status) => {
  const response = await axios.patch(
    `${API_BASE_URL}/team-members/${id}/status`,
    { status },
    getHeaders()
  );
  return response.data;
};