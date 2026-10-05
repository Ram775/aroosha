// src/api/servicesApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => localStorage.getItem("adminToken");

const getHeaders = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

const getAuthOnlyHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

const safeTrim = (val) => (typeof val === "string" ? val.trim() : "");

export const toArray = (data) => {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && Array.isArray(data.results)) return data.results;
  if (data && Array.isArray(data.items)) return data.items;
  if (data && Array.isArray(data.result)) return data.result;
  return [];
};

const buildServicePayload = (data = {}) => ({
  category_id: Number(data.category_id) || 0,
  department_id: Number(data.department_id) || 0,
  title: safeTrim(data.title),
  description: safeTrim(data.description),
  display_order: Number(data.display_order) || 0,
});

export const getAllServices = async () => {
  const response = await axios.get(`${API_BASE_URL}/services/`, getHeaders());
  return toArray(response.data);
};

export const getServiceById = async (service_id) => {
  const response = await axios.get(
    `${API_BASE_URL}/services/${service_id}`,
    getHeaders()
  );
  return response.data;
};

export const createService = async (data) => {
  const response = await axios.post(
    `${API_BASE_URL}/services/`,
    buildServicePayload(data),
    getHeaders()
  );
  return response.data;
};

export const updateService = async (service_id, data) => {
  const response = await axios.put(
    `${API_BASE_URL}/services/${service_id}`,
    buildServicePayload(data),
    getHeaders()
  );
  return response.data;
};

export const deleteService = async (service_id) => {
  const response = await axios.delete(
    `${API_BASE_URL}/services/${service_id}`,
    getHeaders()
  );
  return response.data;
};

export const toggleServiceActive = async (service_id, is_active) => {
  const response = await axios.patch(
    `${API_BASE_URL}/services/${service_id}/active`,
    { is_active: Boolean(is_active) },
    getHeaders()
  );
  return response.data;
};

export const uploadServiceIcon = async (service_id, file) => {
  const formData = new FormData();
  formData.append("icon", file);
  const response = await axios.post(
    `${API_BASE_URL}/services/${service_id}/icon`,
    formData,
    getAuthOnlyHeaders()
  );
  return response.data;
};

export const getPublicServices = async () => {
  const response = await axios.get(`${API_BASE_URL}/services/public`);
  return toArray(response.data);
};

export const getPublicServiceById = async (service_id) => {
  const response = await axios.get(
    `${API_BASE_URL}/services/public/${service_id}`
  );
  return response.data;
};