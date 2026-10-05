// src/pages/Admin/dashboarditems/Member/List.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2, Ban, AlertCircle, Square, CheckSquare,
  Check, Trash2, Pencil, Eye, X
} from "lucide-react";
import { useAdmin } from "../../../../../../auth/AdminContext";
import { Alert, StatusBadge, HighlightText } from "../../../../../../components/ui";
import FilterSelect from "../../../../../../components/ui/FilterSelect";
import Pagination from "../../../../../../components/ui/Pagination";
import ListTable from "../../../../../../components/ui/ListTable";
import ListRow, { MobileCard } from "../../../../../../components/ui/ListRow";
import ListHeader from "../../../../../../components/ui/ListHeader";
import {
  getTeamMembers,
  getApprovedTeamMembers,
  getTeamMemberById,
  updateTeamMemberStatus
} from "../../../../../../api/teamMembersApi";
import { getDepartments } from "../../../../../../api/departments";
import { getTeams } from "../../../../../../api/teamApi";

// ===== STATUS FILTER =====
const filterOptions = [
  { value: "all", label: "All Members" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "blocked", label: "Blocked" },
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

const yearOptions = [
  { value: "all", label: "All Years" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
];

// ✅ Checkbox + S.No + Member + Dept + Team + Status + Joined + Actions
const TABLE_COLUMNS = "grid-cols-[50px_50px_2fr_1fr_1fr_120px_120px_130px]";

export default function TeamMembersList() {
  const navigate = useNavigate();
  const { admin } = useAdmin();
  const [members, setMembers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [viewMember, setViewMember] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);

  const isAdmin = admin?.role === 'admin' || admin?.role === 'super_admin';

  // ============================================================
  // 📌 FETCH — SAME LOGIC
  // ============================================================

  const fetchMembers = async () => {
    setLoading(true);
    setError("");
    try {
      let data;
      if (filterStatus === "approved") {
        data = await getApprovedTeamMembers();
      } else {
        data = await getTeamMembers();
      }

      if (Array.isArray(data)) {
        const filteredData = data.filter(m => m.status !== "deleted");
        setMembers(filteredData);
      } else {
        setMembers([]);
      }
      setSelectedIds([]);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching members:", err);
      setError(err.response?.data?.detail || "Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMembers(); }, [filterStatus]);
  useEffect(() => { setCurrentPage(1); }, [searchTerm, yearFilter, filterStatus, pageSize]);

  // ============================================================
  // 📌 FETCH DEPARTMENTS & TEAMS
  // ============================================================

  const fetchDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (err) { console.error(err); }
  };

  const fetchTeams = async () => {
    try {
      const data = await getTeams();
      setTeams(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchDepartments(); fetchTeams(); }, []);

  // ============================================================
  // 📌 HELPERS
  // ============================================================

  const getDepartmentName = (id) => {
    if (!id) return "N/A";
    const dept = departments.find(d => d.id === id);
    return dept?.department_name || dept?.name || "N/A";
  };

  const getTeamName = (id) => {
    if (!id) return "N/A";
    const team = teams.find(t => t.id === id);
    return team?.team_name || "N/A";
  };

  const handleView = async (id) => {
    setViewLoading(true);
    setError("");
    try {
      const data = await getTeamMemberById(id);
      setViewMember(data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to load member details");
    } finally {
      setViewLoading(false);
    }
  };

  // ============================================================
  // 📌 SORT — SAME
  // ============================================================

  const sortMembers = (data) => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      const nameA = a.name?.toLowerCase() || '';
      const nameB = b.name?.toLowerCase() || '';
      return sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    return sorted;
  };

  // ============================================================
  // 📌 FILTER — SAME LOGIC
  // ============================================================

  const getFilteredMembers = () => {
    let filtered = members;

    // ✅ Status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(m => m.status === filterStatus);
    } else {
      // ✅ All me deleted nahi
      filtered = filtered.filter(m => m.status !== "deleted");
    }

    // ✅ Search
    if (searchTerm) {
      filtered = filtered.filter(m =>
        m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getDepartmentName(m.department_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getTeamName(m.team_id).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // ✅ Year filter
    if (yearFilter && yearFilter !== "all") {
      filtered = filtered.filter(m =>
        m.joining_date && new Date(m.joining_date).getFullYear().toString() === yearFilter
      );
    }

    return sortMembers(filtered);
  };

  const filteredData = getFilteredMembers();
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // ✅ Selectable — pending, approved, blocked
  const selectableMembers = filteredData.filter(m =>
    m.status === "pending" || m.status === "approved" || m.status === "blocked"
  );

  // ============================================================
  // 📌 SELECTION — SAME
  // ============================================================

  const handleSelectAll = () => {
    const selectableIds = selectableMembers.map(m => m.id);
    if (selectedIds.length === selectableIds.length && selectableIds.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(selectableIds);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isAllSelected = () => {
    const selectableIds = selectableMembers.map(m => m.id);
    return selectableIds.length > 0 && selectableIds.every(id => selectedIds.includes(id));
  };

  // ============================================================
  // 📌 BULK ACTIONS — SAME LOGIC
  // ============================================================

  const handleBulkApprove = async () => {
    if (!selectedIds.length) return setError("Please select at least one member.");
    setIsProcessing(true); setError(""); setSuccess("");
    try {
      for (const id of selectedIds) await updateTeamMemberStatus(id, "approved");
      await fetchMembers();
      setSuccess(`✅ ${selectedIds.length} member(s) approved!`);
      setSelectedIds([]);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to approve members.");
    } finally {
      setIsProcessing(false);
      setTimeout(() => { setSuccess(""); setError(""); }, 4000);
    }
  };

  const handleBulkBlock = async () => {
    if (!selectedIds.length) return setError("Please select at least one member.");
    setIsProcessing(true); setError(""); setSuccess("");
    try {
      for (const id of selectedIds) await updateTeamMemberStatus(id, "blocked");
      await fetchMembers();
      setSuccess(`🚫 ${selectedIds.length} member(s) blocked!`);
      setSelectedIds([]);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to block members.");
    } finally {
      setIsProcessing(false);
      setTimeout(() => { setSuccess(""); setError(""); }, 4000);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return setError("Please select at least one member.");
    setIsProcessing(true); setError(""); setSuccess("");
    try {
      for (const id of selectedIds) await updateTeamMemberStatus(id, "deleted");
      await fetchMembers();
      setSuccess(`🗑️ ${selectedIds.length} member(s) deleted!`);
      setSelectedIds([]);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to delete members.");
    } finally {
      setIsProcessing(false);
      setTimeout(() => { setSuccess(""); setError(""); }, 4000);
    }
  };

  const handleEdit = (member) => {
    navigate("/admin/team-members", {
      state: { activeTab: "add", editData: member }
    });
  };

  // ============================================================
  // 📌 LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 size={32} className="animate-spin text-[var(--color-primary)]" />
        <span className="ml-3 text-[var(--color-text-heading)] text-sm">Loading members...</span>
      </div>
    );
  }

  // ============================================================
  // 📌 RENDER
  // ============================================================

  return (
    <div className="space-y-4">

      {/* Alerts */}
      {error && <Alert type="error" message={error} onClose={() => setError("")} />}
      {success && <Alert type="success" message={success} onClose={() => setSuccess("")} />}

      {/* ═══════════════════════════════════════════════════════ */}
      {/* 🎯 TOP BAR — Search LEFT, Buttons+Dropdowns RIGHT       */}
      {/* ═══════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">

        {/* Search */}
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
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-muted)] border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-primary)] transition-all duration-150 hover:border-[var(--color-primary)]"
          />
        </div>

        {/* Right — Buttons + Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 lg:ml-auto">

          {/* Action Buttons */}
          {isAdmin && (
            <>
              <button
                onClick={handleBulkApprove}
                disabled={!selectedIds.length || isProcessing}
                className="px-3 py-2 rounded-lg bg-[var(--color-bg-card)] text-emerald-600 text-xs font-medium border border-emerald-600 hover:bg-emerald-50 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Approve
              </button>
              <button
                onClick={handleBulkBlock}
                disabled={!selectedIds.length || isProcessing}
                className="px-3 py-2 rounded-lg bg-[var(--color-bg-card)] text-amber-600 text-xs font-medium border border-amber-600 hover:bg-amber-50 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Block
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={!selectedIds.length || isProcessing}
                className="px-3 py-2 rounded-lg bg-[var(--color-bg-card)] text-red-600 text-xs font-medium border border-red-600 hover:bg-red-50 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Delete
              </button>
            </>
          )}

          {/* Sort Dropdown */}
          <FilterSelect
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            options={sortOptions}
            className="w-28"
          />

          {/* Per Page */}
          <FilterSelect
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            options={perPageOptions}
            className="w-32"
          />

          {/* Year */}
          <FilterSelect
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            options={yearOptions}
            className="w-28"
          />

          {/* Status */}
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
                      disabled={isProcessing || selectableMembers.length === 0}
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
                <span>Member</span>
                <span>Department</span>
                <span>Team</span>
                <span>Status</span>
                <span>Joined</span>
                <span className="text-center">Actions</span>
              </ListHeader>
            ),
            rows: (
              <>
                {paginatedData.length === 0 ? (
                  <div className="py-12 text-center text-[var(--color-text-heading)]">
                    <p className="text-sm">No members found</p>
                  </div>
                ) : (
                  paginatedData.map((member, index) => {
                    const isSelectable = 
                      member.status === "pending" || 
                      member.status === "approved" || 
                      member.status === "blocked";
                    const isSelected = selectedIds.includes(member.id);
                    const serialNumber = (currentPage - 1) * pageSize + index + 1;

                    return (
                      <div key={member.id}>
                        <ListRow columns={TABLE_COLUMNS} selected={isSelected}>
                          {isAdmin && (
                            <div className="flex items-center justify-center">
                              {isSelectable ? (
                                <button
                                  onClick={() => handleSelectOne(member.id)}
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
                              <HighlightText text={member.name} highlight={searchTerm} />
                            </p>
                            <p className="text-xs text-[var(--color-text-heading)] opacity-70 truncate">
                              <HighlightText text={member.designation} highlight={searchTerm} />
                            </p>
                          </div>
                          <div className="text-sm text-[var(--color-text-heading)] truncate">
                            <HighlightText text={getDepartmentName(member.department_id)} highlight={searchTerm} />
                          </div>
                          <div className="text-sm text-[var(--color-text-heading)] truncate">
                            <HighlightText text={getTeamName(member.team_id)} highlight={searchTerm} />
                          </div>
                          <StatusBadge status={member.status} />
                          <div className="text-sm text-[var(--color-text-heading)]">
                            {member.joining_date?.split('T')[0] || "N/A"}
                          </div>
                          <div className="flex items-center justify-center gap-3">
                            <button onClick={() => handleView(member.id)} className="text-xs text-[var(--color-primary)] hover:underline">
                              View
                            </button>
                            <button onClick={() => handleEdit(member)} className="text-xs text-blue-600 hover:underline">
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
                              <div className="min-w-0">
                                <p className="text-[var(--color-text-heading)] text-sm truncate">
                                  {member.name}
                                </p>
                                <p className="text-xs text-[var(--color-text-heading)] opacity-70">
                                  {member.designation}
                                </p>
                              </div>
                            </div>
                            {isAdmin && isSelectable && (
                              <button onClick={() => handleSelectOne(member.id)} className="p-1">
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
                              <span className="text-[var(--color-text-heading)]">Department</span>
                              <span className="text-[var(--color-text-heading)]">{getDepartmentName(member.department_id)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[var(--color-text-heading)]">Team</span>
                              <span className="text-[var(--color-text-heading)]">{getTeamName(member.team_id)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[var(--color-text-heading)]">Status</span>
                              <StatusBadge status={member.status} />
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[var(--color-text-heading)]">Joined</span>
                              <span className="text-[var(--color-text-heading)]">
                                {member.joining_date?.split('T')[0] || "N/A"}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[var(--color-border)]">
                            <button onClick={() => handleView(member.id)} className="flex-1 text-xs text-[var(--color-primary)] hover:underline">
                              View
                            </button>
                            <button onClick={() => handleEdit(member)} className="flex-1 text-xs text-blue-600 hover:underline">
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
      {(viewMember || viewLoading) && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setViewMember(null)}
        >
          <div
            className="bg-[var(--color-bg-card)] rounded-lg p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewMember(null)}
              className="absolute top-4 right-4 text-[var(--color-text-heading)] hover:opacity-70"
            >
              <X size={20} />
            </button>

            {viewLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 size={28} className="animate-spin text-[var(--color-primary)]" />
              </div>
            ) : viewMember ? (
              <>
                <div className="mb-5">
                  <h3 className="text-lg text-[var(--color-text-heading)]">
                    {viewMember.name}
                  </h3>
                  <p className="text-xs text-[var(--color-text-heading)] opacity-70">
                    {viewMember.designation}
                  </p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-[var(--color-text-heading)]">Department</span>
                    <span className="text-[var(--color-text-heading)]">{getDepartmentName(viewMember.department_id)}</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-[var(--color-text-heading)]">Team</span>
                    <span className="text-[var(--color-text-heading)]">{getTeamName(viewMember.team_id)}</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-[var(--color-text-heading)]">Status</span>
                    <StatusBadge status={viewMember.status} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-heading)]">Joined</span>
                    <span className="text-[var(--color-text-heading)]">
                      {viewMember.joining_date?.split('T')[0] || "N/A"}
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