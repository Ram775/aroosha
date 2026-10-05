// src/pages/Admin/dashboarditems/Applications/index.jsx
import { useState, useEffect, useMemo } from "react";
import {
  Eye,
  X,
  Loader2,
  Briefcase,
  Mail,
  Phone,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Square,
  CheckSquare,
  Star,
} from "lucide-react";
import axios from "axios";
import ListTable from "../../../../components/ui/ListTable";
import ListRow, { MobileCard } from "../../../../components/ui/ListRow";
import ListHeader from "../../../../components/ui/ListHeader";
import Pagination from "../../../../components/ui/Pagination";
import FilterSelect from "../../../../components/ui/FilterSelect";
import {
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  APPLICATION_STATUSES,
  getStatusBadgeClass,
  getStatusLabel,
} from "../../../../api/applicationsApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Checkbox + S.No + Applicant + Position + Status + Date + Actions
const TABLE_COLUMNS = "grid-cols-[50px_50px_2fr_1.5fr_1fr_1fr_100px]";

const statusFilterOptions = [
  { value: "all", label: "All Status" },
  ...APPLICATION_STATUSES,
];

const pageSizeOptions = [
  { value: 5, label: "5 Per Page" },
  { value: 10, label: "10 Per Page" },
  { value: 20, label: "20 Per Page" },
  { value: 50, label: "50 Per Page" },
];

