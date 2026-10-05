// src/pages/Admin/dashboarditems/job-types/Add.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase, Plus, Clock,
  Loader2, Edit, Save, AlertCircle, CheckCircle
} from "lucide-react";
import { useAdmin } from "../../../../auth/AdminContext";
import { createJobType, updateJobType } from "../../../../api/jobTypesApi";

export default function AddJobType({
  jobTypes,
  setJobTypes,
  onAdd,
  onRefresh,
  editData,
  onCancelEdit
}) {
  const navigate = useNavigate();
  const { admin } = useAdmin();

  const [formData, setFormData] = useState({ type_name: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const timerRef = useRef(null);

  const isAdmin = admin?.role === 'admin' || admin?.role === 'super_admin';

  // Clear pending navigation timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Sync edit mode / form when editData changes
  useEffect(() => {
    if (editData) {
      setIsEditMode(true);
      setFormData({ type_name: editData.type_name || "" });
    } else {
      setIsEditMode(false);
      setFormData({ type_name: "" });
    }
    setFieldErrors({});
    setError("");
    setSuccess("");
  }, [editData]);

  const validateForm = () => {
    const errors = {};
    const value = formData.type_name.trim();

    if (!value) {
      errors.type_name = "Job type name is required";
    } else if (value.length < 3) {
      errors.type_name = "Must be at least 3 characters";
    } else if (value.length > 50) {
      errors.type_name = "Must be less than 50 characters";
    } else if (!/^[a-zA-Z0-9\s\-&/().]+$/.test(value)) {
      errors.type_name = "Only letters, numbers, spaces and - & / ( ) . are allowed";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (value) => {
    setFormData({ type_name: value });
    if (fieldErrors.type_name) setFieldErrors({ type_name: "" });
  };

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
      let result;
      if (isEditMode && editData) {
        result = await updateJobType(editData.id, formData.type_name);
      } else {
        result = await createJobType(formData.type_name);
      }

      // Update local list state — replace on edit, append on create
      if (setJobTypes) {
        setJobTypes(prev => {
          const list = prev || [];
          if (isEditMode && editData) {
            const found = list.some(jt => jt.id === editData.id);
            return found
              ? list.map(jt => (jt.id === editData.id ? result : jt))
              : [...list, result];
          }
          return [...list, result];
        });
      }

      // Notify parent (only on create, to avoid duplicate inserts)
      if (onAdd && !isEditMode) onAdd(result);

      // Server-authoritative refresh (optional — only if parent supports it)
      if (onRefresh) onRefresh();

      setSuccess(
        isEditMode
          ? `Job Type "${result.type_name}" updated successfully!`
          : `Job Type "${result.type_name}" created successfully!`
      );

      setFormData({ type_name: "" });
      setIsEditMode(false);
      if (onCancelEdit) onCancelEdit();

      // Clear any previous timer, then schedule navigation
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        navigate("/admin/job-types", { state: { activeTab: "list" } });
      }, 2500);

    } catch (err) {
      console.error("Error:", err);

      const status = err.response?.status;
      const detail = err.response?.data?.detail;

      if (status === 401) {
        setError("Session expired! Please login again.");
      } else if (status === 422) {
        if (Array.isArray(detail)) {
          setError(`Validation Error: ${detail.map(e => e.msg).join(', ')}`);
        } else {
          setError("Validation failed. Please check your input.");
        }
      } else if (status === 400) {
        setError(detail || "Invalid data.");
      } else if (status === 403) {
        setError("You don't have permission.");
      } else if (status === 409) {
        setError("A job type with this name already exists.");
      } else {
        setError(detail || "Failed to process request.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsEditMode(false);
    setFormData({ type_name: "" });
    setFieldErrors({});
    setError("");
    setSuccess("");
    if (onCancelEdit) onCancelEdit();
    navigate("/admin/job-types", { state: { activeTab: "list" } });
  };

  return (
    <div className="w-full">

      {success && (
        <div className="mb-4 w-full sm:max-w-2xl p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 text-sm flex items-center gap-2 rounded-lg shadow-md">
          <CheckCircle size={18} className="shrink-0" />
          <span className="font-medium">{success}</span>
        </div>
      )}
      {error && (
        <div className="mb-4 w-full sm:max-w-2xl p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-center gap-2 rounded-lg shadow-md">
          <AlertCircle size={18} className="shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
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
            {isEditMode ? (
              <Edit size={16} className="text-[var(--color-primary)]" />
            ) : (
              <Briefcase size={16} className="text-[var(--color-primary)]" />
            )}
          </div>
          <h2 className="text-sm sm:text-base font-medium text-[var(--color-text-heading)]">
            {isEditMode ? "Edit Job Type" : "Add New Job Type"}
          </h2>
        </div>

        {!isAdmin && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle size={14} className="text-red-600 mt-0.5 shrink-0" />
            <p className="text-xs text-red-700">
              You don't have permission to modify job types.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">

            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Job Type Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="text"
                  value={formData.type_name}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder="e.g. Full Time, Remote, Contract"
                  disabled={loading || !isAdmin}
                  className={`
                    w-full pl-9 pr-3 py-2.5 rounded-lg
                    bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)]
                    placeholder:text-[var(--color-text-muted)] border transition-all duration-150
                    focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
                    ${fieldErrors.type_name
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]'
                    }
                  `}
                />
              </div>
              {fieldErrors.type_name && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.type_name}
                </p>
              )}
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
              <Clock size={14} className="text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-700">
                {isEditMode
                  ? "Job type details will be updated immediately."
                  : "Create job types first, then you can create jobs."
                }
              </p>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-6 pt-4 border-t border-[var(--color-border)]">
            {isEditMode && (
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-[var(--color-bg-card)] text-[var(--color-text-heading)] text-xs font-medium border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-150 disabled:opacity-50"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={loading || !isAdmin}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-xs font-medium hover:bg-[var(--color-primary-dark)] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  {isEditMode ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>
                  {isEditMode ? <Save size={14} /> : <Plus size={14} />}
                  {isEditMode ? "Update Job Type" : "Add Job Type"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}