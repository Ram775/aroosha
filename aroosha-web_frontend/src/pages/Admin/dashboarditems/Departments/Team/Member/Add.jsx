// src/pages/Admin/dashboarditems/Member/Add.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, Plus, User, Building2, Calendar,
  Link, Clock, Edit, Save, X, Briefcase, Image,
  Loader2, AlertCircle, CheckCircle
} from "lucide-react";
import { useAdmin } from "../../../../../../auth/AdminContext";
import FilterSelect from "../../../../../../components/ui/FilterSelect";
import { createTeamMember, updateTeamMember } from "../../../../../../api/teamMembersApi";
import { getApprovedDepartments } from "../../../../../../api/departments";
import { getTeams } from "../../../../../../api/teamApi";

export default function AddTeamMember({ 
  members, 
  setMembers, 
  onAdd, 
  onRefresh,
  editData,
  onCancelEdit 
}) {
  const navigate = useNavigate();
  const { admin } = useAdmin();

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    department_id: "",
    team_id: "",
    joining_date: "",
    photo_url: "",
    linkedin_url: "",
  });

  const [departments, setDepartments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const isAdmin = admin?.role === 'admin' || admin?.role === 'super_admin';

  // ============================================================
  // 📌 FETCH DEPARTMENTS
  // ============================================================

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoadingDepartments(true);
      try {
        const data = await getApprovedDepartments();
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
  // 📌 FETCH TEAMS — When Department changes
  // ============================================================

  useEffect(() => {
    const fetchTeams = async () => {
      if (!formData.department_id) {
        setTeams([]);
        return;
      }

      setLoadingTeams(true);
      try {
        const allTeams = await getTeams();
        const filteredTeams = allTeams.filter(
          team => team.department_id === parseInt(formData.department_id)
        );
        setTeams(filteredTeams);
      } catch (err) {
        console.error("Error fetching teams:", err);
        setError("Failed to load teams");
      } finally {
        setLoadingTeams(false);
      }
    };
    fetchTeams();
  }, [formData.department_id]);

  // ============================================================
  // 📌 EDIT MODE
  // ============================================================

  useEffect(() => {
    if (editData) {
      setIsEditMode(true);
      setFormData({
        name: editData.name || "",
        designation: editData.designation || "",
        department_id: editData.department_id || "",
        team_id: editData.team_id || "",
        joining_date: editData.joining_date || "",
        photo_url: editData.photo_url || "",
        linkedin_url: editData.linkedin_url || "",
      });
    } else {
      setIsEditMode(false);
      setFormData({
        name: "", designation: "", department_id: "",
        team_id: "", joining_date: "", photo_url: "", linkedin_url: "",
      });
    }
    setFieldErrors({});
  }, [editData]);

  // ============================================================
  // 📌 VALIDATION
  // ============================================================

  const validateForm = () => {
    const errors = {};

    // Name
    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    } else if (formData.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters";
    } else if (formData.name.trim().length > 100) {
      errors.name = "Name must be less than 100 characters";
    } else if (!/^[a-zA-Z\s.'-]+$/.test(formData.name.trim())) {
      errors.name = "Only letters, spaces, dots, apostrophes and hyphens allowed";
    }

    // Designation
    if (!formData.designation.trim()) {
      errors.designation = "Designation is required";
    } else if (formData.designation.trim().length < 2) {
      errors.designation = "Designation must be at least 2 characters";
    }

    // Department
    if (!formData.department_id) {
      errors.department_id = "Please select a department";
    }

    // Joining Date
    if (!formData.joining_date) {
      errors.joining_date = "Joining date is required";
    } else {
      const selectedDate = new Date(formData.joining_date);
      const today = new Date();
      if (selectedDate > today) {
        errors.joining_date = "Joining date cannot be in the future";
      }
    }

    // Photo URL (optional but validate if provided)
    if (formData.photo_url && !/^https?:\/\/.+/i.test(formData.photo_url)) {
      errors.photo_url = "Please enter a valid URL (starting with http:// or https://)";
    }

    // LinkedIn URL (optional but validate if provided)
    if (formData.linkedin_url && !/^https?:\/\/.+/i.test(formData.linkedin_url)) {
      errors.linkedin_url = "Please enter a valid LinkedIn URL";
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

  const handleDepartmentChange = (value) => {
    setFormData({ 
      ...formData, 
      department_id: value,
      team_id: "" // Reset team
    });
    if (fieldErrors.department_id) {
      setFieldErrors({ ...fieldErrors, department_id: "" });
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
        result = await updateTeamMember(editData.id, formData);
        setSuccess(`✅ "${result.name}" updated successfully!`);
      } else {
        result = await createTeamMember(formData);
        setSuccess(`✅ "${result.name}" added successfully!`);
      }

      if (setMembers) setMembers([result, ...(members || [])]);
      if (onAdd) onAdd(result);
      if (onRefresh) onRefresh();

      setFormData({
        name: "", designation: "", department_id: "",
        team_id: "", joining_date: "", photo_url: "", linkedin_url: "",
      });
      setIsEditMode(false);
      if (onCancelEdit) onCancelEdit();

      setTimeout(() => {
        navigate("/admin/team-members", { state: { activeTab: "list" } });
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
        setError("A member with this information already exists.");
      } else {
        setError(err.response?.data?.detail || "Failed to process request. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setFormData({
      name: "", designation: "", department_id: "",
      team_id: "", joining_date: "", photo_url: "", linkedin_url: "",
    });
    setFieldErrors({});
    setError("");
    if (onCancelEdit) onCancelEdit();
    navigate("/admin/team-members", { state: { activeTab: "list" } });
  };

  const departmentOptions = departments.map((dept) => ({
    value: dept.id,
    label: dept.department_name,
  }));

  const teamOptions = teams.map((team) => ({
    value: team.id,
    label: team.team_name,
  }));

  // ============================================================
  // 📌 RENDER
  // ============================================================

  return (
    <div className="w-full">

      {/* ALERTS */}
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

      {/* FORM CARD */}
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
                Edit Team Member
              </h2>
            </>
          ) : (
            <>
              <div className="p-2 rounded-lg bg-[var(--color-primary-pale)]">
                <Users size={16} className="text-[var(--color-primary)]" />
              </div>
              <h2 className="text-sm sm:text-base font-medium text-[var(--color-text-heading)]">
                Add Team Member
              </h2>
            </>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Enter full name"
                  disabled={loading}
                  className={`
                    w-full pl-9 pr-3 py-2.5 rounded-lg 
                    bg-[var(--color-bg-card)] 
                    text-sm text-[var(--color-text-heading)] 
                    placeholder:text-[var(--color-text-muted)]
                    border transition-all duration-150
                    focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${fieldErrors.name
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]'
                    }
                  `}
                />
              </div>
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.name}
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
                  <Briefcase size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => handleChange("designation", e.target.value)}
                  placeholder="e.g. Senior Developer"
                  disabled={loading}
                  className={`
                    w-full pl-9 pr-3 py-2.5 rounded-lg 
                    bg-[var(--color-bg-card)] 
                    text-sm text-[var(--color-text-heading)] 
                    placeholder:text-[var(--color-text-muted)]
                    border transition-all duration-150
                    focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${fieldErrors.designation
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]'
                    }
                  `}
                />
              </div>
              {fieldErrors.designation && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.designation}
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
                onChange={(e) => handleDepartmentChange(e.target.value)}
                options={departmentOptions}
                placeholder={loadingDepartments ? "Loading..." : "Select department"}
                disabled={loading || loadingDepartments}
                className="w-full"
              />
              {fieldErrors.department_id && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.department_id}
                </p>
              )}
            </div>

            {/* Team */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Team
              </label>
              <FilterSelect
                value={formData.team_id}
                onChange={(e) => handleChange("team_id", e.target.value)}
                options={teamOptions}
                placeholder={
                  !formData.department_id
                    ? "Select department first"
                    : loadingTeams
                    ? "Loading teams..."
                    : teams.length === 0
                    ? "No teams available"
                    : "Select team"
                }
                disabled={!formData.department_id || loading || loadingTeams}
                className="w-full"
              />
            </div>

            {/* Loading teams */}
            {loadingTeams && formData.department_id && (
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-heading)] opacity-70 col-span-2">
                <Loader2 size={14} className="animate-spin" />
                Loading teams for this department...
              </div>
            )}

            {/* No teams warning */}
            {!loadingTeams && formData.department_id && teams.length === 0 && (
              <div className="col-span-2 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                <AlertCircle size={14} className="text-amber-600 mt-0.5 shrink-0" />
                <p className="text-xs text-amber-700">
                  No teams found for this department. You can still add the member without a team.
                </p>
              </div>
            )}

            {/* Joining Date */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Joining Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="date"
                  value={formData.joining_date}
                  onChange={(e) => handleChange("joining_date", e.target.value)}
                  disabled={loading}
                  className={`
                    w-full pl-9 pr-3 py-2.5 rounded-lg 
                    bg-[var(--color-bg-card)] 
                    text-sm text-[var(--color-text-heading)] 
                    border transition-all duration-150
                    focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${fieldErrors.joining_date
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]'
                    }
                  `}
                />
              </div>
              {fieldErrors.joining_date && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.joining_date}
                </p>
              )}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                Photo URL
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Image size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="text"
                  value={formData.photo_url}
                  onChange={(e) => handleChange("photo_url", e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  disabled={loading}
                  className={`
                    w-full pl-9 pr-3 py-2.5 rounded-lg 
                    bg-[var(--color-bg-card)] 
                    text-sm text-[var(--color-text-heading)] 
                    placeholder:text-[var(--color-text-muted)]
                    border transition-all duration-150
                    focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${fieldErrors.photo_url
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]'
                    }
                  `}
                />
              </div>
              {fieldErrors.photo_url && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.photo_url}
                </p>
              )}
            </div>

            {/* LinkedIn URL */}
            <div>
              <label className="block text-xs font-medium text-[var(--color-text-heading)] mb-1.5">
                LinkedIn URL
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Link size={14} className="text-[var(--color-text-muted)]" />
                </span>
                <input
                  type="text"
                  value={formData.linkedin_url}
                  onChange={(e) => handleChange("linkedin_url", e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  disabled={loading}
                  className={`
                    w-full pl-9 pr-3 py-2.5 rounded-lg 
                    bg-[var(--color-bg-card)] 
                    text-sm text-[var(--color-text-heading)] 
                    placeholder:text-[var(--color-text-muted)]
                    border transition-all duration-150
                    focus:outline-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${fieldErrors.linkedin_url
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-[var(--color-border)] focus:border-[var(--color-primary)] hover:border-[var(--color-primary)]'
                    }
                  `}
                />
              </div>
              {fieldErrors.linkedin_url && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} /> {fieldErrors.linkedin_url}
                </p>
              )}
            </div>

          </div>

          {/* Info Box */}
          <div className="mt-5 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
            <Clock size={14} className="text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700">
              {isEditMode
                ? "Member details will be updated immediately."
                : `Member will be created in "Pending" state. ${isAdmin ? "You can activate it from the list." : "Admin must activate it."}`
              }
            </p>
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
              disabled={loading || loadingDepartments}
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
                  {isEditMode ? "Update Member" : "Add Member"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}