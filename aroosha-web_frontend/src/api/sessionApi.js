// src/api/sessionApi.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => localStorage.getItem("adminToken");

// ============================================================
// 📌 1️⃣ REFRESH TOKEN API
// ============================================================

export const refreshToken = async () => {
  const token = getToken();
  if (!token) throw new Error("No token found");

  const response = await axios.post(
    `${API_BASE_URL}/auth/refresh`,
    {}, // Body empty (token header me jayega)
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
  // Returns: { access_token, token_type, role }
};

// ============================================================
// 📌 2️⃣ JWT HELPERS
// ============================================================

export const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("❌ Invalid JWT:", err);
    return null;
  }
};

export const getTokenExpiry = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return null;
  return decoded.exp * 1000; // milliseconds
};

export const getTimeLeft = (token) => {
  const expiry = getTokenExpiry(token);
  if (!expiry) return null;

  const diff = Math.floor((expiry - Date.now()) / 1000);
  return diff > 0 ? diff : 0;
};

export const isTokenExpired = (token) => {
  const timeLeft = getTimeLeft(token);
  return timeLeft === null || timeLeft <= 0;
};

// ============================================================
// 📌 3️⃣ FORMAT HELPERS
// ============================================================

export const formatTime = (seconds) => {
  if (seconds === null || seconds <= 0) return "Expired";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};