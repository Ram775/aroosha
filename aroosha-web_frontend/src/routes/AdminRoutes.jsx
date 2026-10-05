// src/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminProtectedRoute from "../auth/AdminProtectedRoute";

// ============================================================
// 📌 MAIN PAGES
// ============================================================
import Dashboard from "../pages/Admin/Dashboard";
import Jobs from "../pages/Admin/dashboarditems/jobs";
import JobTypes from "../pages/Admin/dashboarditems/job-types";
import Services from "../pages/Admin/dashboarditems/Services";
import Categories from "../pages/Admin/dashboarditems/Services/Categories";
import Applications from "../pages/Admin/dashboarditems/Applications";
import Departments from "../pages/Admin/dashboarditems/Departments";

// ============================================================
// 📌 NESTED — Departments/Team/TeamMember
// ============================================================
import Team from "../pages/Admin/dashboarditems/Departments/Team";
import TeamMembers from "../pages/Admin/dashboarditems/Departments/Team/Member";

import PendingApprovals from "../pages/Admin/dashboarditems/PendingApprovals";
import CreateAdmin from "../pages/Admin/dashboarditems/CreateAdmin";
import HiringRequests from "../pages/Admin/dashboarditems/HiringRequests";
import Messages from "../pages/Admin/dashboarditems/Messages";
import Analytics from "../pages/Admin/dashboarditems/Analytics";
import Settings from "../pages/Admin/dashboarditems/Settings";


// ============================================================
// 📌 USERS (single page with tabs)
// ============================================================
import Users from "../pages/Admin/Users";

// ============================================================
// 📌 AUTH
// ============================================================
import AdminLogin from "../auth/AdminLogin";
import AdminSignup from "../auth/AdminSignup";
import AdminForgotPassword from "../auth/AdminForgotPassword";

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="login" element={<AdminLogin />} />
      <Route path="signup" element={<AdminSignup />} />
      <Route path="forgot-password" element={<AdminForgotPassword />} />

      {/* Dashboard */}
      <Route
        path="dashboard"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
      </Route>

      {/* Users — tabbed page (List / Add) */}
      <Route
        path="users"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<Users />} />
      </Route>

      {/* Jobs */}
      <Route
        path="jobs"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<Jobs />} />
        <Route path="create" element={<Jobs />} />
        <Route path="applications" element={<Applications />} />
      </Route>

      {/* Job Types */}
      <Route
        path="job-types"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<JobTypes />} />
      </Route>

      <Route
  path="services"
  element={
    <AdminProtectedRoute>
      <AdminLayout />
    </AdminProtectedRoute>
  }
>
  <Route index element={<Services />} />
  <Route path="create" element={<Services />} />
  <Route path="categories" element={<Categories />} />
</Route>
      {/* Applications */}
      <Route
        path="applications"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<Applications />} />
      </Route>

      {/* Departments */}
      <Route
        path="departments"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<Departments />} />
        <Route path="team" element={<Team />} />
        <Route path="team/team-members" element={<TeamMembers />} />
      </Route>

      {/* Other dashboard items */}
      <Route
        path="pending-approvals"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<PendingApprovals />} />
      </Route>

      <Route
        path="create-admin"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<CreateAdmin />} />
      </Route>

      <Route
        path="hiring-requests"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<HiringRequests />} />
      </Route>

      <Route
        path="messages"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<Messages />} />
      </Route>

      <Route
        path="analytics"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<Analytics />} />
      </Route>

      <Route
        path="settings"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<Settings />} />
      </Route>
    </Routes>
  );
}