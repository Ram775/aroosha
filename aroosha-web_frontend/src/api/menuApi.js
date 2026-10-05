// src/api/menuApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 🔧 Auth headers (baaki API files jaise)
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
// 📌 1️⃣ GET ALL MENUS
// GET /menus/
// ============================================================
export const getMenus = async () => {
  const response = await axios.get(`${API_BASE_URL}/menus/`, getHeaders());
  return toArray(response.data);
};

// ============================================================
// 📌 2️⃣ CREATE MENU
// POST /menus/
// body: { name, navigation }
// ============================================================
export const createMenu = async (data) => {
  const response = await axios.post(
    `${API_BASE_URL}/menus/`,
    {
      name: data.name.trim(),
      navigation: data.navigation.trim(),
    },
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 3️⃣ CREATE ROLE MENU ACCESS
// POST /role-menu-access
// body: { role, menu_id, access }
// ============================================================
export const createRoleMenuAccess = async (role, menu_id, access) => {
  const response = await axios.post(
    `${API_BASE_URL}/role-menu-access`,
    {
      role: String(role).toLowerCase().trim(),
      menu_id: Number(menu_id),
      access: Boolean(access),
    },
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 4️⃣ GET MY MENU
// GET /my-menu
// ============================================================
export const getMyMenu = async () => {
  const response = await axios.get(`${API_BASE_URL}/my-menu`, getHeaders());
  return toArray(response.data);
};