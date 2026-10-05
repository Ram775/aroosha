// src/pages/admin/Users/CreateUser.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPlus, Mail, User, Shield, Crown,
  Users, Briefcase, FileText, Eye,
  ArrowLeft, Loader2, CheckCircle,
  Building2, Phone, Calendar, XCircle,
  AlertCircle, UserCog, Lock
} from "lucide-react";
import { ROLES, getAllRoles, getRoleInfo } from "../../../../data/roles";

export default function CreateUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // ✅ FORM DATA - Role Selection Included
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "viewer",        // ← ROLE DROPDOWN
    department: "",
    position: "",
    status: "active",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const allRoles = getAllRoles();

  // Get role icon
  const getRoleIcon = (roleId) => {
    const role = ROLES[roleId?.toUpperCase()];
    if (!role) return Shield;
    const icons = {
      Crown: Crown,
      Users: Users,
      Briefcase: Briefcase,
      FileText: FileText,
      Eye: Eye,
      Shield: Shield
    };
    return icons[role.icon] || Shield;
  };

  // Get selected role info
  const selectedRole = getRoleInfo(formData.role);
  const RoleIcon = getRoleIcon(formData.role);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.role) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      console.log("✅ User Created:", newUser);
      
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        navigate("/admin/users");
      }, 1500);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/admin/users")}
          className="p-2 hover:bg-body rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-heading">Create New User</h1>
          <p className="text-muted text-sm">Assign role and department to new user</p>
        </div>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <CheckCircle size={20} className="text-green-500" />
          <span className="text-green-700">User created successfully! Redirecting...</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-5">
        {/* Error */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* ========== ROLE SELECTION - MAIN FEATURE ========== */}
        <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={18} className="text-primary" />
            <h3 className="font-semibold text-heading">Role & Access</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Role Dropdown */}
            <div>
              <label className="block text-sm font-medium text-heading mb-1">
                Select Role <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <UserCog size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-body text-heading focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                >
                  {allRoles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name} - {role.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-heading mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-body text-heading focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {/* Role Preview */}
          <div className="mt-3 p-3 bg-card border border-border rounded-lg flex items-center gap-3">
            <div className={`p-2 rounded-lg ${selectedRole.bg} ${selectedRole.color}`}>
              <RoleIcon size={20} />
            </div>
            <div>
              <p className="font-medium text-heading text-sm">{selectedRole.name}</p>
              <p className="text-xs text-muted">{selectedRole.description}</p>
            </div>
            <div className="ml-auto flex gap-1">
              {selectedRole.permissions?.includes('all') ? (
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Full Access
                </span>
              ) : (
                selectedRole.permissions?.slice(0, 2).map((perm) => (
                  <span key={perm} className="px-2 py-0.5 bg-body rounded-full text-xs text-muted">
                    {perm}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ========== PERSONAL INFORMATION ========== */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <User size={18} className="text-primary" />
            <h3 className="font-semibold text-heading">Personal Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-heading mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-body text-heading focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-body text-heading focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-body text-heading focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-1">
                Department
              </label>
              <div className="relative">
                <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-body text-heading focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Enter department (e.g., Engineering)"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-1">
                Position
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-body text-heading focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Enter position title"
              />
            </div>
          </div>
        </div>

        {/* ========== ACCOUNT INFORMATION ========== */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lock size={18} className="text-primary" />
            <h3 className="font-semibold text-heading">Account Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-heading mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-body text-heading focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-body text-heading focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-heading mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-body text-heading focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Confirm password"
              />
            </div>
          </div>
        </div>

        {/* ========== SUBMIT BUTTON ========== */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Creating User...
            </>
          ) : (
            <>
              <UserPlus size={18} />
              Create User
            </>
          )}
        </button>
      </form>
    </div>
  );
}