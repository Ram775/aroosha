// src/auth/AdminContext.jsx

import { createContext, useState, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { adminLogin, googleLogin } from "../api/login";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {

  const [admin, setAdmin] = useState(null);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    const adminData = localStorage.getItem("adminData");

    const token = localStorage.getItem("adminToken");

    if (adminData && token) {

      try {

        const parsed = JSON.parse(adminData);

        setAdmin(parsed);

      } catch {

        localStorage.removeItem("adminData");

      }

    }

    setLoading(false);

  }, []);

  const login = async (username, password) => {

    try {

      const data = await adminLogin(username, password);

      const adminData = {

        name: data.name,

        role: data.role,

      };

      localStorage.setItem("adminToken", data.access_token);

      localStorage.setItem("adminData", JSON.stringify(adminData));

      setAdmin(adminData);

      navigate("/admin/dashboard");

      return { success: true };

    } catch (err) {

      return { success: false, error: err.response?.data?.detail || "Invalid credentials" };

    }

  };

  const loginWithGoogle = async (googleToken) => {

    try {

      const data = await googleLogin(googleToken);

      const adminData = {

        name: data.name,

        role: data.role,

      };

      localStorage.setItem("adminToken", data.access_token);

      localStorage.setItem("adminData", JSON.stringify(adminData));

      setAdmin(adminData);

      navigate("/admin/dashboard");

      return { success: true };

    } catch (err) {

      return { success: false, error: err.response?.data?.detail || "Google login failed" };

    }

  };

  const logout = () => {

    localStorage.removeItem("adminToken");

    localStorage.removeItem("adminData");

    setAdmin(null);

    navigate("/admin/login");

  };

  const value = {

    admin,

    loading,

    login,

    loginWithGoogle,

    logout,

    isAuthenticated: !!admin,

    isAdmin: !!admin,

  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;

}

export function useAdmin() {

  const context = useContext(AdminContext);

  if (!context) {

    throw new Error("useAdmin must be used within AdminProvider");

  }

  return context;

}