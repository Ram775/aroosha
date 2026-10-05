// src/pages/Admin/dashboarditems/job-types/List.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Square, CheckSquare, X, Trash2 } from "lucide-react";
import { useAdmin } from "../../../../auth/AdminContext";
import { Alert, HighlightText } from "../../../../components/ui";
import FilterSelect from "../../../../components/ui/FilterSelect";
import Pagination from "../../../../components/ui/Pagination";
import ListTable from "../../../../components/ui/ListTable";
import ListRow, { MobileCard } from "../../../../components/ui/ListRow";
import ListHeader from "../../../../components/ui/ListHeader";
import { getJobTypes, deleteJobType, getJobTypeById } from "../../../../api/jobTypesApi";

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

const yearOptions = [
  { value: "all", label: "All Years" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
];

// Checkbox + S.No + Job Type + Created + Updated + Actions
const TABLE_COLUMNS = "grid-cols-[50px_50px_2fr_1fr_1fr_150px]";

export default function JobTypeList() {
  const navigate = useNavigate();
  const { admin } = useAdmin();
  const [jobTypes, setJobTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [viewJobType, setViewJobType] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  const isAdmin = admin?.role === 'admin' || admin?.role === 'super_admin';

  const fetchJobTypes = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getJobTypes();
      let finalData = [];
      if (Array.isArray(data)) finalData = data;
      else if (data && Array.isArray(data.data)) finalData = data.data;
      else if (data && Array.isArray(data.results)) finalData = data.results;

      setJobTypes(finalData);
      setSelectedIds([]);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching job types:", err);
      if (err.response?.status === 401) {
        setError("Session expired! Please login again.");
      } else {
        setError(err.response?.data?.detail || "Failed to load job types");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobTypes(); }, []);
  useEffect(() => { setCurrentPage(1); }, [searchTerm, yearFilter, pageSize]);

  const handleView = async (id) => {
    setViewLoading(true);
    setError("");
    try {
      const data = await getJobTypeById(id);
      setViewJobType(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load details");
    } finally {
      setViewLoading(false);
    }
  };

  const sortJobTypes = (data) => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      const nameA = a.type_name?.toLowerCase() || '';
      const nameB = b.type_name?.toLowerCase() || '';
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    return sorted;
  };

  const getFilteredJobTypes = () => {
    let filtered = jobTypes;
    if (searchTerm) {
      filtered = filtered.filter(jt =>
        jt.type_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (yearFilter && yearFilter !== "all") {
      filtered = filtered.filter(jt =>
        jt.created_at && new Date(jt.created_at).getFullYear().toString() === yearFilter
      );
    }
    return sortJobTypes(filtered);
  };

  const filteredData = getFilteredJobTypes();
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleSelectAll = () => {
    const ids = filteredData.map(jt => jt.id);
    setSelectedIds(selectedIds.length === ids.length && ids.length > 0 ? [] : ids);
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const isAllSelected = () => {
    const ids = filteredData.map(jt => jt.id);
    return ids.length > 0 && ids.every(id => selectedIds.includes(id));
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return setError("Please select at least one job type.");
    setIsProcessing(true); setError(""); setSuccess("");
    try {
      for (const id of selectedIds) await deleteJobType(id);
      await fetchJobTypes();
      setSuccess(`🗑️ ${selectedIds.length} job type(s) deleted!`);
      setSelectedIds([]);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to delete.");
    } finally {
      setIsProcessing(false);
      setTimeout(() => { setSuccess(""); setError(""); }, 4000);
    }
  };

  // ✅ NAYA — sirf usi row ko delete karega jiski checkbox selected hai
  const handleSingleDelete = async (id) => {
    setIsProcessing(true);
    setError("");
    setSuccess("");
    try {
      await deleteJobType(id);
      await fetchJobTypes();
      setSuccess("🗑️ Job type deleted!");
      setSelectedIds(prev => prev.filter(item => item !== id));
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to delete job type.");
    } finally {
      setIsProcessing(false);
      setTimeout(() => { setSuccess(""); setError(""); }, 4000);
    }
  };

  const handleEdit = (jobType) => {
    navigate("/admin/job-types", {
      state: { activeTab: "add", editData: jobType }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={32} className="animate-spin text-[var(--color-primary)]" />
        <span className="ml-3 text-[var(--color-text-heading)] text-sm">Loading job types...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {error && <Alert type="error" message={error} onClose={() => setError("")} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess("")} />}

      {/* TABLE */}
      <div>
        <ListTable columns={TABLE_COLUMNS}>
          {{
            header: (
              <ListHeader>
                {isAdmin && (
                  <div className="flex items-center justify-center">
                    <button onClick={handleSelectAll} disabled={isProcessing || filteredData.length === 0} className="p-1.5 rounded-md hover:bg-[var(--color-bg-muted)] disabled:opacity-50 transition-all">
                      {isAllSelected() ? (
                        <CheckSquare size={18} className="text-[var(--color-primary)]" />
                      ) : (
                        <Square size={18} className="text-[var(--color-text-heading)]" />
                      )}
                    </button>
                  </div>
                )}
                <span>S.No</span>
                <span>Job Type</span>
                <span>Created</span>
                <span>Updated</span>
                <span className="text-center">Actions</span>
              </ListHeader>
            ),
            rows: (
              <>
                {paginatedData.length === 0 ? (
                  <div className="py-12 text-center text-[var(--color-text-heading)]">
                    <p className="text-sm">No job types found</p>
                  </div>
                ) : (
                  paginatedData.map((jobType, index) => {
                    const isSelected = selectedIds.includes(jobType.id);
                    const serialNumber = (currentPage - 1) * pageSize + index + 1;

                    return (
                      <div key={jobType.id}>
                        <ListRow columns={TABLE_COLUMNS} selected={isSelected}>
                          {isAdmin && (
                            <div className="flex items-center justify-center">
                              <button onClick={() => handleSelectOne(jobType.id)} disabled={isProcessing} className="p-1.5 rounded-md hover:bg-[var(--color-bg-muted)] transition-all disabled:opacity-50">
                                {isSelected ? (
                                  <CheckSquare size={18} className="text-[var(--color-primary)]" />
                                ) : (
                                  <Square size={18} className="text-[var(--color-text-heading)]" />
                                )}
                              </button>
                            </div>
                          )}
                          <div className="text-sm text-[var(--color-text-heading)]">{serialNumber}</div>
                          <div className="min-w-0">
                            <p className="text-[var(--color-text-heading)] text-sm truncate">
                              <HighlightText text={jobType.type_name} highlight={searchTerm} />
                            </p>
                          </div>
                          <div className="text-sm text-[var(--color-text-heading)]">
                            {jobType.created_at?.split('T')[0] || "N/A"}
                          </div>
                          <div className="text-sm text-[var(--color-text-heading)]">
                            {jobType.updated_at?.split('T')[0] || "N/A"}
                          </div>
                          <div className="flex items-center justify-center gap-3">
                            <button onClick={() => handleView(jobType.id)} className="text-xs text-[var(--color-primary)] hover:underline">View</button>
                            <button onClick={() => handleEdit(jobType)} className="text-xs text-blue-600 hover:underline">Edit</button>
                            {isAdmin && (
                              <button
                                onClick={() => handleSingleDelete(jobType.id)}
                                disabled={!isSelected || isProcessing}
                                className="px-3 py-2 rounded-lg text-red-600 text-xs font-medium border-red-600 hover:bg-red-50 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-1.5"
                                title={isSelected ? "Delete this job type" : "Select the checkbox to enable delete"}
                              >
                                <Trash2 size={15} />
                              </button>
                            )}
                          </div>
                        </ListRow>

                        <MobileCard selected={isSelected}>
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <span className="text-xs text-[var(--color-text-muted)] shrink-0">#{serialNumber}</span>
                              <p className="text-[var(--color-text-heading)] text-sm truncate">{jobType.type_name}</p>
                            </div>
                            {isAdmin && (
                              <button onClick={() => handleSelectOne(jobType.id)} className="p-1">
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
                              <span className="text-[var(--color-text-heading)]">Created</span>
                              <span className="text-[var(--color-text-heading)]">{jobType.created_at?.split('T')[0] || "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[var(--color-text-heading)]">Updated</span>
                              <span className="text-[var(--color-text-heading)]">{jobType.updated_at?.split('T')[0] || "N/A"}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[var(--color-border)]">
                            <button onClick={() => handleView(jobType.id)} className="flex-1 text-xs text-[var(--color-primary)] hover:underline">View</button>
                            <button onClick={() => handleEdit(jobType)} className="flex-1 text-xs text-blue-600 hover:underline">Edit</button>
                            {isAdmin && (
                              <button
                                onClick={() => handleSingleDelete(jobType.id)}
                                disabled={!isSelected || isProcessing}
                                className="flex-1 text-xs text-red-600 hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
                              >
                                Delete
                              </button>
                            )}
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

      <div>
        <Pagination currentPage={currentPage} totalPages={totalPages} pageSize={pageSize} onPageChange={setCurrentPage} totalItems={filteredData.length} />
      </div>

      {/* VIEW MODAL */}
      {(viewJobType || viewLoading) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setViewJobType(null)}>
          <div className="bg-[var(--color-bg-card)] rounded-lg p-6 w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setViewJobType(null)} className="absolute top-4 right-4 text-[var(--color-text-heading)] hover:opacity-70">
              <X size={20} />
            </button>
            {viewLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 size={28} className="animate-spin text-[var(--color-primary)]" />
              </div>
            ) : viewJobType ? (
              <>
                <div className="mb-5">
                  <h3 className="text-lg text-[var(--color-text-heading)]">{viewJobType.type_name}</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-[var(--color-text-heading)]">ID</span>
                    <span className="text-[var(--color-text-heading)]">{viewJobType.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-[var(--color-text-heading)]">Created</span>
                    <span className="text-[var(--color-text-heading)]">{viewJobType.created_at?.split('T')[0] || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-heading)]">Updated</span>
                    <span className="text-[var(--color-text-heading)]">{viewJobType.updated_at?.split('T')[0] || "N/A"}</span>
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