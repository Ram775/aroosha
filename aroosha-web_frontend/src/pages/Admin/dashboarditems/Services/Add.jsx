// src/pages/Admin/dashboarditems/services/Add.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderPlus,
  Plus,
  Loader2,
  Edit,
  Save,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useAdmin } from "../../../../auth/AdminContext";
import {
  createCategory,
  updateCategory,
} from "../../../../api/serviceCategoryApi";

export default function AddCategory({
  categories,
  setCategories,
  onAdd,
  onRefresh,
  editData,
  onCancelEdit,
}) {
  const navigate = useNavigate();
  const { admin } = useAdmin();

  const [formData, setFormData] = useState({
    name: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const canManage =
    admin?.role === "admin" ||
    admin?.role === "super_admin" ||
    admin?.role === "hr";

  // ============================================================
  // 📌 EDIT MODE — prefill form
  // ============================================================
  useEffect(() => {
    if (editData) {
      setIsEditMode(true);
      setFormData({
        name: editData.name || "",
      });
    } else {
      setIsEditMode(false);
      setFormData({ name: "" });
    }
    setFieldErrors({});
    setError("");
    setSuccess("");
  }, [editData]);

  // ============================================================
  // 📌 VALIDATION
  // ============================================================
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Category name is required";
    else if (formData.name.trim().length < 2)
      errors.name = "Name must be at least 2 characters";
    else if (formData.name.trim().length > 100)
      errors.name = "Name must be less than 100 characters";

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
  // 📌 SUBMIT — Create / Update (sirf name bhejna hai)
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
      // ✅ Sirf name bhej rahe hain — display_order backend handle karega
      const payload = {
        name: formData.name.trim(),
      };

      console.log("📤 Submitting payload:", payload);

      let res;
      if (isEditMode && editData) {
        res = await updateCategory(editData.id, payload);
      } else {
        res = await createCategory(payload);
      }

      // ✅ Safe response extraction
      const result = res?.data || res?.result || res;

      console.log("📥 Response:", result);

      // ✅ Success message
      const catName = result?.name || formData.name.trim();
      if (isEditMode) {
        setSuccess(`✅ Category "${catName}" updated successfully!`);
      } else {
        setSuccess(`✅ Category "${catName}" created successfully!`);
      }

      // ✅ Update parent state
      if (setCategories && result) {
        if (isEditMode && editData) {
          setCategories((prev) =>
            prev.map((c) => (c.id === result.id ? result : c))
          );
        } else {
          setCategories([result, ...(categories || [])]);
        }
      }
      if (onAdd && result) onAdd(result);
      if (onRefresh) onRefresh();

      // Reset form
      setFormData({ name: "" });
      setIsEditMode(false);
      if (onCancelEdit) onCancelEdit();

      // Redirect to list
      setTimeout(() => {
        navigate("/admin/services", { state: { activeTab: "list" } });
      }, 2000);
    } catch (err) {
      console.error("❌ Submit error:", err);

      if (err.response?.status === 401) {
        setError("Session expired! Please login again.");
      } else if (err.response?.status === 422) {
        const errors = err.response.data?.detail;
        if (Array.isArray(errors)) {
          const fe = {};
          errors.forEach((e) => {
            const field = e.loc?.[e.loc.length - 1];
            if (field) fe[field] = e.msg;
          });
          setFieldErrors((prev) => ({ ...prev, ...fe }));
          setError(
            `Validation Error: ${errors
              .map((e) => `${e.loc?.join(".")}: ${e.msg}`)
              .join(", ")}`
          );
        } else {
          setError("Validation failed. Please check your input.");
        }
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.detail || "Invalid data.");
      } else if (err.response?.status === 403) {
        setError("You don't have permission.");
      } else if (err.response?.status === 409) {
        setError("A category with this name already exists.");
      } else {
        setError(err.response?.data?.detail || "Failed to process request.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setFormData({ name: "" });
    setFieldErrors({});
    setError("");
    if (onCancelEdit) onCancelEdit();
    navigate("/admin/services", { state: { activeTab: "list" } });
  };

  // ============================================================
  // 📌 RENDER
  // ============================================================
  return (
    <div className="w-full p-4 sm:p-6">
      {success && (
        <div className="mb-4 w-full sm:max-w-3xl p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 text-sm flex items-center gap-2 rounded-lg shadow-md">
          <CheckCircle size={18} className="shrink-0" />
          <span className="font-medium">{success}</span>
        </div>
      )}
      {error && (
        <div className="mb-4 w-full sm:max-w-3xl p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-center gap-2 rounded-lg shadow-md">
          <AlertCircle size={18} className="shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      <div className="w-full sm:max-w-3xl bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--color-border)]">
          <div className="p-2 rounded-lg bg-[var(--color-primary-pale)]">
            {isEditMode ? (
              <Edit size={16} className="text-[var(--color-primary)]" />
            ) : (
              <FolderPlus size={16} className="text-[var(--color-primary)]" />
            )}
          </div>
          <h2 className="text-sm sm:text-base font-medium text-[var(--color-text-heading)]">
            {isEditMode ? "Edit Category" : "Create New Category"}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            {/* Category Name */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Category Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FolderPlus
                    size={14}
                    className="text-[var(--color-text-muted)]"
                  />
                </span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g. Web Development"
                  disabled={loading}
                  maxLength={100}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-lg bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-muted)] border transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                    fieldErrors.name
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"
                  }`}
                />
              </div>
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.name}
                </p>
              )}
            </div>
          </div>

          <div className="mt-5 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
            <Clock size={14} className="text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700">
              {isEditMode
                ? "Category details will be updated immediately."
                : `Category will be created as INACTIVE. Toggle it ON in the list to publish it.`}
            </p>
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
              disabled={loading || !canManage}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-xs font-medium hover:bg-[var(--color-primary-dark)] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  {isEditMode ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  {isEditMode ? <Save size={14} /> : <Plus size={14} />}
                  {isEditMode ? "Update Category" : "Create Category"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}