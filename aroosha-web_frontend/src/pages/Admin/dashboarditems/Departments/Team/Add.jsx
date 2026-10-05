// src/pages/Admin/dashboarditems/Team/Add.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, Plus, User, Clock, 
  Loader2, Edit, Save, AlertCircle, CheckCircle 
} from "lucide-react";
import { useAdmin } from "../../../../../auth/AdminContext";
import FilterSelect from "../../../../../components/ui/FilterSelect";
import { createTeam, updateTeam, getApprovedDepartments } from "../../../../../api/teamApi";

export default function AddTeam({ 
  teams, 
  setTeams, 
  onAdd, 
  onRefresh, 
  editData, 
  onCancelEdit 
}) {
  const navigate = useNavigate();
  const { admin } = useAdmin();

  const [formData, setFormData] = useState({
    team_name: "",
    team_lead: "",
    department_id: "",
  });
  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const isAdmin = admin?.role === 'admin' || admin?.role === 'super_admin';

  // ✅ Edit mode data
  useEffect(() => {
    if (editData) {
      setIsEditMode(true);
      setFormData({
        team_name: editData.team_name || "",
        team_lead: editData.team_lead || "",
        department_id: editData.department_id || "",
      });
    } else {
      setIsEditMode(false);
      setFormData({ team_name: "", team_lead: "", department_id: "" });
    }
    setFieldErrors({});
  }, [editData]);

  // ✅ FETCH DEPARTMENTS
  useEffect(() => {
    const fetchDepartments = async () => {
      setLoadingDepartments(true);
      try {
        const data = await getApprovedDepartments();
        console.log("Departments:", data);
        setDepartments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching departments:", err);
        setError("Failed to load departments");
      } finally {
        setLoadingDepartments(false);
      }
    };
    fetchDepartments();
  }, []);

  // ============================================================
  // 📌 VALIDATION
  // ============================================================

  const validateForm = () => {
    const errors = {};

    if (!formData.team_name.trim()) {
      errors.team_name = "Team name is required";
    } else if (formData.team_name.trim().length < 3) {
      errors.team_name = "Team name must be at least 3 characters";
    } else if (formData.team_name.trim().length > 100) {
      errors.team_name = "Team name must be less than 100 characters";
    }

    if (!formData.team_lead.trim()) {
      errors.team_lead = "Team lead is required";
    } else if (formData.team_lead.trim().length < 3) {
      errors.team_lead = "Team lead name must be at least 3 characters";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(formData.team_lead.trim())) {
      errors.team_lead = "Only letters, spaces, dots, apostrophes and hyphens allowed";
    }

    if (!formData.department_id) {
      errors.department_id = "Please select a department";
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
        result = await updateTeam(
          editData.id,
          formData.team_name.trim(),
          formData.team_lead.trim(),
          formData.department_id
        );
        setSuccess(`✅ Team "${result.team_name}" updated successfully!`);
      } else {
        result = await createTeam(
          formData.team_name.trim(),
          formData.team_lead.trim(),
          formData.department_id
        );
        setSuccess(`✅ Team "${result.team_name}" created successfully!`);
      }

      if (setTeams) setTeams([result, ...(teams || [])]);
      if (onAdd) onAdd(result);
      if (onRefresh) onRefresh();

      setFormData({ team_name: "", team_lead: "", department_id: "" });
      setIsEditMode(false);
      if (onCancelEdit) onCancelEdit();

      setTimeout(() => {
        navigate("/admin/team", { state: { activeTab: "list" } });
      }, 2500);

    } catch (err) {
      console.error("Error:", err);

      if (err.response?.status === 422) {
        const errors = err.response.data?.detail;
        if (Array.isArray(errors)) {
          setError(`Validation Error: ${errors.map(e => e.msg).join(', ')}`);
        } else {
          setError("Validation failed. Please check your input.");
        }
      } else if (err.response?.status === 401) {
        setError("Session expired! Please login again.");
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.detail || "Invalid data. Please check your input.");
      } else if (err.response?.status === 403) {
        setError("You don't have permission to perform this action.");
      } else if (err.response?.status === 409) {
        setError("A team with this name already exists.");
      } else {
        setError(err.response?.data?.detail || "Failed to process request. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setFormData({ team_name: "", team_lead: "", department_id: "" });
    setFieldErrors({});
    setError("");
    if (onCancelEdit) onCancelEdit();
    navigate("/admin/team", { state: { activeTab: "list" } });
  };

  const departmentOptions = departments.map((dept) => ({
    value: dept.id,
    label: dept.department_name || dept.name,
  }));

  // ============================================================
  // 📌 RENDER
  // ============================================================

  return (
    <div className="w-full">
      
      {/* ═══════════════════════════════════════════════════════ */}
      {/* 🎯 ALERTS                                               */}
      {/* ═══════════════════════════════════════════════════════ */}
      {success && (
        <div className="mb-4 max-w-2xl p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 text-sm flex items-center gap-2 rounded-lg shadow-sm">
          <CheckCircle size={18} className="shrink-0" /> 
          <span className="font-medium">{success}</span>
        </div>
      )}
      {error && (
        <div className="mb-4 max-w-2xl p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm flex items-center gap-2 rounded-lg shadow-sm">
          <AlertCircle size={18} className="shrink-0" /> 
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 🎯 FORM CARD — Left side, with shadow                    */}
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
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--color-border)]">
          {isEditMode ? (
            <>
              <div className="p-2 rounded-lg bg-[var(--color-primary-pale)]">
                <Edit size={16} className="text-[var(--color-primary)]" />
              </div>
              <h2 className="text-base font-medium text-[var(--color-text-heading)]">
                Edit Team
              </h2>
            </>
          ) : (
            <>
              <div className="p-2 rounded-lg bg-[var(--color-primary-pale)]">
                <Users size={16} className="text-[var(--color-primary)]" />
              </div>
              <h2 className="text-base font-medium text-[var(--color-text-heading)]">
                Add New Team
              </h2>
            </>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">

            {/* Team Name */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Team Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="text"
                  value={formData.team_name}
                  onChange={(e) => handleChange("team_name", e.target.value)}
                  placeholder="e.g. Backend Team"
                  disabled={loading || loadingDepartments}
                  className={`
                    w-full pl-9 pr-3 py-2.5 
                    rounded-lg 
                    bg-[var(--color-bg-card)] 
                    text-sm text-[var(--color-text-heading)] 
                    placeholder:text-[var(--color-text-muted)]
                    border transition-all duration-150
                    focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${fieldErrors.team_name
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]'
                    }
                  `}
                />
              </div>
              {fieldErrors.team_name && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.team_name}
                </p>
              )}
            </div>

            {/* Team Lead */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Team Lead <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="text"
                  value={formData.team_lead}
                  onChange={(e) => handleChange("team_lead", e.target.value)}
                  placeholder="Enter team lead name"
                  disabled={loading || loadingDepartments}
                  className={`
                    w-full pl-9 pr-3 py-2.5 
                    rounded-lg 
                    bg-[var(--color-bg-card)] 
                    text-sm text-[var(--color-text-heading)] 
                    placeholder:text-[var(--color-text-muted)]
                    border transition-all duration-150
                    focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${fieldErrors.team_lead
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]'
                    }
                  `}
                />
              </div>
              {fieldErrors.team_lead && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.team_lead}
                </p>
              )}
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Department <span className="text-red-500">*</span>
              </label>
              <FilterSelect
                value={formData.department_id}
                onChange={(e) => handleChange("department_id", e.target.value)}
                options={departmentOptions}
                placeholder={
                  loadingDepartments ? "Loading departments..." : "Select department"
                }
                disabled={loading || loadingDepartments}
                className="w-full"
              />
              {fieldErrors.department_id && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.department_id}
                </p>
              )}
            </div>

            {/* Loading departments */}
            {loadingDepartments && (
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-heading)] opacity-70">
                <Loader2 size={14} className="animate-spin" />
                Loading departments...
              </div>
            )}

            {/* No departments */}
            {!loadingDepartments && departments.length === 0 && !error && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                <AlertCircle size={14} className="text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700">
                  No approved departments available. Please create and approve a department first.
                </p>
              </div>
            )}

            {/* Info Box */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
              <Clock size={14} className="text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-700">
                {isEditMode
                  ? "Team details will be updated immediately."
                  : `Team will be created in "Pending" state. ${isAdmin ? "You can activate it from the list." : "Admin must activate it."}`
                }
              </p>
            </div>

          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[var(--color-border)]">
            {isEditMode && (
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-[var(--color-bg-card)] text-[var(--color-text-heading)] text-xs font-medium border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={loading || loadingDepartments}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-xs font-medium hover:bg-[var(--color-primary-dark)] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  {isEditMode ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>
                  {isEditMode ? <Save size={14} /> : <Plus size={14} />}
                  {isEditMode ? "Update Team" : "Add Team"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}