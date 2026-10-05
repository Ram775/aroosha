// src/pages/Admin/dashboarditems/Departments/List.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  AlertCircle, Loader2, CheckCircle, XCircle,
  Square, CheckSquare, X
} from "lucide-react";
import { useAdmin } from "../../../../auth/AdminContext";
import { 
  getDepartments, getApprovedDepartments, 
  updateDepartmentStatus, getDepartmentById 
} from "../../../../api/departments";
import StatusBadge from "../../../../components/ui/StatusBadge";
import HighlightText from "../../../../components/ui/HighlightText";
import Pagination from "../../../../components/ui/Pagination";
import FilterSelect from "../../../../components/ui/FilterSelect";
import ListTable from "../../../../components/ui/ListTable";
import ListRow, { MobileCard } from "../../../../components/ui/ListRow";
import ListHeader from "../../../../components/ui/ListHeader";

// ===== OPTIONS =====
const filterOptions = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "blocked", label: "Blocked" },
  { value: "deleted", label: "Deleted" },
  { value: "all", label: "All Departments" },
];

const yearOptions = [
  { value: "all", label: "All Years" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
];

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

// ✅ Checkbox + S.No + Department + Head + Status + Created + Actions
const TABLE_COLUMNS = "grid-cols-[50px_50px_2fr_1.5fr_120px_130px_130px]";

export default function DepartmentsList({ 
  departments: parentDepartments, 
  setDepartments: parentSetDepartments 
}) {
  const navigate = useNavigate();
  const { admin } = useAdmin();

  // ✅ DEFAULT = "pending"
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("pending");
  const [yearFilter, setYearFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const [viewDepartment, setViewDepartment] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  const [localDepartments, setLocalDepartments] = useState([]);
  const departments = parentDepartments || localDepartments;
  const setDepartments = parentSetDepartments || setLocalDepartments;

  const isAdmin = admin?.role === 'admin' || admin?.role === 'super_admin';

  // ===== FETCH =====
  useEffect(() => {
    fetchDepartments();
  }, [filterStatus]);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError("");
      let data;

      if (filterStatus === "approved") {
        data = await getApprovedDepartments();
      } else {
        data = await getDepartments();
      }

      let finalData = [];
      if (Array.isArray(data)) finalData = data;
      else if (data && Array.isArray(data.data)) finalData = data.data;
      else if (data && Array.isArray(data.results)) finalData = data.results;
      else if (data && Array.isArray(data.departments)) finalData = data.departments;

      if (finalData.length >= 0) {
        setDepartments(finalData);
        setSelectedIds([]);
        setCurrentPage(1);
      } else {
        setDepartments([]);
        setError("Invalid data format received.");
      }
    } catch (err) {
      console.error("Error:", err);
      if (err.response?.status === 401) {
        setError("Session expired! Please login again.");
      } else {
        setError(err.response?.data?.detail || "Failed to load departments.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, yearFilter, filterStatus, pageSize]);

  // ===== VIEW =====
  const handleView = async (id) => {
    setViewLoading(true);
    setError("");
    try {
      const data = await getDepartmentById(id);
      setViewDepartment(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load department details");
    } finally {
      setViewLoading(false);
    }
  };

  // ===== SORT + FILTER =====
  const sortDepartments = (data) => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      const nameA = a.department_name?.toLowerCase() || '';
      const nameB = b.department_name?.toLowerCase() || '';
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    return sorted;
  };

  const getFilteredDepartments = () => {
    let filtered = [...departments];

    if (searchTerm) {
      filtered = filtered.filter(d =>
        d.department_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.department_head?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (yearFilter && yearFilter !== "all") {
      filtered = filtered.filter(d =>
        d.created_at && new Date(d.created_at).getFullYear().toString() === yearFilter
      );
    }

    if (filterStatus === "pending") {
      filtered = filtered.filter(d => d.status === "pending");
    } else if (filterStatus === "blocked") {
      filtered = filtered.filter(d => d.status === "blocked");
    } else if (filterStatus === "deleted") {
      filtered = filtered.filter(d => d.status === "deleted");
    } else if (filterStatus === "all") {
      filtered = filtered.filter(d => 
        d.status === "pending" || 
        d.status === "approved" || 
        d.status === "blocked"
      );
    }

    return sortDepartments(filtered);
  };

  const filteredData = getFilteredDepartments();
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // ✅ UPDATED — Pending + Approved + Blocked sab selectable
  // Deleted NOT selectable
  const selectableDepartments = filteredData.filter(d =>
    d.status === "pending" || 
    d.status === "approved" || 
    d.status === "blocked"
  );

  // ===== SELECTION =====
  const handleSelectAll = () => {
    const ids = selectableDepartments.map(d => d.id);
    setSelectedIds(selectedIds.length === ids.length && ids.length > 0 ? [] : ids);
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isAllSelected = () => {
    const ids = selectableDepartments.map(d => d.id);
    return ids.length > 0 && ids.every(id => selectedIds.includes(id));
  };

  // ===== BULK ACTIONS =====
  const handleBulkApprove = async () => {
    if (!selectedIds.length) return setError("Please select at least one department.");
    setIsProcessing(true);
    try {
      for (const id of selectedIds) await updateDepartmentStatus(id, "approved");
      await fetchDepartments();
      setSuccess(`✅ ${selectedIds.length} department(s) approved successfully!`);
      setSelectedIds([]);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to approve departments.");
    } finally {
      setIsProcessing(false);
      setTimeout(() => { setSuccess(""); setError(""); }, 4000);
    }
  };

  const handleBulkBlock = async () => {
    if (!selectedIds.length) return setError("Please select at least one department.");
    setIsProcessing(true);
    try {
      for (const id of selectedIds) await updateDepartmentStatus(id, "blocked");
      await fetchDepartments();
      setSuccess(`🚫 ${selectedIds.length} department(s) blocked successfully!`);
      setSelectedIds([]);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to block departments.");
    } finally {
      setIsProcessing(false);
      setTimeout(() => { setSuccess(""); setError(""); }, 4000);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return setError("Please select at least one department.");
    setIsProcessing(true);
    try {
      for (const id of selectedIds) await updateDepartmentStatus(id, "deleted");
      await fetchDepartments();
      setSuccess(`🗑️ ${selectedIds.length} department(s) deleted successfully!`);
      setSelectedIds([]);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to delete departments.");
    } finally {
      setIsProcessing(false);
      setTimeout(() => { setSuccess(""); setError(""); }, 4000);
    }
  };

const handleEdit = (dept) => {
  navigate("/admin/departments", { state: { activeTab: "add", editData: dept } });
};


  // ===== LOADING =====
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 size={36} className="text-[var(--color-primary)] animate-spin mb-4" />
        <p className="text-[var(--color-text-heading)] text-sm">Loading departments...</p>
      </div>
    );
  }

  // ============================================================
  // 📌 RENDER
  // ============================================================
  return (
    <div className="space-y-4">

      {/* Alerts */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2 rounded-xl">
          <XCircle size={16} /> {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-600 text-sm flex items-center gap-2 rounded-xl">
          <CheckCircle size={16} /> {success}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 🎯 TOP BAR                                             */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">

        <div className="relative w-full lg:flex-1 lg:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by name or head..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-muted)] border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-primary)] transition-all duration-200 hover:border-[var(--color-primary)]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:ml-auto">

          {isAdmin && (
            <>
              <button
                onClick={handleBulkApprove}
                disabled={!selectedIds.length || isProcessing}
                className="px-3 py-2 rounded-xl bg-[var(--color-bg-card)] text-emerald-600 text-xs border border-emerald-600 hover:bg-emerald-50 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Approve
              </button>
              <button
                onClick={handleBulkBlock}
                disabled={!selectedIds.length || isProcessing}
                className="px-3 py-2 rounded-xl bg-[var(--color-bg-card)] text-amber-600 text-xs border border-amber-600 hover:bg-amber-50 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Block
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={!selectedIds.length || isProcessing}
                className="px-3 py-2 rounded-xl bg-[var(--color-bg-card)] text-red-600 text-xs border border-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Delete
              </button>
            </>
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
          <FilterSelect
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            options={yearOptions}
            className="w-28"
          />
          <FilterSelect
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={filterOptions}
            className="w-36"
          />

        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 📊 TABLE                                               */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div>
        <ListTable columns={TABLE_COLUMNS}>
          {{
            header: (
              <ListHeader>
                {isAdmin && (
                  <div className="flex items-center justify-center">
                    <button
                      onClick={handleSelectAll}
                      disabled={isProcessing || selectableDepartments.length === 0}
                      className="p-1.5 rounded-md hover:bg-[var(--color-bg-muted)] disabled:opacity-50 transition-all"
                    >
                      {isAllSelected() ? (
                        <CheckSquare size={18} className="text-[var(--color-primary)]" />
                      ) : (
                        <Square size={18} className="text-[var(--color-text-heading)]" />
                      )}
                    </button>
                  </div>
                )}
                <span>S.No</span>
                <span>Department</span>
                <span>Head</span>
                <span>Status</span>
                <span>Created</span>
                <span className="text-center">Actions</span>
              </ListHeader>
            ),
            rows: (
              <>
                {paginatedData.length === 0 ? (
                  <div className="py-12 text-center text-[var(--color-text-heading)]">
                    <p className="text-sm">No departments found</p>
                  </div>
                ) : (
                  paginatedData.map((dept, index) => {
                    // ✅ UPDATED — Pending + Approved + Blocked sab selectable
                    const isSelectable = 
                      dept.status === "pending" || 
                      dept.status === "approved" || 
                      dept.status === "blocked";
                    const serialNumber = (currentPage - 1) * pageSize + index + 1;
                    const isSelected = selectedIds.includes(dept.id);

                    return (
                      <div key={dept.id}>
                        <ListRow columns={TABLE_COLUMNS} selected={isSelected}>
                          {/* Checkbox */}
                          {isAdmin && (
                            <div className="flex items-center justify-center">
                              {isSelectable ? (
                                <button
                                  onClick={() => handleSelectOne(dept.id)}
                                  disabled={isProcessing}
                                  className="p-1.5 rounded-md hover:bg-[var(--color-bg-muted)] transition-all disabled:opacity-50"
                                >
                                  {isSelected ? (
                                    <CheckSquare size={18} className="text-[var(--color-primary)]" />
                                  ) : (
                                    <Square size={18} className="text-[var(--color-text-heading)]" />
                                  )}
                                </button>
                              ) : (
                                <div className="w-[18px]" />
                              )}
                            </div>
                          )}

                          <div className="text-sm text-[var(--color-text-heading)]">
                            {serialNumber}
                          </div>

                          <div className="min-w-0">
                            <p className="text-[var(--color-text-heading)] text-sm truncate">
                              <HighlightText text={dept.department_name} highlight={searchTerm} />
                            </p>
                          </div>

                          <div className="text-sm text-[var(--color-text-heading)] truncate">
                            <HighlightText text={dept.department_head} highlight={searchTerm} />
                          </div>

                          <StatusBadge status={dept.status} />

                          <div className="text-sm text-[var(--color-text-heading)]">
                            {dept.created_at ? new Date(dept.created_at).toLocaleDateString() : "-"}
                          </div>

                          <div className="flex items-center justify-center gap-3">
                            <button onClick={() => handleView(dept.id)} className="text-xs text-[var(--color-primary)] hover:underline">
                              View
                            </button>
                            <button onClick={() => handleEdit(dept)} className="text-xs text-blue-600 hover:underline">
                              Edit
                            </button>
                          </div>
                        </ListRow>

                        <MobileCard selected={isSelected}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <span className="text-xs text-[var(--color-text-muted)] shrink-0">
                                #{serialNumber}
                              </span>
                              <p className="text-[var(--color-text-heading)] text-sm truncate">
                                {dept.department_name}
                              </p>
                            </div>
                            {isAdmin && isSelectable && (
                              <button onClick={() => handleSelectOne(dept.id)} className="p-1">
                                {isSelected ? (
                                  <CheckSquare size={20} className="text-[var(--color-primary)]" />
                                ) : (
                                  <Square size={20} className="text-[var(--color-text-heading)]" />
                                )}
                              </button>
                            )}
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-[var(--color-text-heading)]">Head</span>
                              <span className="text-[var(--color-text-heading)]">{dept.department_head}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[var(--color-text-heading)]">Status</span>
                              <StatusBadge status={dept.status} />
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[var(--color-text-heading)]">Created</span>
                              <span className="text-[var(--color-text-heading)]">
                                {dept.created_at ? new Date(dept.created_at).toLocaleDateString() : "-"}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-4 pt-3">
                            <button onClick={() => handleView(dept.id)} className="flex-1 text-xs text-[var(--color-primary)] hover:underline">
                              View
                            </button>
                            <button onClick={() => handleEdit(dept)} className="flex-1 text-xs text-blue-600 hover:underline">
                              Edit
                            </button>
                          </div>
                        </MobileCard>
                      </div>
                    );
                  })
                )}
              </>
            )
          }}
        </ListTable>
      </div>

      {/* PAGINATION */}
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
      {(viewDepartment || viewLoading) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setViewDepartment(null)}>
          <div className="bg-[var(--color-bg-card)] rounded-xl p-6 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setViewDepartment(null)} className="absolute top-4 right-4 text-[var(--color-text-heading)] hover:opacity-70">
              <X size={20} />
            </button>
            {viewLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 size={28} className="animate-spin text-[var(--color-primary)]" />
              </div>
            ) : viewDepartment ? (
              <>
                <div className="mb-5">
                  <h3 className="text-lg text-[var(--color-text-heading)]">
                    {viewDepartment.department_name}
                  </h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-[var(--color-text-heading)]">Department Head</span>
                    <span className="text-[var(--color-text-heading)]">{viewDepartment.department_head}</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-[var(--color-text-heading)]">Status</span>
                    <StatusBadge status={viewDepartment.status} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-heading)]">Created</span>
                    <span className="text-[var(--color-text-heading)]">
                      {viewDepartment.created_at ? new Date(viewDepartment.created_at).toLocaleDateString() : "-"}
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