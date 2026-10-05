// src/pages/admin/Users/index.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, UserPlus, Edit, Trash2, Search,
  Shield, Crown, Briefcase, FileText, Eye,
  CheckCircle, XCircle, MoreVertical,
  Building2, Mail, Phone, Calendar, Loader2
} from "lucide-react";
import { getRoleInfo } from "../../../../data/roles";
import { getAllUsers, deleteUser } from "../../../../api/userApi";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ API se users fetch karein
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllUsers();
      console.log("📥 Users fetched:", data);
      setUsers(data);
    } catch (err) {
      console.error("❌ Fetch users error:", err);
      setError(err.response?.data?.detail || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getRoleIcon = (roleId) => {
    const icons = {
      admin: Crown,
      hr: Users,
      manager: Briefcase,
      editor: FileText,
      viewer: Eye,
    };
    return icons[roleId] || Shield;
  };

  const getStatusBadge = (isActive) => {
    return isActive
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const filteredUsers = users.filter(
    (user) =>
      user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert(err.response?.data?.detail || "Failed to delete user.");
    }
  };

  // ✅ Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-primary" />
        <span className="ml-3 text-muted">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-heading">User Management</h1>
          <p className="text-muted text-sm">Manage users and their roles</p>
        </div>
        <button
          onClick={() => navigate("/admin/users/create")}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <UserPlus size={18} />
          Add User
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-body text-heading focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-body/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted">User</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted">Role</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-muted">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-muted">
                    No users found. Click "Add User" to create one.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const roleInfo = getRoleInfo(user.role);
                  const RoleIcon = getRoleIcon(user.role);

                  return (
                    <tr key={user.id} className="hover:bg-body/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-sm">
                            {user.full_name?.[0] || "U"}
                          </div>
                          <div>
                            <p className="font-medium text-heading">
                              {user.full_name || "Unnamed"}
                            </p>
                            <p className="text-xs text-muted">
                              @{user.username || "user"} · ID #{user.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            roleInfo?.bg || "bg-gray-100"
                          } ${roleInfo?.color || "text-gray-700"}`}
                        >
                          <span className="flex items-center gap-1">
                            <RoleIcon size={12} />
                            {roleInfo?.name || user.role}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                            user.is_active
                          )}`}
                        >
                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-body rounded transition-colors">
                            <Eye size={16} className="text-muted hover:text-primary" />
                          </button>
                          {user.role !== "admin" && (
                            <button
                              onClick={() => handleDelete(user.id)}
                              className="p-1 hover:bg-body rounded transition-colors"
                            >
                              <Trash2
                                size={16}
                                className="text-muted hover:text-red-500"
                              />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}