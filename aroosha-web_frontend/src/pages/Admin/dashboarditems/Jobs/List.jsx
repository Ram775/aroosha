// src/pages/Admin/dashboarditems/jobs/List.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Square, CheckSquare, X } from "lucide-react";
import { useAdmin } from "../../../../auth/AdminContext";
import { Alert, HighlightText } from "../../../../components/ui";
import FilterSelect from "../../../../components/ui/FilterSelect";
import Pagination from "../../../../components/ui/Pagination";
import ListTable from "../../../../components/ui/ListTable";
import ListRow, { MobileCard } from "../../../../components/ui/ListRow";
import ListHeader from "../../../../components/ui/ListHeader";
import {
  getJobs,
  deleteJob,
  getJobById,
  updateJobActiveStatus,
} from "../../../../api/jobsApi";
import { getApprovedDepartments } from "../../../../api/departments";
import { getJobTypes } from "../../../../api/jobTypesApi";

const sortOptions = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

const perPageOptions = [
  { value: 5, label: "5 Per Page" },
  { value: 10, label: "10 Per Page" },
  { value: 20, label: "20 Per Page" },
  { value: 50, label: "50 Per Page" },
  { value: 100, label: "100 Per Page" },
];

// Checkbox + S.No + Title + Dept + JobType + Location + Actions
const TABLE_COLUMNS = "grid-cols-[50px_50px_2fr_1fr_1fr_1fr_260px]";

export default function JobList() {
  const navigate = useNavigate();
  const { admin } = useAdmin();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [viewJob, setViewJob] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [togglingId, setTogglingId] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);

