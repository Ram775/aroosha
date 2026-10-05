// src/api/teamApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => localStorage.getItem("token") || localStorage.getItem("adminToken");

const getHeaders = () => ({
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`,
  },
});

// ============================================================
// 📌 1️⃣ GET ALL TEAMS
// ============================================================
export const getTeams = async () => {
  const response = await axios.get(`${API_BASE_URL}/teams/`, getHeaders());
  return response.data;
};

// ============================================================
// 📌 2️⃣ GET TEAM BY ID ⭐ NEW
// ============================================================
export const getTeamById = async (team_id) => {
  const response = await axios.get(`${API_BASE_URL}/teams/${team_id}`, getHeaders());
  return response.data;
};

// ============================================================
// 📌 3️⃣ GET APPROVED TEAMS ONLY
// ============================================================
export const getApprovedTeams = async () => {
  const response = await axios.get(`${API_BASE_URL}/teams/approved`, getHeaders());
  return response.data;
};

// ============================================================
// 📌 4️⃣ CREATE TEAM
// ============================================================
export const createTeam = async (team_name, team_lead, department_id) => {
  const response = await axios.post(
    `${API_BASE_URL}/teams/`,
    {
      team_name,
      team_lead,
      department_id: Number(department_id),
    },
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 5️⃣ UPDATE TEAM
// ============================================================
export const updateTeam = async (team_id, team_name, team_lead, department_id) => {
  const response = await axios.put(
    `${API_BASE_URL}/teams/${team_id}`,
    {
      team_name,
      team_lead,
      department_id: Number(department_id),
    },
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 6️⃣ UPDATE TEAM STATUS (Approve / Block / Delete)
// ============================================================
export const updateTeamStatus = async (team_id, status) => {
  const response = await axios.patch(
    `${API_BASE_URL}/teams/${team_id}/status`,
    { status },
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 7️⃣ GET APPROVED DEPARTMENTS (For Dropdown)
// ============================================================
export const getApprovedDepartments = async () => {
  const response = await axios.get(`${API_BASE_URL}/departments/approved`, getHeaders());
  return response.data;
};