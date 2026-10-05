// src/pages/admin/CreateAdmin/index.jsx
import React, { useState } from "react";
import { UserPlus, Mail, Lock, User, Shield, Crown, Users, Briefcase, FileText, Eye, CheckCircle, XCircle } from "lucide-react";

export default function CreateAdmin() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "hr"
  });

  const roles = [
    { id: "super_admin", label: "Super Admin", description: "Full system access" },
    { id: "hr", label: "HR Manager", description: "Manage departments, jobs, applications" },
    { id: "manager", label: "Department Manager", description: "Manage team and jobs" },
    { id: "editor", label: "Content Editor", description: "Manage content and services" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.username || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("✅ New Admin Created:", formData);
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "hr"
      });

      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  const getRoleIcon = (roleId) => {
    const icons = {
      super_admin: Crown,
      hr: Users,
      manager: Briefcase,
      editor: FileText
    };
    return icons[roleId] || Shield;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-heading">Add New Admin</h1>
        <p className="text-muted text-sm">Create new admin users with role-based access</p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <CheckCircle size={20} className="text-green-500" />
          <span className="text-green-700">Admin created successfully!</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
          <XCircle size={20} className="text-red-500" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-5">
        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold text-heading mb-4">Personal Information</h3>
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
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-body text-heading focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Enter email address"
              />
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="pt-4 border-t border-border">
          <h3 className="text-lg font-semibold text-heading mb-4">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-heading mb-1">
                Username <span className="text-red-500">*</span>
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
                Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-body text-heading focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.label} - {role.description}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-heading mb-1">
                Password <span className="text-red-500">*</span>
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
                Confirm Password <span className="text-red-500">*</span>
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

        {/* Selected Role Preview */}
        <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              {(() => {
                const Icon = getRoleIcon(formData.role);
                return <Icon size={20} className="text-primary" />;
              })()}
            </div>
            <div>
              <p className="font-medium text-heading">
                {roles.find(r => r.id === formData.role)?.label}
              </p>
              <p className="text-xs text-muted">
                {roles.find(r => r.id === formData.role)?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              Creating...
            </>
          ) : (
            <>
              <UserPlus size={18} />
              Create Admin
            </>
          )}
        </button>
      </form>
    </div>
  );
}