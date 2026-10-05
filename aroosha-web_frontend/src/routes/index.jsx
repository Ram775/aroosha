
import { Routes, Route } from "react-router-dom";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Admin Routes — pehle check hone chahiye */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* User Routes */}
      <Route path="/*" element={<UserRoutes />} />
    </Routes>
  );
}