const toArray = (data) => {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  if (data && Array.isArray(data.results)) return data.results;
  if (data && Array.isArray(data.items)) return data.items;
  return [];
};

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [viewApp, setViewApp] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // ============================================================
  // 📌 FETCH
  // ============================================================
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("adminToken");
      const [appsData, jobsRes] = await Promise.all([
        getApplications(),
        axios
          .get(`${API_BASE_URL}/jobs/`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          })
          .catch(() => ({ data: [] })),
      ]);
      setApplications(appsData);
      setJobs(toArray(jobsRes.data));
      setSelectedIds([]);
    } catch (err) {
      console.error("Failed to fetch applications:", err);
      setError(
        err.response?.data?.detail ||
          "Failed to load applications. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, pageSize]);

  // ============================================================
  // 📌 HELPERS
  // ============================================================
  const getJobTitle = (jobId) => {
    const job = jobs.find((j) => String(j.id) === String(jobId));
    return job?.title || `Job #${jobId}`;
  };

  // ============================================================
  // 📌 FILTER
  // ============================================================
  const filteredData = useMemo(() => {
    let filtered = applications;

    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.applicant_name?.toLowerCase().includes(s) ||
          a.email?.toLowerCase().includes(s)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (a) => String(a.status || "pending").toLowerCase() === statusFilter
      );
    }

    return filtered;
  }, [applications, searchTerm, statusFilter]);

  const paginated = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // ============================================================
  // 📌 SELECTION
  // ============================================================
  const handleSelectAll = () => {
    const ids = paginated.map((a) => a.id);
    const allSelected = ids.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...ids])]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isAllSelected = () => {
    const ids = paginated.map((a) => a.id);
    return ids.length > 0 && ids.every((id) => selectedIds.includes(id));
  };

  // ============================================================
  // 📌 VIEW DETAILS
  // ============================================================
  const handleView = async (appId) => {
    setViewLoading(true);
    setViewApp({ id: appId });
    try {
      const data = await getApplicationById(appId);
      setViewApp(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load details.");
      setViewApp(null);
    } finally {
      setViewLoading(false);
    }
  };

  // ============================================================
  // 📌 SINGLE STATUS UPDATE
  // ============================================================
  const handleUpdateStatus = async (appId, newStatus) => {
    setUpdatingStatus(true);
    setError("");
    setSuccess("");

    const oldStatus = applications.find((a) => a.id === appId)?.status;

    // Optimistic update
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );

    try {
      await updateApplicationStatus(appId, newStatus);

      setSuccess(`✅ Application marked as ${getStatusLabel(newStatus)}.`);

      if (viewApp?.id === appId) {
        setViewApp((prev) => ({ ...prev, status: newStatus }));
      }

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Status update failed:", err);
      // Rollback
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: oldStatus } : a))
      );
      setError(err.response?.data?.detail || "Failed to update status.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  // ============================================================
  // 📌 BULK STATUS UPDATE
  // ============================================================
  const handleBulkUpdateStatus = async (newStatus) => {
    if (!selectedIds.length) return;

    const statusText = getStatusLabel(newStatus);
    if (
      !window.confirm(
        `Mark ${selectedIds.length} application(s) as ${statusText}?`
      )
    ) {
      return;
    }

    setIsProcessing(true);
    setError("");
    setSuccess("");

    try {
      const results = await Promise.allSettled(
        selectedIds.map((id) => updateApplicationStatus(id, newStatus))
      );

      const failed = results.filter((r) => r.status === "rejected").length;
      const succeeded = results.length - failed;

      await fetchData();

      if (failed === 0) {
        setSuccess(`✅ ${succeeded} application(s) marked as ${statusText}.`);
      } else if (succeeded === 0) {
        setError(`Failed to update ${failed} application(s).`);
      } else {
        setSuccess(`✅ ${succeeded} updated, ${failed} failed.`);
      }

      setSelectedIds([]);
      setTimeout(() => {
        setSuccess("");
        setError("");
      }, 4000);
    } catch (err) {
      setError(err.response?.data?.detail || "Bulk update failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ============================================================
  // 📌 LOADING
  // ============================================================
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 size={32} className="animate-spin text-primary" />
        <span className="ml-3 text-sm text-heading">
          Loading applications...
        </span>
      </div>
    );
  }

  // ============================================================
  // 📌 RENDER
  // ============================================================
  return (
    <div className="space-y-4">
      {/* ALERTS */}
      {success && (
        <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 text-sm rounded-lg flex items-center gap-2">
          <CheckCircle size={16} className="shrink-0" />
          <span className="font-medium">{success}</span>
        </div>
      )}
      {error && (
        <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-lg flex items-center gap-2">
          <AlertCircle size={16} className="shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* TOP BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative w-full lg:flex-1 lg:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-primary"
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
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-card text-sm text-heading placeholder:text-muted border border-border focus:outline-none focus:border-primary transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
          {/* ✅ BULK ACTION BUTTONS — 3 buttons only */}
          <button
            onClick={() => handleBulkUpdateStatus("pending")}
            disabled={!selectedIds.length || isProcessing}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white bg-yellow-600 hover:bg-yellow-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            title="Mark selected as Pending"
          >
            {isProcessing ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Clock size={12} />
            )}
            Pending
          </button>

          <button
            onClick={() => handleBulkUpdateStatus("shortlisted")}
            disabled={!selectedIds.length || isProcessing}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            title="Shortlist selected"
          >
            {isProcessing ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Star size={12} />
            )}
            Shortlist
          </button>

          <button
            onClick={() => handleBulkUpdateStatus("rejected")}
            disabled={!selectedIds.length || isProcessing}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white bg-red-600 hover:bg-red-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            title="Reject selected"
          >
            {isProcessing ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <XCircle size={12} />
            )}
            Reject
          </button>

          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusFilterOptions}
            className="w-36"
          />
          <FilterSelect
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            options={pageSizeOptions}
            className="w-32"
          />
        </div>
      </div>

      {/* SELECTION INFO BAR */}
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between gap-3 px-4 py-2 rounded-lg border border-primary/30 bg-primary-pale">
          <span className="text-sm text-heading font-medium">
            {selectedIds.length} application
            {selectedIds.length > 1 ? "s" : ""} selected
          </span>
          <button
            onClick={() => setSelectedIds([])}
            disabled={isProcessing}
            className="px-3 py-1 rounded-md text-xs font-medium text-heading border border-border hover:bg-muted disabled:opacity-40"
          >
            Clear selection
          </button>
        </div>
      )}

      {/* TABLE */}
      <ListTable columns={TABLE_COLUMNS}>
        {{
          header: (
            <ListHeader>
              <div className="flex items-center justify-center">
                <button
                  onClick={handleSelectAll}
                  disabled={isProcessing || paginated.length === 0}
                  className="p-1.5 rounded-md hover:bg-muted disabled:opacity-50 transition-all"
                >
                  {isAllSelected() ? (
                    <CheckSquare size={18} className="text-primary" />
                  ) : (
                    <Square size={18} className="text-heading" />
                  )}
                </button>
              </div>
              <span>S.No</span>
              <span>Applicant</span>
              <span>Position</span>
              <span>Status</span>
              <span>Applied On</span>
              <span className="text-center">Actions</span>
            </ListHeader>
          ),
          rows: (
            <>
              {paginated.length === 0 ? (
                <div className="py-12 text-center text-heading">
                  <p className="text-sm">No applications found</p>
                </div>
              ) : (
                paginated.map((app, index) => {
                  const isSelected = selectedIds.includes(app.id);
                  const serialNumber = (currentPage - 1) * pageSize + index + 1;

                  return (
                    <div key={app.id}>
                      <ListRow columns={TABLE_COLUMNS} selected={isSelected}>
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handleSelectOne(app.id)}
                            disabled={isProcessing}
                            className="p-1.5 rounded-md hover:bg-muted transition-all disabled:opacity-50"
                          >
                            {isSelected ? (
                              <CheckSquare size={18} className="text-primary" />
                            ) : (
                              <Square size={18} className="text-heading" />
                            )}
                          </button>
                        </div>

                        <div className="text-sm text-heading">
                          {serialNumber}
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-heading truncate">
                            {app.applicant_name || "—"}
                          </p>
                          <p className="text-xs text-muted truncate">
                            {app.email}
                          </p>
                        </div>

                        <div className="text-sm text-heading truncate">
                          {getJobTitle(app.job_id)}
                        </div>

                        <div>
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusBadgeClass(
                              app.status
                            )}`}
                          >
                            {getStatusLabel(app.status)}
                          </span>
                        </div>

                        <div className="text-sm text-heading">
                          {app.applied_at?.split("T")[0] || "—"}
                        </div>

                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handleView(app.id)}
                            className="p-1.5 rounded-md hover:bg-muted text-heading hover:text-primary transition-all"
                            title="View details"
                          >
                            <Eye size={16} />
                          </button>
                        </div>
                      </ListRow>

                      <MobileCard selected={isSelected}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-heading">
                              {app.applicant_name}
                            </p>
                            <p className="text-xs text-muted">{app.email}</p>
                          </div>
                          <button
                            onClick={() => handleSelectOne(app.id)}
                            className="p-1"
                          >
                            {isSelected ? (
                              <CheckSquare size={20} className="text-primary" />
                            ) : (
                              <Square size={20} className="text-heading" />
                            )}
                          </button>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusBadgeClass(
                              app.status
                            )}`}
                          >
                            {getStatusLabel(app.status)}
                          </span>
                          <span className="text-xs text-muted">
                            {getJobTitle(app.job_id)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleView(app.id)}
                          className="mt-3 text-xs text-primary hover:underline"
                        >
                          View Details
                        </button>
                      </MobileCard>
                    </div>
                  );
                })
              )}
            </>
          ),
        }}
      </ListTable>

      {filteredData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          totalItems={filteredData.length}
        />
      )}

      {/* VIEW MODAL */}
      {viewApp && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setViewApp(null)}
        >
          <div
            className="bg-card rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewApp(null)}
              className="absolute top-4 right-4 text-heading hover:opacity-70"
            >
              <X size={20} />
            </button>

            {viewLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 size={28} className="animate-spin text-primary" />
              </div>
            ) : viewApp.applicant_name ? (
              <>
                <div className="mb-5 pr-8">
                  <h3 className="text-lg font-semibold text-heading">
                    {viewApp.applicant_name}
                  </h3>
                  <p className="text-xs text-muted mt-1">
                    Applied for {getJobTitle(viewApp.job_id)}
                  </p>
                  <span
                    className={`inline-flex mt-2 px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusBadgeClass(
                      viewApp.status
                    )}`}
                  >
                    {getStatusLabel(viewApp.status)}
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <Row
                    icon={Mail}
                    label="Email"
                    value={
                      <a
                        href={`mailto:${viewApp.email}`}
                        className="text-primary hover:underline break-all"
                      >
                        {viewApp.email}
                      </a>
                    }
                  />
                  <Row
                    icon={Phone}
                    label="Phone"
                    value={
                      viewApp.phone ? (
                        <a
                          href={`tel:${viewApp.phone}`}
                          className="text-primary hover:underline"
                        >
                          {viewApp.phone}
                        </a>
                      ) : (
                        "—"
                      )
                    }
                  />
                  <Row
                    icon={Clock}
                    label="Experience"
                    value={viewApp.experience || "—"}
                  />
                  <Row
                    icon={Briefcase}
                    label="Position"
                    value={getJobTitle(viewApp.job_id)}
                  />
                  <Row
                    icon={FileText}
                    label="Applied On"
                    value={
                      viewApp.applied_at
                        ? new Date(viewApp.applied_at).toLocaleString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"
                    }
                  />
                  <Row
                    icon={FileText}
                    label="Resume"
                    value={
                      viewApp.resume_url ? (
                        <a
                          href={viewApp.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium"
                        >
                          Download Resume
                        </a>
                      ) : (
                        "—"
                      )
                    }
                  />
                </div>

                {/* ✅ 3 STATUS BUTTONS */}
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs font-medium text-muted mb-3">
                    Update Status
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <StatusButton
                      label="Pending"
                      icon={Clock}
                      active={
                        String(viewApp.status || "pending").toLowerCase() ===
                        "pending"
                      }
                      color="yellow"
                      onClick={() => handleUpdateStatus(viewApp.id, "pending")}
                      disabled={updatingStatus}
                    />
                    <StatusButton
                      label="Shortlisted"
                      icon={Star}
                      active={
                        String(viewApp.status || "").toLowerCase() ===
                        "shortlisted"
                      }
                      color="blue"
                      onClick={() =>
                        handleUpdateStatus(viewApp.id, "shortlisted")
                      }
                      disabled={updatingStatus}
                    />
                    <StatusButton
                      label="Rejected"
                      icon={XCircle}
                      active={
                        String(viewApp.status || "").toLowerCase() ===
                        "rejected"
                      }
                      color="red"
                      onClick={() => handleUpdateStatus(viewApp.id, "rejected")}
                      disabled={updatingStatus}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="py-8 text-center text-muted text-sm">
                No data
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Small components
// ============================================================
function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start justify-between border-b border-border pb-2 gap-3">
      <span className="text-muted shrink-0 flex items-center gap-1.5 text-xs">
        {Icon && <Icon size={12} />}
        {label}
      </span>
      <span className="text-heading text-right break-all text-sm">
        {value}
      </span>
    </div>
  );
}

function StatusButton({ label, icon: Icon, active, color, onClick, disabled }) {
  const colors = {
    yellow: {
      active: "bg-yellow-500 text-white border-yellow-500",
      inactive:
        "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
    },
    blue: {
      active: "bg-blue-500 text-white border-blue-500",
      inactive: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
    },
    red: {
      active: "bg-red-500 text-white border-red-500",
      inactive: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
    },
  };

  const style = active ? colors[color].active : colors[color].inactive;

  return (
    <button
      onClick={onClick}
      disabled={disabled || active}
      className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-lg font-medium border transition-all disabled:cursor-not-allowed text-xs ${style}`}
    >
      <Icon size={12} />
      {label}
    </button>
  );
}