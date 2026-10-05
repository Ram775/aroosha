// src/auth/AdminProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAdmin } from "./AdminContext";

export default function AdminProtectedRoute({ children }) {
  const { admin, loading, isAdmin } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!admin || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}