// src/pages/Admin/Users/List.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle, XCircle,
  Square, CheckSquare, X, User as UserIcon,
} from "lucide-react";
import { useAdmin } from "../../../auth/AdminContext";
import StatusBadge from "../../../components/ui/StatusBadge";
import HighlightText from "../../../components/ui/HighlightText";
import Pagination from "../../../components/ui/Pagination";
import FilterSelect from "../../../components/ui/FilterSelect";
import ListTable from "../../../components/ui/ListTable";
import ListRow, { MobileCard } from "../../../components/ui/ListRow";
import ListHeader from "../../../components/ui/ListHeader";

const filterOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "all", label: "All Users" },
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

const roleOptions = [
  { value: "all", label: "All Roles" },
  { value: "admin", label: "Admin" },
  { value: "hr", label: "HR" },
  { value: "editor", label: "Editor" },
];

const TABLE_COLUMNS = "grid-cols-[50px_50px_2fr_1.5fr_120px_130px_130px]";

const ROLE_BADGE = {
  admin: "bg-orange-500/10 text-orange-600 border-orange-500/30",
  hr: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  editor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
};

export default function UsersList({ users = [], setUsers, onEdit }) {
  const navigate = useNavigate();
  const { admin } = useAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("active");
  const [roleFilter, setRoleFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewUser, setViewUser] = useState(null);

  const isAdmin = admin?.role === "admin" || admin?.role === "super_admin";

  // ===== FILTER / SORT (frontend pe hi) =====
  const sortUsers = (data) => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      const nameA = a.full_name?.toLowerCase() || "";
      const nameB = b.full_name?.toLowerCase() || "";
      return sortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    return sorted;
  };

  const getFilteredUsers = () => {
    let filtered = [...users];

    if (searchTerm) {
      filtered = filtered.filter(u =>
        u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter(u => u.role === roleFilter);
    }

    if (yearFilter && yearFilter !== "all") {
      filtered = filtered.filter(u =>
        u.created_at &&
        new Date(u.created_at).getFullYear().toString() === yearFilter
      );
    }

    if (filterStatus === "active") {
      filtered = filtered.filter(u => u.is_active !== false);
    } else if (filterStatus === "inactive") {
      filtered = filtered.filter(u => u.is_active === false);
    }

    return sortUsers(filtered);
  };

  const filteredData = getFilteredUsers();
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;

  // ===== SELECTION =====
  const handleSelectAll = () => {
    const ids = filteredData.map(u => u.id);
    setSelectedIds(
      selectedIds.length === ids.length && ids.length > 0 ? [] : ids
    );
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const isAllSelected = () => {
    const ids = filteredData.map(u => u.id);
    return ids.length > 0 && ids.every(id => selectedIds.includes(id));
  };

  // ===== DELETE (sirf frontend se hataao) =====
  const handleBulkDelete = () => {
    if (!selectedIds.length) return setError("Please select at least one user.");
    if (!window.confirm(`Remove ${selectedIds.length} user(s) from this list?`))
      return;

    if (setUsers) {
      setUsers(prev => prev.filter(u => !selectedIds.includes(u.id)));
    }
    setSelectedIds([]);
    setSuccess(`${selectedIds.length} user(s) removed from list.`);
    setTimeout(() => { setSuccess(""); setError(""); }, 3000);
  };

  const handleEdit = (user) => {
    if (onEdit) onEdit(user);
    else
      navigate("/admin/users", {
        state: { activeTab: "add", editData: user },
      });
  };

  return (
    <div className="space-y-4">

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

      {/* TOP BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative w-full lg:flex-1 lg:max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by name, username or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[var(--color-bg-card)] text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-muted)] border border-[var(--color-border)] focus:outline-none focus:border-[var(--color-primary)] transition-all duration-200 hover:border-[var(--color-primary)]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
          {isAdmin && (
            <button
              onClick={handleBulkDelete}
              disabled={!selectedIds.length}
              className="px-3 py-2 rounded-xl bg-[var(--color-bg-card)] text-red-600 text-xs border border-red-600 hover:bg-red-50 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Delete
            </button>
          )}

          <FilterSelect value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} options={sortOptions} className="w-28" />
          <FilterSelect
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
            options={perPageOptions}
            className="w-32"
          />
          <FilterSelect value={yearFilter} onChange={(e) => setYearFilter(e.target.value)} options={yearOptions} className="w-28" />
          <FilterSelect value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} options={roleOptions} className="w-28" />
          <FilterSelect value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} options={filterOptions} className="w-32" />
        </div>
      </div>

      {/* TABLE */}
      <ListTable columns={TABLE_COLUMNS}>
        {{
          header: (
            <ListHeader>
              {isAdmin && (
                <div className="flex items-center justify-center">
                  <button
                    onClick={handleSelectAll}
                    disabled={filteredData.length === 0}
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
              <span>User</span>
              <span>Email</span>
              <span>Status</span>
              <span>Created</span>
              <span className="text-center">Actions</span>
            </ListHeader>
          ),
          rows: (
            <>
              {paginatedData.length === 0 ? (
                <div className="py-12 text-center text-[var(--color-text-heading)]">
                  <p className="text-sm">No users yet</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Create one from the "Add User" tab
                  </p>
                </div>
              ) : (
                paginatedData.map((user, index) => {
                  const serialNumber = (currentPage - 1) * pageSize + index + 1;
                  const isSelected = selectedIds.includes(user.id);

                  return (
                    <div key={user.id}>
                      <ListRow columns={TABLE_COLUMNS} selected={isSelected}>
                        {isAdmin && (
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => handleSelectOne(user.id)}
                              className="p-1.5 rounded-md hover:bg-[var(--color-bg-muted)] transition-all"
                            >
                              {isSelected ? (
                                <CheckSquare size={18} className="text-[var(--color-primary)]" />
                              ) : (
                                <Square size={18} className="text-[var(--color-text-heading)]" />
                              )}
                            </button>
                          </div>
                        )}

                        <div className="text-sm text-[var(--color-text-heading)]">
                          {serialNumber}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-[var(--color-text-heading)] text-sm truncate">
                              <HighlightText text={user.full_name} highlight={searchTerm} />
                            </p>
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize ${ROLE_BADGE[user.role] || ""}`}>
                              {user.role}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">
                            @{user.username}
                          </p>
                        </div>

                        <div className="text-sm text-[var(--color-text-heading)] truncate">
                          <HighlightText text={user.email} highlight={searchTerm} />
                        </div>

                        <StatusBadge status={user.is_active === false ? "inactive" : "active"} />

                        <div className="text-sm text-[var(--color-text-heading)]">
                          {user.created_at
                            ? new Date(user.created_at).toLocaleDateString()
                            : "-"}
                        </div>

                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => setViewUser(user)}
                            className="text-xs text-[var(--color-primary)] hover:underline"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-xs text-blue-600 hover:underline"
                          >
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
                              {user.full_name}
                            </p>
                          </div>
                          {isAdmin && (
                            <button onClick={() => handleSelectOne(user.id)} className="p-1">
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
                            <span>Username</span>
                            <span>@{user.username}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Email</span>
                            <span className="truncate">{user.email}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Status</span>
                            <StatusBadge status={user.is_active === false ? "inactive" : "active"} />
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4 pt-3">
                          <button onClick={() => setViewUser(user)} className="flex-1 text-xs text-[var(--color-primary)] hover:underline">
                            View
                          </button>
                          <button onClick={() => handleEdit(user)} className="flex-1 text-xs text-blue-600 hover:underline">
                            Edit
                          </button>
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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        totalItems={filteredData.length}
      />

      {/* VIEW MODAL */}
      {viewUser && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setViewUser(null)}
        >
          <div
            className="bg-[var(--color-bg-card)] rounded-xl p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewUser(null)}
              className="absolute top-4 right-4 text-[var(--color-text-heading)] hover:opacity-70"
            >
              <X size={20} />
            </button>
            <div className="mb-5 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[var(--color-primary-pale)]">
                <UserIcon size={16} className="text-[var(--color-primary)]" />
              </div>
              <h3 className="text-lg text-[var(--color-text-heading)]">
                {viewUser.full_name}
              </h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                <span>Username</span>
                <span>@{viewUser.username}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                <span>Email</span>
                <span className="truncate">{viewUser.email}</span>
              </div>
              <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                <span>Role</span>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium border capitalize ${ROLE_BADGE[viewUser.role] || ""}`}>
                  {viewUser.role}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status</span>
                <StatusBadge status={viewUser.is_active === false ? "inactive" : "active"} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}