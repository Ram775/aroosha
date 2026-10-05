// src/pages/Admin/dashboarditems/Departments/Add.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Building2, Plus, User, Clock, 
  Loader2, Edit, Save, AlertCircle, CheckCircle 
} from "lucide-react";
import { useAdmin } from "../../../../auth/AdminContext";
import { 
  createDepartment, updateDepartment, getApprovedDepartments 
} from "../../../../api/departments";

export default function AddDepartment({ 
  departments, 
  setDepartments, 
  onAdd, 
  onRefresh,
  editData,
  onCancelEdit 
}) {
  const navigate = useNavigate();
  const { admin } = useAdmin();

  const [formData, setFormData] = useState({
    department_name: "",
    department_head: "",
  });
  const [approvedDepartments, setApprovedDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const isAdmin = admin?.role === 'admin' || admin?.role === 'super_admin';

  // ✅ FETCH APPROVED DEPARTMENTS
  useEffect(() => {
    const fetchApprovedDepartments = async () => {
      setLoadingDepartments(true);
      try {
        const data = await getApprovedDepartments();
        setApprovedDepartments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching approved departments:", err);
      } finally {
        setLoadingDepartments(false);
      }
    };
    fetchApprovedDepartments();
  }, []);

  // ✅ EDIT MODE CHECK
  useEffect(() => {
    if (editData) {
      setIsEditMode(true);
      setFormData({
        department_name: editData.department_name || "",
        department_head: editData.department_head || "",
      });
    } else {
      setIsEditMode(false);
      setFormData({
        department_name: "",
        department_head: "",
      });
    }
    setFieldErrors({});
  }, [editData]);

  // ============================================================
  // 📌 VALIDATION
  // ============================================================

  const validateForm = () => {
    const errors = {};

    // Department Name
    if (!formData.department_name.trim()) {
      errors.department_name = "Department name is required";
    } else if (formData.department_name.trim().length < 3) {
      errors.department_name = "Department name must be at least 3 characters";
    } else if (formData.department_name.trim().length > 100) {
      errors.department_name = "Department name must be less than 100 characters";
    }

    // Department Head
    if (!formData.department_head.trim()) {
      errors.department_head = "Department head is required";
    } else if (formData.department_head.trim().length < 3) {
      errors.department_head = "Department head name must be at least 3 characters";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(formData.department_head.trim())) {
      errors.department_head = "Only letters, spaces, dots, apostrophes and hyphens allowed";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (fieldErrors[field]) {
      setFieldErrors({ ...fieldErrors, [field]: "" });
    }
  };

  // ============================================================
  // 📌 SUBMIT
  // ============================================================

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
        result = await updateDepartment(
          editData.id,
          formData.department_name.trim(),
          formData.department_head.trim()
        );
        setSuccess(`✅ Department "${result.department_name}" updated successfully!`);
      } else {
        result = await createDepartment(
          formData.department_name.trim(),
          formData.department_head.trim()
        );
        setSuccess(`✅ Department "${result.department_name}" created successfully!`);
      }

      if (setDepartments) {
        setDepartments([result, ...(departments || [])]);
      }
      if (onAdd) onAdd(result);
      if (onRefresh) onRefresh();

      setFormData({ department_name: "", department_head: "" });
      setIsEditMode(false);
      if (onCancelEdit) onCancelEdit();
setTimeout(() => {
  navigate("/admin/departments", { state: { activeTab: "list" } });
}, 2500);

    } catch (err) {
      console.error("Error:", err);

      if (err.response?.status === 401) {
        setError("Session expired! Please login again.");
      } else if (err.response?.status === 422) {
        const errors = err.response.data?.detail;
        if (Array.isArray(errors)) {
          setError(`Validation Error: ${errors.map(e => e.msg).join(', ')}`);
        } else {
          setError("Validation failed. Please check your input.");
        }
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.detail || "Invalid data. Please check your input.");
      } else if (err.response?.status === 403) {
        setError("You don't have permission to perform this action.");
      } else if (err.response?.status === 409) {
        setError("A department with this name already exists.");
      } else {
        setError(err.response?.data?.detail || "Failed to process request. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

 const handleCancel = () => {
  setIsEditMode(false);
  setFormData({ department_name: "", department_head: "" });
  setFieldErrors({});
  setError("");
  if (onCancelEdit) onCancelEdit();
  navigate("/admin/departments", { state: { activeTab: "list" } });  
};

  // ============================================================
  // 📌 RENDER
  // ============================================================

  return (
    <div className="w-full ">

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 🎯 ALERTS                                               */}
      {/* ═══════════════════════════════════════════════════════ */}
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

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 🎯 FORM CARD — Left side with shadow                     */}
      {/* ═══════════════════════════════════════════════════════ */}
     <div className="
        w-full max-w-2xl 
        bg-[var(--color-bg-card)] 
        border border-[var(--color-border)] 
        rounded-xl 
        p-6 
        shadow-lg 
        shadow-[var(--color-shadow)]
      ">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--color-border)]">
          {isEditMode ? (
            <>
              <div className="p-2 rounded-lg bg-[var(--color-primary-pale)]">
                <Edit size={16} className="text-[var(--color-primary)]" />
              </div>
              <h2 className="text-sm sm:text-base font-medium text-[var(--color-text-heading)]">
                Edit Department
              </h2>
            </>
          ) : (
            <>
              <div className="p-2 rounded-lg bg-[var(--color-primary-pale)]">
                <Building2 size={16} className="text-[var(--color-primary)]" />
              </div>
              <h2 className="text-sm sm:text-base font-medium text-[var(--color-text-heading)]">
                Add New Department
              </h2>
            </>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">

            {/* Department Name */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Department Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building2 size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="text"
                  value={formData.department_name}
                  onChange={(e) => handleChange("department_name", e.target.value)}
                  placeholder="e.g. Engineering"
                  disabled={loading}
                  className={`
                    w-full pl-9 pr-3 py-2.5 
                    rounded-lg 
                    bg-[var(--color-bg-card)] 
                    text-sm text-[var(--color-text-heading)] 
                    placeholder:text-[var(--color-text-muted)]
                    border transition-all duration-150
                    focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${fieldErrors.department_name
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]'
                    }
                  `}
                />
              </div>
              {fieldErrors.department_name && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.department_name}
                </p>
              )}
            </div>

            {/* Department Head */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Department Head <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="text"
                  value={formData.department_head}
                  onChange={(e) => handleChange("department_head", e.target.value)}
                  placeholder="Enter head name"
                  disabled={loading}
                  className={`
                    w-full pl-9 pr-3 py-2.5 
                    rounded-lg 
                    bg-[var(--color-bg-card)] 
                    text-sm text-[var(--color-text-heading)] 
                    placeholder:text-[var(--color-text-muted)]
                    border transition-all duration-150
                    focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${fieldErrors.department_head
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]'
                    }
                  `}
                />
              </div>
              {fieldErrors.department_head && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.department_head}
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
              <Clock size={14} className="text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-700">
                {isEditMode
                  ? "Department details will be updated immediately."
                  : `Department will be created in "Pending" state. ${isAdmin ? "You can approve it from the list." : "Admin must approve it."}`
                }
              </p>
            </div>

          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-6 pt-4 border-t border-[var(--color-border)]">
            {isEditMode && (
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-[var(--color-bg-card)] text-[var(--color-text-heading)] text-xs font-medium border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
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
                  {isEditMode ? "Update Department" : "Add Department"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}