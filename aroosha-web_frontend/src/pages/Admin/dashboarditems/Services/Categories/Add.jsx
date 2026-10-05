// src/pages/Admin/dashboarditems/Services/Categories/Add.jsx
import { useState, useEffect } from "react";
import {
  Wrench,
  Plus,
  Loader2,
  Edit,
  Save,
  AlertCircle,
  CheckCircle,
  Clock,
  Upload,
} from "lucide-react";
import { useAdmin } from "../../../../../auth/AdminContext";
import {
  createService,
  updateService,
  uploadServiceIcon,
} from "../../../../../api/servicesApi";
import { getAllCategories } from "../../../../../api/serviceCategoryApi";
import { getApprovedDepartments } from "../../../../../api/departments";

export default function AddService({
  services,
  setServices,
  onAdd,
  onRefresh,
  editData,
  onCancelEdit,
  onSuccess,
}) {
  const { admin } = useAdmin();

  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    department_id: "",
    description: "",
  });

  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);

  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loadingMeta, setLoadingMeta] = useState(false);

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
  // 📌 LOAD CATEGORIES + DEPARTMENTS
  // ============================================================
  useEffect(() => {
    const loadMeta = async () => {
      setLoadingMeta(true);
      try {
        const [cats, deps] = await Promise.all([
          getAllCategories().catch(() => []),
          getApprovedDepartments().catch(() => []),
        ]);
        setCategories(Array.isArray(cats) ? cats : []);
        setDepartments(Array.isArray(deps) ? deps : []);
      } catch (err) {
        console.error("❌ Meta load error:", err);
      } finally {
        setLoadingMeta(false);
      }
    };
    loadMeta();
  }, []);

  // ============================================================
  // 📌 EDIT MODE
  // ============================================================
  useEffect(() => {
    if (editData) {
      setIsEditMode(true);
      setFormData({
        title: editData.title || "",
        category_id: editData.category_id || "",
        department_id: editData.department_id || "",
        description: editData.description || "",
      });
      setIconPreview(editData.icon_url || null);
      setIconFile(null);
    } else {
      setIsEditMode(false);
      setFormData({
        title: "",
        category_id: "",
        department_id: "",
        description: "",
      });
      setIconFile(null);
      setIconPreview(null);
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

    if (!formData.title.trim()) errors.title = "Service title is required";
    else if (formData.title.trim().length < 2)
      errors.title = "Title must be at least 2 characters";
    else if (formData.title.trim().length > 100)
      errors.title = "Title must be less than 100 characters";

    if (!formData.category_id)
      errors.category_id = "Please select a category";

    if (!formData.department_id)
      errors.department_id = "Please select a department";

    if (formData.description && formData.description.length > 1000)
      errors.description = "Description must be less than 1000 characters";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (fieldErrors[field]) {
      setFieldErrors({ ...fieldErrors, [field]: "" });
    }
  };

  const handleIconChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFieldErrors((prev) => ({
        ...prev,
        icon: "Only image files are allowed",
      }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setFieldErrors((prev) => ({
        ...prev,
        icon: "Image must be less than 2MB",
      }));
      return;
    }

    setIconFile(file);
    setIconPreview(URL.createObjectURL(file));
    setFieldErrors((prev) => ({ ...prev, icon: "" }));
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
      const payload = {
        title: formData.title.trim(),
        category_id: Number(formData.category_id),
        department_id: Number(formData.department_id),
        description: formData.description.trim(),
      };

      // ✅ CREATE MODE: Always inactive by default
      // ✅ EDIT MODE: Don't touch is_active (preserve current)
      if (!isEditMode) {
        payload.is_active = false;
      }

      console.log("📤 Submitting payload:", payload);

      let res;
      if (isEditMode && editData) {
        res = await updateService(editData.id, payload);
      } else {
        res = await createService(payload);
      }

      const result = res?.data || res?.result || res;
      console.log("📥 Response:", result);

      // ✅ Icon upload (agar file select ki gayi hai)
      if (iconFile && result?.id) {
        try {
          const iconRes = await uploadServiceIcon(result.id, iconFile);
          const iconData = iconRes?.data || iconRes?.result || iconRes;
          if (iconData?.icon_url) result.icon_url = iconData.icon_url;
          console.log("📥 Icon uploaded:", iconData);
        } catch (iconErr) {
          console.error("❌ Icon upload failed:", iconErr);
          setError(
            iconErr.response?.data?.detail ||
              "Service saved, but icon upload failed."
          );
        }
      }

      const svcTitle = result?.title || formData.title.trim();
      if (isEditMode) {
        setSuccess(`✅ Service "${svcTitle}" updated successfully!`);
      } else {
        setSuccess(
          `✅ Service "${svcTitle}" created successfully! It's INACTIVE — toggle it ON in the list to publish.`
        );
      }

      // ✅ Update parent state
      if (setServices && result) {
        if (isEditMode && editData) {
          setServices((prev) =>
            prev.map((s) => (s.id === result.id ? result : s))
          );
        } else {
          setServices([result, ...(services || [])]);
        }
      }
      if (onAdd && result) onAdd(result);
      if (onRefresh) onRefresh();

      // Reset
      setFormData({
        title: "",
        category_id: "",
        department_id: "",
        description: "",
      });
      setIconFile(null);
      setIconPreview(null);
      setIsEditMode(false);
      if (onCancelEdit) onCancelEdit();

      // ✅ 2 sec baad list pe wapas
      setTimeout(() => {
        if (onSuccess) onSuccess();
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
        setError("A service with this title already exists.");
      } else {
        setError(err.response?.data?.detail || "Failed to process request.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setFormData({
      title: "",
      category_id: "",
      department_id: "",
      description: "",
    });
    setIconFile(null);
    setIconPreview(null);
    setFieldErrors({});
    setError("");
    if (onCancelEdit) onCancelEdit();
    if (onSuccess) onSuccess();
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
              <Wrench size={16} className="text-[var(--color-primary)]" />
            )}
          </div>
          <h2 className="text-sm sm:text-base font-medium text-[var(--color-text-heading)]">
            {isEditMode ? "Edit Service" : "Create New Service"}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Service Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="e.g. Web Development Service"
                disabled={loading}
                maxLength={100}
                className={`w-full px-3 py-2.5 rounded-lg bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-muted)] border transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                  fieldErrors.title
                    ? "border-red-500 focus:border-red-500"
                    : "border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"
                }`}
              />
              {fieldErrors.title && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.title}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => handleChange("category_id", e.target.value)}
                disabled={loading || loadingMeta}
                className={`w-full px-3 py-2.5 rounded-lg bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)] border transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                  fieldErrors.category_id
                    ? "border-red-500 focus:border-red-500"
                    : "border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"
                }`}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {fieldErrors.category_id && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.category_id}
                </p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.department_id}
                onChange={(e) => handleChange("department_id", e.target.value)}
                disabled={loading || loadingMeta}
                className={`w-full px-3 py-2.5 rounded-lg bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)] border transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                  fieldErrors.department_id
                    ? "border-red-500 focus:border-red-500"
                    : "border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"
                }`}
              >
                <option value="">Select department</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.department_name || d.name}
                  </option>
                ))}
              </select>
              {fieldErrors.department_id && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.department_id}
                </p>
              )}
            </div>

            {/* Icon Upload */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Icon (optional)
              </label>
              <label
                className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-lg bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)] border cursor-pointer transition-all duration-150 hover:border-[var(--color-primary)] ${
                  fieldErrors.icon
                    ? "border-red-500"
                    : "border-[var(--color-border)]"
                }`}
              >
                <Upload size={14} className="text-[var(--color-text-muted)]" />
                <span className="truncate">
                  {iconFile ? iconFile.name : "Choose image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIconChange}
                  disabled={loading}
                  className="hidden"
                />
              </label>
              {fieldErrors.icon && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.icon}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                disabled={loading}
                rows={4}
                maxLength={1000}
                placeholder="Write a short description..."
                className={`w-full px-3 py-2.5 rounded-lg bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-muted)] border transition-all duration-150 focus:outline-none disabled:opacity-50 resize-none ${
                  fieldErrors.description
                    ? "border-red-500 focus:border-red-500"
                    : "border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"
                }`}
              />
              {fieldErrors.description && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.description}
                </p>
              )}
            </div>

            {/* Icon Preview */}
            {iconPreview && (
              <div className="sm:col-span-2">
                <p className="text-xs font-medium text-[var(--color-text-heading)] mb-2">
                  Icon Preview
                </p>
                <div className="w-20 h-20 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-muted)] flex items-center justify-center overflow-hidden">
                  <img
                    src={iconPreview}
                    alt="Icon preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
            <Clock size={14} className="text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700">
              {isEditMode
                ? "Service details will be updated immediately. Active status will remain unchanged."
                : "Service will be created as INACTIVE. Toggle it ON in the list to publish it on the website."}
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
                  {isEditMode ? "Update Service" : "Create Service"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}