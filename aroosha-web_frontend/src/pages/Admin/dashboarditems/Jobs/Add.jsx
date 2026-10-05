// src/pages/Admin/dashboarditems/jobs/Add.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase, Plus, Building2, MapPin, Clock, FileText, Award,
  Loader2, Edit, Save, AlertCircle, CheckCircle
} from "lucide-react";
import { useAdmin } from "../../../../auth/AdminContext";
import FilterSelect from "../../../../components/ui/FilterSelect";
import { createJob, updateJob } from "../../../../api/jobsApi";
import { getJobTypes } from "../../../../api/jobTypesApi";
import { getApprovedDepartments } from "../../../../api/departments";

// 🔧 helper — kisi bhi shape ka response array me convert karo
const toArray = (data) => {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && Array.isArray(data.results)) return data.results;
  if (data && Array.isArray(data.items)) return data.items;
  return [];
};

export default function AddJob({
  jobs,
  setJobs,
  onAdd,
  onRefresh,
  editData,
  onCancelEdit,
}) {
  const navigate = useNavigate();
  const { admin } = useAdmin();

  const [formData, setFormData] = useState({
    title: "",
    designation: "",
    description: "",
    department_id: "",
    job_type_id: "",
    location: "",
    experience_required: "",
  });

  const [departments, setDepartments] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
const canManageJobs =
  admin?.role === "admin" ||
  admin?.role === "super_admin" ||
  admin?.role === "hr";

  // ============================================================
  // 📌 FETCH DEPARTMENTS + JOB TYPES
  // ============================================================
  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true);
      setError("");
      try {
        const [deptRes, jtRes] = await Promise.all([
          getApprovedDepartments(),
          getJobTypes(),
        ]);

        // Debug — console me dekh lo kya aa raha hai
        console.log("Departments raw:", deptRes);
        console.log("JobTypes raw:", jtRes);

        setDepartments(toArray(deptRes));
        setJobTypes(toArray(jtRes));
      } catch (err) {
        console.error("Error fetching dropdown data:", err);
        setError(
          err.response?.data?.detail || "Failed to load dropdown data"
        );
      } finally {
        setLoadingData(false);
      }
    };
    fetchData();
  }, []);

  // ============================================================
  // 📌 EDIT MODE
  // ============================================================
  useEffect(() => {
    if (editData) {
      setIsEditMode(true);
      setFormData({
        title: editData.title || "",
        designation: editData.designation || "",
        description: editData.description || "",
        department_id: editData.department_id ?? "",
        job_type_id: editData.job_type_id ?? "",
        location: editData.location || "",
        experience_required: editData.experience_required || "",
      });
    } else {
      setIsEditMode(false);
      setFormData({
        title: "",
        designation: "",
        description: "",
        department_id: "",
        job_type_id: "",
        location: "",
        experience_required: "",
      });
    }
    setFieldErrors({});
  }, [editData]);

  // ============================================================
  // 📌 VALIDATION
  // ============================================================
  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) errors.title = "Job title is required";
    else if (formData.title.trim().length < 3)
      errors.title = "Title must be at least 3 characters";
    else if (formData.title.trim().length > 150)
      errors.title = "Title must be less than 150 characters";

    if (!formData.designation.trim())
      errors.designation = "Designation is required";
    else if (formData.designation.trim().length < 2)
      errors.designation = "Designation must be at least 2 characters";

    if (!formData.description.trim())
      errors.description = "Description is required";
    else if (formData.description.trim().length < 20)
      errors.description = "Description must be at least 20 characters";
    else if (formData.description.trim().length > 5000)
      errors.description = "Description must be less than 5000 characters";

    if (!formData.department_id)
      errors.department_id = "Please select a department";

    if (!formData.job_type_id)
      errors.job_type_id = "Please select a job type";

    if (!formData.location.trim()) errors.location = "Location is required";

    if (!formData.experience_required.trim())
      errors.experience_required = "Experience is required";

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
  // 📌 SUBMIT — payload me integers bhejo
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
      // ✅ backend integer expect kar raha hai
      const payload = {
        title: formData.title.trim(),
        designation: formData.designation.trim(),
        description: formData.description.trim(),
        department_id: Number(formData.department_id),
        job_type_id: Number(formData.job_type_id),
        location: formData.location.trim(),
        experience_required: formData.experience_required.trim(),
      };

      console.log("Submitting payload:", payload);

      let result;
      if (isEditMode && editData) {
        result = await updateJob(editData.id, payload);
        setSuccess(`✅ Job "${result.title}" updated successfully!`);
      } else {
        result = await createJob(payload);
        setSuccess(`✅ Job "${result.title}" created successfully!`);
      }

      if (setJobs) setJobs([result, ...(jobs || [])]);
      if (onAdd) onAdd(result);
      if (onRefresh) onRefresh();

      setFormData({
        title: "",
        designation: "",
        description: "",
        department_id: "",
        job_type_id: "",
        location: "",
        experience_required: "",
      });
      setIsEditMode(false);
      if (onCancelEdit) onCancelEdit();

      setTimeout(() => {
        navigate("/admin/jobs", { state: { activeTab: "list" } });
      }, 2500);
    } catch (err) {
      console.error("Error:", err);

      if (err.response?.status === 401) {
        setError("Session expired! Please login again.");
      } else if (err.response?.status === 422) {
        const errors = err.response.data?.detail;
        if (Array.isArray(errors)) {
          // field-wise errors bhi set karo
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
        setError("A job with this title already exists.");
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
      designation: "",
      description: "",
      department_id: "",
      job_type_id: "",
      location: "",
      experience_required: "",
    });
    setFieldErrors({});
    setError("");
    if (onCancelEdit) onCancelEdit();
    navigate("/admin/jobs", { state: { activeTab: "list" } });
  };

  // ============================================================
  // 📌 DROPDOWN OPTIONS
  // ============================================================
  const departmentOptions = departments.map((d) => ({
    value: d.id,
    label: d.department_name || d.name || d.title || `Dept #${d.id}`,
  }));

  const jobTypeOptions = jobTypes.map((jt) => ({
    value: jt.id,
    label: jt.type_name || jt.name || jt.job_type_name || `Type #${jt.id}`,
  }));

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
              <Briefcase size={16} className="text-[var(--color-primary)]" />
            )}
          </div>
          <h2 className="text-sm sm:text-base font-medium text-[var(--color-text-heading)]">
            {isEditMode ? "Edit Job" : "Create New Job"}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Job Title */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Job Title <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="e.g. Senior React Developer"
                  disabled={loading}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-lg bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-muted)] border transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                    fieldErrors.title
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"
                  }`}
                />
              </div>
              {fieldErrors.title && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.title}
                </p>
              )}
            </div>

            {/* Designation */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Designation <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Award size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => handleChange("designation", e.target.value)}
                  placeholder="e.g. Team Lead"
                  disabled={loading}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-lg bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-muted)] border transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                    fieldErrors.designation
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"
                  }`}
                />
              </div>
              {fieldErrors.designation && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.designation}
                </p>
              )}
            </div>

            {/* Department Dropdown */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Department <span className="text-red-500">*</span>
              </label>
              <FilterSelect
                value={formData.department_id}
                onChange={(e) => handleChange("department_id", e.target.value)}
                options={departmentOptions}
                placeholder={
                  loadingData
                    ? "Loading..."
                    : departmentOptions.length === 0
                    ? "No departments available"
                    : "Select department"
                }
                disabled={loading || loadingData || departmentOptions.length === 0}
                className="w-full"
              />
              {fieldErrors.department_id && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.department_id}
                </p>
              )}
            </div>

            {/* Job Type Dropdown */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Job Type <span className="text-red-500">*</span>
              </label>
              <FilterSelect
                value={formData.job_type_id}
                onChange={(e) => handleChange("job_type_id", e.target.value)}
                options={jobTypeOptions}
                placeholder={
                  loadingData
                    ? "Loading..."
                    : jobTypeOptions.length === 0
                    ? "No job types available"
                    : "Select job type"
                }
                disabled={loading || loadingData || jobTypeOptions.length === 0}
                className="w-full"
              />
              {fieldErrors.job_type_id && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.job_type_id}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Location <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  placeholder="e.g. Mumbai, Remote"
                  disabled={loading}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-lg bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-muted)] border transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                    fieldErrors.location
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"
                  }`}
                />
              </div>
              {fieldErrors.location && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.location}
                </p>
              )}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Experience Required <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="text"
                  value={formData.experience_required}
                  onChange={(e) =>
                    handleChange("experience_required", e.target.value)
                  }
                  placeholder="e.g. 2-4 years"
                  disabled={loading}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-lg bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-muted)] border transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                    fieldErrors.experience_required
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"
                  }`}
                />
              </div>
              {fieldErrors.experience_required && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.experience_required}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                  <FileText size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Describe the job role, responsibilities, requirements..."
                  rows={5}
                  disabled={loading}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-lg bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-muted)] border transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed resize-none ${
                    fieldErrors.description
                      ? "border-red-500 focus:border-red-500"
                      : "border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]"
                  }`}
                />
              </div>
              {fieldErrors.description && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.description}
                </p>
              )}
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                {formData.description.length} / 5000 characters
              </p>
            </div>
          </div>

          <div className="mt-5 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
            <Clock size={14} className="text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700">
            {isEditMode
  ? "Job details will be updated immediately."
  : `Job will be created as INACTIVE. Toggle it ON in the list to publish it.`}
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
              disabled={loading || loadingData}
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
                  {isEditMode ? "Update Job" : "Create Job"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}