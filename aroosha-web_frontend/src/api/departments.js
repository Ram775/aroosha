// src/api/departments.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => localStorage.getItem('token') || localStorage.getItem('adminToken');

const getHeaders = () => ({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  },
});

// ============================================================
// 📌 GET ALL DEPARTMENTS
// ============================================================

export const getDepartments = async () => {
  const response = await axios.get(`${API_BASE_URL}/departments/`, getHeaders());
  return response.data;
};

// ============================================================
// 📌 GET APPROVED DEPARTMENTS (Dropdown ke liye)
// ============================================================

export const getApprovedDepartments = async () => {
  const response = await axios.get(`${API_BASE_URL}/departments/approved`, getHeaders());
  return response.data;
};

// ============================================================
// 📌 GET DEPARTMENT BY ID ⭐ NEW FUNCTION ADD KAREIN
// ============================================================

export const getDepartmentById = async (department_id) => {
  const response = await axios.get(`${API_BASE_URL}/departments/${department_id}`, getHeaders());
  return response.data;
};

// ============================================================
// 📌 CREATE DEPARTMENT
// ============================================================

export const createDepartment = async (department_name, department_head) => {
  const response = await axios.post(
    `${API_BASE_URL}/departments/`,
    { department_name, department_head },
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 UPDATE DEPARTMENT STATUS
// ============================================================

export const updateDepartmentStatus = async (department_id, status) => {
  const response = await axios.patch(
    `${API_BASE_URL}/departments/${department_id}/status`,
    { status },
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 UPDATE DEPARTMENT
// ============================================================

export const updateDepartment = async (department_id, department_name, department_head) => {
  const response = await axios.put(
    `${API_BASE_URL}/departments/${department_id}`,
    { department_name, department_head },
    getHeaders()
  );
  return response.data;
};