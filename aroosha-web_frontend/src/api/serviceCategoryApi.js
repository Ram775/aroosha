// src/api/serviceCategoryApi.js
// ✅ Exactly same pattern as jobsApi.js

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
export const toArray = (data) => {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && Array.isArray(data.results)) return data.results;
  if (data && Array.isArray(data.items)) return data.items;
  if (data && Array.isArray(data.result)) return data.result;
  return [];
};

// 🔧 payload builder
const buildCategoryPayload = (data = {}) => ({
  name: safeTrim(data.name),
  display_order: Number(data.display_order) || 0,
});

// ============================================================
// 📌 1️⃣ GET ALL CATEGORIES
//     GET /service-categories/
// ============================================================
export const getAllCategories = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/service-categories/`,
    getHeaders()
  );
  return toArray(response.data);
};

// ============================================================
// 📌 2️⃣ GET CATEGORY BY ID
//     GET /service-categories/{category_id}
// ============================================================
export const getCategoryById = async (category_id) => {
  const response = await axios.get(
    `${API_BASE_URL}/service-categories/${category_id}`,
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 3️⃣ CREATE CATEGORY
//     POST /service-categories/
//     body: { name, display_order }
// ============================================================
export const createCategory = async (data) => {
  const response = await axios.post(
    `${API_BASE_URL}/service-categories/`,
    buildCategoryPayload(data),
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 4️⃣ UPDATE CATEGORY
//     PUT /service-categories/{category_id}
//     body: { name, display_order }
// ============================================================
export const updateCategory = async (category_id, data) => {
  const response = await axios.put(
    `${API_BASE_URL}/service-categories/${category_id}`,
    buildCategoryPayload(data),
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 5️⃣ DELETE CATEGORY
//     DELETE /service-categories/{category_id}
// ============================================================
export const deleteCategory = async (category_id) => {
  const response = await axios.delete(
    `${API_BASE_URL}/service-categories/${category_id}`,
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 6️⃣ UPDATE CATEGORY ACTIVE STATUS (PATCH)
//     PATCH /service-categories/{category_id}/active
//     body: { "is_active": true | false }
// ============================================================
export const toggleCategoryActive = async (category_id, is_active) => {
  const response = await axios.patch(
    `${API_BASE_URL}/service-categories/${category_id}/active`,
    { is_active: Boolean(is_active) },
    getHeaders()
  );
  return response.data;
};

// ============================================================
// 📌 7️⃣ GET PUBLIC CATEGORIES (No auth needed)
//     GET /service-categories/public
// ============================================================
export const getPublicCategories = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/service-categories/public`
  );
  return toArray(response.data);
};