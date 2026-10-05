// src/pages/Admin/Users/CreateUser.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserPlus, Loader2, Eye, EyeOff,
  User as UserIcon, Mail, AtSign, ShieldCheck, Clock,
} from "lucide-react";
import { createUser } from "../../../api/userApi";
import Alert from "../../../components/ui/Alert";
import FieldError from "../../../components/ui/FieldError";

const ROLES = [
  { value: "hr", label: "HR" },
  { value: "editor", label: "Editor" },
];

export default function CreateUser({
  users,
  setUsers,
  onRefresh,
  onCancelEdit,
}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    username: "",
    password: "",
    role: "editor",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const timerRef = useRef(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  // ===== VALIDATION =====
  const validateForm = () => {
    const errors = {};

    const name = formData.full_name.trim();
    if (!name) errors.full_name = "Full name is required";
    else if (name.length < 3) errors.full_name = "Name must be at least 3 characters";
    else if (name.length > 60) errors.full_name = "Name must be under 60 characters";
    else if (!/^[a-zA-Z\s.'-]+$/.test(name))
      errors.full_name = "Only letters, spaces, dots, apostrophes and hyphens allowed";

    const email = formData.email.trim();
    if (!email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Enter a valid email address";

    const uname = formData.username.trim();
    if (!uname) errors.username = "Username is required";
    else if (uname.length < 3) errors.username = "Username must be at least 3 characters";
    else if (uname.length > 30) errors.username = "Username must be under 30 characters";
    else if (!/^[a-zA-Z0-9._-]+$/.test(uname))
      errors.username = "Only letters, numbers, dots, underscores and hyphens allowed";

    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    else if (!/[A-Za-z]/.test(formData.password))
      errors.password = "Password must contain a letter";
    else if (!/[0-9]/.test(formData.password))
      errors.password = "Password must contain a number";

    if (!ROLES.some((r) => r.value === formData.role))
      errors.role = "Invalid role selected";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (fieldErrors[field]) setFieldErrors({ ...fieldErrors, [field]: "" });
  };

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setError("Please fix the errors above");
      return;
    }

    setLoading(true);

    try {
      const result = await createUser(formData);

      if (setUsers) {
        setUsers((prev) => [...(prev || []), result]);
      }

      if (onRefresh) onRefresh();

      setSuccess(`User "${result.full_name}" created successfully!`);

      setFormData({
        full_name: "",
        email: "",
        username: "",
        password: "",
        role: "editor",
      });
      if (onCancelEdit) onCancelEdit();

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        navigate("/admin/users", { state: { activeTab: "list" } });
      }, 2500);

    } catch (err) {
      const status = err.response?.status;
      const detail = err.response?.data?.detail;

      if (status === 401) setError("Session expired! Please login again.");
      else if (status === 422 && Array.isArray(detail)) {
        const errors = {};
        detail.forEach((d) => {
          const f = d.loc?.[d.loc.length - 1];
          if (f) errors[f] = d.msg;
        });
        setFieldErrors(errors);
        setError("Please fix the highlighted fields.");
      } else if (status === 400) setError(detail || "Invalid data.");
      else if (status === 403) setError("You don't have permission.");
      else if (status === 409) setError("Username or email already exists.");
      else setError(detail || "Failed to process request.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setFormData({
      full_name: "",
      email: "",
      username: "",
      password: "",
      role: "editor",
    });
    setFieldErrors({});
    setError("");
    setSuccess("");
    if (onCancelEdit) onCancelEdit();
    navigate("/admin/users", { state: { activeTab: "list" } });
  };

  // ===== RENDER =====
  return (
    <div className="w-full">
      {success && (
        <Alert variant="success" className="mb-4 w-full sm:max-w-2xl">
          {success}
        </Alert>
      )}
      {error && (
        <Alert variant="error" className="mb-4 w-full sm:max-w-2xl">
          {error}
        </Alert>
      )}

      <div className="
        w-full max-w-2xl
        bg-[var(--color-bg-card)]
        border border-[var(--color-border)]
        rounded-xl
        p-6
        shadow-lg
        shadow-[var(--color-shadow)]
      ">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--color-border)]">
          <div className="p-2 rounded-lg bg-[var(--color-primary-pale)]">
            <UserPlus size={16} className="text-[var(--color-primary)]" />
          </div>
          <h2 className="text-sm sm:text-base font-medium text-[var(--color-text-heading)]">
            Create New User
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => handleChange("full_name", e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  disabled={loading}
                  className={`
                    w-full pl-9 pr-3 py-2.5 rounded-lg
                    bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)]
                    placeholder:text-[var(--color-text-muted)]
                    border transition-all duration-150 focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${fieldErrors.full_name
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"}
                  `}
                />
              </div>
              <FieldError>{fieldErrors.full_name}</FieldError>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="user@example.com"
                  disabled={loading}
                  className={`
                    w-full pl-9 pr-3 py-2.5 rounded-lg
                    bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)]
                    placeholder:text-[var(--color-text-muted)]
                    border transition-all duration-150 focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${fieldErrors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"}
                  `}
                />
              </div>
              <FieldError>{fieldErrors.email}</FieldError>
            </div>

            {/* Username */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AtSign size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  placeholder="e.g. priya.sharma"
                  disabled={loading}
                  className={`
                    w-full pl-9 pr-3 py-2.5 rounded-lg
                    bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)]
                    placeholder:text-[var(--color-text-muted)]
                    border transition-all duration-150 focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${fieldErrors.username
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"}
                  `}
                />
              </div>
              <FieldError>{fieldErrors.username}</FieldError>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ShieldCheck size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="Min 6 chars, 1 letter, 1 number"
                  disabled={loading}
                  className={`
                    w-full pl-9 pr-10 py-2.5 rounded-lg
                    bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)]
                    placeholder:text-[var(--color-text-muted)]
                    border transition-all duration-150 focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${fieldErrors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"}
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <FieldError>{fieldErrors.password}</FieldError>
            </div>

            {/* Role */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Role <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
                disabled={loading}
                className={`
                  w-full px-3 py-2.5 rounded-lg
                  bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)]
                  border transition-all duration-150 focus:outline-none
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${fieldErrors.role
                    ? "border-red-500 focus:border-red-500"
                    : "border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"}
                `}
              >
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              <FieldError>{fieldErrors.role}</FieldError>
            </div>

            {/* Info box */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
              <Clock size={14} className="text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-700">
                New user will be created instantly. Share credentials with them securely.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-6 pt-4 border-t border-[var(--color-border)]">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-xs font-medium hover:bg-[var(--color-primary-dark)] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus size={14} />
                  Create User
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}