const isAdmin =
  admin?.role === "admin" ||
  admin?.role === "super_admin" ||
  admin?.role === "hr";

  // ============================================================
  // 📌 FETCH JOBS
  // ============================================================
  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getJobs();
      let finalData = [];
      if (Array.isArray(data)) finalData = data;
      else if (data && Array.isArray(data.data)) finalData = data.data;
      else if (data && Array.isArray(data.results)) finalData = data.results;

      setJobs(finalData);
      setSelectedIds([]);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      if (err.response?.status === 401) {
        setError("Session expired! Please login again.");
      } else {
        setError(err.response?.data?.detail || "Failed to load jobs");
      }
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // 📌 FETCH LOOKUPS (names ke liye)
  // ============================================================
  const fetchLookups = async () => {
    try {
      const [deptData, jtData] = await Promise.all([
        getApprovedDepartments(),
        getJobTypes(),
      ]);
      const depts = Array.isArray(deptData)
        ? deptData
        : deptData?.data || deptData?.results || [];
      const jts = Array.isArray(jtData)
        ? jtData
        : jtData?.data || jtData?.results || [];
      setDepartments(depts);
      setJobTypes(jts);
    } catch (err) {
      console.error("Lookup fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchLookups();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, pageSize]);

  // ============================================================
  // 📌 NAME HELPERS
  // ============================================================
  const getDepartmentName = (id) => {
    const d = departments.find((x) => String(x.id) === String(id));
    return d?.department_name || d?.name || id || "N/A";
  };

  const getJobTypeName = (id) => {
    const jt = jobTypes.find((x) => String(x.id) === String(id));
    return jt?.type_name || jt?.name || id || "N/A";
  };

  // ============================================================
  // 📌 VIEW
  // ============================================================
  const handleView = async (id) => {
    setViewLoading(true);
    setError("");
    try {
      const data = await getJobById(id);
      setViewJob(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load details");
    } finally {
      setViewLoading(false);
    }
  };

  // ============================================================
  // 📌 TOGGLE ACTIVE
  // ============================================================
const handleToggleActive = async (job) => {
  const nextState = !job.is_active;

  // optimistic update
  setJobs((prev) =>
    prev.map((j) => (j.id === job.id ? { ...j, is_active: nextState } : j))
  );

  setTogglingId(job.id);
  setError("");
  setSuccess("");

  try {
    const updated = await updateJobActiveStatus(job.id, nextState);
    setJobs((prev) =>
      prev.map((j) =>
        j.id === job.id
          ? { ...j, ...updated, is_active: updated?.is_active ?? nextState }
          : j
      )
    );
    setSuccess(
      `✅ "${job.title}" is now ${nextState ? "ACTIVE — visible on Careers page" : "INACTIVE — hidden from Careers page"}.`
    );

    // ✅ Parent ko batao taaki Careers page aur baaki tabs bhi refresh ho
    if (typeof onRefresh === "function") onRefresh();
  } catch (err) {
    // rollback
    setJobs((prev) =>
      prev.map((j) =>
        j.id === job.id ? { ...j, is_active: job.is_active } : j
      )
    );
    setError(err.response?.data?.detail || "Failed to update status.");
  } finally {
    setTogglingId(null);
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 4000);
  }
};
  // ============================================================
  // 📌 SORT + FILTER
  // ============================================================
  const sortJobs = (data) => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      const tA = a.title?.toLowerCase() || "";
      const tB = b.title?.toLowerCase() || "";
      return sortOrder === "asc"
        ? tA.localeCompare(tB)
        : tB.localeCompare(tA);
    });
    return sorted;
  };

  const getFilteredJobs = () => {
    let filtered = jobs;
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (j) =>
          j.title?.toLowerCase().includes(s) ||
          j.designation?.toLowerCase().includes(s) ||
          j.location?.toLowerCase().includes(s)
      );
    }
    return sortJobs(filtered);
  };

  const filteredData = getFilteredJobs();
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // ============================================================
  // 📌 SELECTION
  // ============================================================
  const handleSelectAll = () => {
    const ids = filteredData.map((j) => j.id);
    setSelectedIds(
      selectedIds.length === ids.length && ids.length > 0 ? [] : ids
    );
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isAllSelected = () => {
    const ids = filteredData.map((j) => j.id);
    return ids.length > 0 && ids.every((id) => selectedIds.includes(id));
  };

  // ============================================================
  // 📌 BULK DELETE
  // ============================================================
  const handleBulkDelete = async () => {
    if (!selectedIds.length) return setError("Please select at least one job.");
    setIsProcessing(true);
    setError("");
    setSuccess("");
    try {
      for (const id of selectedIds) await deleteJob(id);
      await fetchJobs();
      setSuccess(`🗑️ ${selectedIds.length} job(s) deleted!`);
      setSelectedIds([]);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to delete.");
    } finally {
      setIsProcessing(false);
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 4000);
    }
  };

  // ============================================================
  // 📌 EDIT
  // ============================================================
  const handleEdit = (job) => {
    navigate("/admin/jobs", {
      state: { activeTab: "add", editData: job },
    });
  };

  // ============================================================
  // 📌 LOADING
  // ============================================================
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={32} className="animate-spin text-[var(--color-primary)]" />
        <span className="ml-3 text-[var(--color-text-heading)] text-sm">
          Loading jobs...
        </span>
      </div>
    );
  }

  // ============================================================
  // 📌 RENDER
  // ============================================================
  return (
    <div className="space-y-4">
      {error && <Alert type="error" message={error} onClose={() => setError("")} />}
      {success && (
        <Alert type="success" message={success} onClose={() => setSuccess("")} />
      )}

      {/* TOP BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative w-full lg:flex-1 lg:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-[var(--color-primary)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by title, designation, location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-muted)] border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-primary)] transition-all duration-150 hover:border-[var(--color-primary)]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
          {isAdmin && (
            <button
              onClick={handleBulkDelete}
              disabled={!selectedIds.length || isProcessing}
              className="px-3 py-2 rounded-lg bg-[var(--color-bg-card)] text-red-600 text-xs font-medium border border-red-600 hover:bg-red-50 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Delete
            </button>
          )}

          <FilterSelect
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            options={sortOptions}
            className="w-28"
          />
          <FilterSelect
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            options={perPageOptions}
            className="w-32"
          />
        </div>
      </div>

      {/* TABLE */}
      <div>
        <ListTable columns={TABLE_COLUMNS}>
          {{
            header: (
              <ListHeader>
                {isAdmin && (
                  <div className="flex items-center justify-center">
                    <button
                      onClick={handleSelectAll}
                      disabled={isProcessing || filteredData.length === 0}
                      className="p-1.5 rounded-md hover:bg-[var(--color-bg-muted)] disabled:opacity-50 transition-all"
                    >
                      {isAllSelected() ? (
                        <CheckSquare
                          size={18}
                          className="text-[var(--color-primary)]"
                        />
                      ) : (
                        <Square
                          size={18}
                          className="text-[var(--color-text-heading)]"
                        />
                      )}
                    </button>
                  </div>
                )}
                <span>S.No</span>
                <span>Job Title</span>
                <span>Department</span>
                <span>Job Type</span>
                <span>Location</span>
                <span className="text-center">Actions</span>
              </ListHeader>
            ),
            rows: (
              <>
                {paginatedData.length === 0 ? (
                  <div className="py-12 text-center text-[var(--color-text-heading)]">
                    <p className="text-sm">No jobs found</p>
                  </div>
                ) : (
                  paginatedData.map((job, index) => {
                    const isSelected = selectedIds.includes(job.id);
                    const serialNumber =
                      (currentPage - 1) * pageSize + index + 1;
                    const isToggling = togglingId === job.id;

                    return (
                      <div key={job.id}>
                        <ListRow columns={TABLE_COLUMNS} selected={isSelected}>
                          {isAdmin && (
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => handleSelectOne(job.id)}
                                disabled={isProcessing}
                                className="p-1.5 rounded-md hover:bg-[var(--color-bg-muted)] transition-all disabled:opacity-50"
                              >
                                {isSelected ? (
                                  <CheckSquare
                                    size={18}
                                    className="text-[var(--color-primary)]"
                                  />
                                ) : (
                                  <Square
                                    size={18}
                                    className="text-[var(--color-text-heading)]"
                                  />
                                )}
                              </button>
                            </div>
                          )}
                          <div className="text-sm text-[var(--color-text-heading)]">
                            {serialNumber}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[var(--color-text-heading)] text-sm truncate">
                              <HighlightText
                                text={job.title}
                                highlight={searchTerm}
                              />
                            </p>
                            <p className="text-xs text-[var(--color-text-heading)] opacity-70 truncate">
                              {job.designation}
                            </p>
                          </div>
                          <div className="text-sm text-[var(--color-text-heading)] truncate">
                            {getDepartmentName(job.department_id)}
                          </div>
                          <div className="text-sm text-[var(--color-text-heading)] truncate">
                            {getJobTypeName(job.job_type_id)}
                          </div>
                          <div className="text-sm text-[var(--color-text-heading)] truncate">
                            <HighlightText
                              text={job.location}
                              highlight={searchTerm}
                            />
                          </div>

                          {/* ACTIONS + TOGGLE SWITCH */}
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => handleView(job.id)}
                              className="text-xs text-[var(--color-primary)] hover:underline"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleEdit(job)}
                              className="text-xs text-blue-600 hover:underline"
                            >
                              Edit
                            </button>

                            {isAdmin && (
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  role="switch"
                                  aria-checked={!!job.is_active}
                                  onClick={() => handleToggleActive(job)}
                                  disabled={isToggling}
                                  title={
                                    job.is_active
                                      ? "Click to deactivate"
                                      : "Click to activate"
                                  }
                                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                                    job.is_active
                                      ? "bg-emerald-500"
                                      : "bg-gray-300"
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                                      job.is_active
                                        ? "translate-x-4"
                                        : "translate-x-0.5"
                                    }`}
                                  />
                                  {isToggling && (
                                    <span className="absolute inset-0 flex items-center justify-center">
                                      <Loader2
                                        size={10}
                                        className="animate-spin text-white"
                                      />
                                    </span>
                                  )}
                                </button>
                                <span
                                  className={`text-[11px] font-medium ${
                                    job.is_active
                                      ? "text-emerald-600"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {job.is_active ? "Active" : "Inactive"}
                                </span>
                              </div>
                            )}
                          </div>
                        </ListRow>

                        {/* MOBILE CARD */}
                        <MobileCard selected={isSelected}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <span className="text-xs text-[var(--color-text-muted)] shrink-0">
                                #{serialNumber}
                              </span>
                              <div className="min-w-0">
                                <p className="text-[var(--color-text-heading)] text-sm truncate">
                                  {job.title}
                                </p>
                                <p className="text-xs text-[var(--color-text-heading)] opacity-70">
                                  {job.designation}
                                </p>
                              </div>
                            </div>
                            {isAdmin && (
                              <button
                                onClick={() => handleSelectOne(job.id)}
                                className="p-1"
                              >
                                {isSelected ? (
                                  <CheckSquare
                                    size={20}
                                    className="text-[var(--color-primary)]"
                                  />
                                ) : (
                                  <Square
                                    size={20}
                                    className="text-[var(--color-text-heading)]"
                                  />
                                )}
                              </button>
                            )}
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-[var(--color-text-heading)]">
                                Department
                              </span>
                              <span className="text-[var(--color-text-heading)]">
                                {getDepartmentName(job.department_id)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[var(--color-text-heading)]">
                                Job Type
                              </span>
                              <span className="text-[var(--color-text-heading)]">
                                {getJobTypeName(job.job_type_id)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[var(--color-text-heading)]">
                                Location
                              </span>
                              <span className="text-[var(--color-text-heading)]">
                                {job.location}
                              </span>
                            </div>
                          </div>

                          {/* Mobile actions + toggle */}
                          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[var(--color-border)]">
                            <button
                              onClick={() => handleView(job.id)}
                              className="text-xs text-[var(--color-primary)] hover:underline"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleEdit(job)}
                              className="text-xs text-blue-600 hover:underline"
                            >
                              Edit
                            </button>

                            {isAdmin && (
                              <div className="ml-auto flex items-center gap-2">
                                <span
                                  className={`text-[11px] font-medium ${
                                    job.is_active
                                      ? "text-emerald-600"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {job.is_active ? "Active" : "Inactive"}
                                </span>
                                <button
                                  type="button"
                                  role="switch"
                                  aria-checked={!!job.is_active}
                                  onClick={() => handleToggleActive(job)}
                                  disabled={togglingId === job.id}
                                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 ${
                                    job.is_active
                                      ? "bg-emerald-500"
                                      : "bg-gray-300"
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                                      job.is_active
                                        ? "translate-x-4"
                                        : "translate-x-0.5"
                                    }`}
                                  />
                                  {togglingId === job.id && (
                                    <span className="absolute inset-0 flex items-center justify-center">
                                      <Loader2
                                        size={10}
                                        className="animate-spin text-white"
                                      />
                                    </span>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </MobileCard>
                      </div>
                    );
                  })
                )}
              </>
            ),
          }}
        </ListTable>
      </div>

      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          totalItems={filteredData.length}
        />
      </div>

      {/* VIEW MODAL */}
      {(viewJob || viewLoading) && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setViewJob(null)}
        >
          <div
            className="bg-[var(--color-bg-card)] rounded-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewJob(null)}
              className="absolute top-4 right-4 text-[var(--color-text-heading)] hover:opacity-70"
            >
              <X size={20} />
            </button>
            {viewLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2
                  size={28}
                  className="animate-spin text-[var(--color-primary)]"
                />
              </div>
            ) : viewJob ? (
              <>
                <div className="mb-5 pr-8">
                  <h3 className="text-lg text-[var(--color-text-heading)]">
                    {viewJob.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-heading)] opacity-70">
                    {viewJob.designation}
                  </p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-[var(--color-text-heading)]">
                      Department
                    </span>
                    <span className="text-[var(--color-text-heading)]">
                      {getDepartmentName(viewJob.department_id)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-[var(--color-text-heading)]">
                      Job Type
                    </span>
                    <span className="text-[var(--color-text-heading)]">
                      {getJobTypeName(viewJob.job_type_id)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-[var(--color-text-heading)]">
                      Location
                    </span>
                    <span className="text-[var(--color-text-heading)]">
                      {viewJob.location}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-[var(--color-text-heading)]">
                      Experience
                    </span>
                    <span className="text-[var(--color-text-heading)]">
                      {viewJob.experience_required}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-[var(--color-text-heading)]">
                      Status
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        viewJob.is_active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {viewJob.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="border-b border-[var(--color-border)] pb-2">
                    <p className="text-[var(--color-text-heading)] mb-1">
                      Description
                    </p>
                    <p className="text-xs text-[var(--color-text-heading)] opacity-80 whitespace-pre-wrap">
                      {viewJob.description}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-heading)]">
                      Created
                    </span>
                    <span className="text-[var(--color-text-heading)]">
                      {viewJob.created_at?.split("T")[0] || "N/A"}
                    </span>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}