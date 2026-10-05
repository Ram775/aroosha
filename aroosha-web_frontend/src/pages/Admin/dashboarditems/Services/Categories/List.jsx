// src/pages/Admin/dashboarditems/Services/Categories/List.jsx
import { useState, useEffect } from "react";
import { Loader2, Square, CheckSquare, X } from "lucide-react";
import { useAdmin } from "../../../../../auth/AdminContext";
import { Alert, HighlightText } from "../../../../../components/ui";
import FilterSelect from "../../../../../components/ui/FilterSelect";
import Pagination from "../../../../../components/ui/Pagination";
import ListTable from "../../../../../components/ui/ListTable";
import ListRow, { MobileCard } from "../../../../../components/ui/ListRow";
import ListHeader from "../../../../../components/ui/ListHeader";
import {
  getAllServices,
  deleteService,
  getServiceById,
  toggleServiceActive,
} from "../../../../../api/servicesApi";
import { getAllCategories } from "../../../../../api/serviceCategoryApi";
import { getDepartments } from "../../../../../api/departments";

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

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const TABLE_COLUMNS = "grid-cols-[50px_50px_2fr_1fr_1fr_1fr_260px]";

export default function ServiceList({ onEdit }) {
  const { admin } = useAdmin();

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [viewService, setViewService] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  const isAdmin =
    admin?.role === "admin" ||
    admin?.role === "super_admin" ||
    admin?.role === "hr";

  // ============================================================
  // 📌 FETCH
  // ============================================================
  const fetchServices = async () => {
    setLoading(true);
    setError("");
    try {
      const [data, cats, deps] = await Promise.all([
        getAllServices(),
        getAllCategories().catch(() => []),
        getDepartments().catch(() => []),
      ]);

      let finalData = [];
      if (Array.isArray(data)) finalData = data;
      else if (data && Array.isArray(data.data)) finalData = data.data;
      else if (data && Array.isArray(data.results)) finalData = data.results;
      else if (data && Array.isArray(data.result)) finalData = data.result;
      else if (data && Array.isArray(data.items)) finalData = data.items;

      console.log("📥 Services fetched:", finalData);

      setServices(finalData);
      setCategories(Array.isArray(cats) ? cats : []);
      setDepartments(Array.isArray(deps) ? deps : []);
      setSelectedIds([]);
      setCurrentPage(1);
    } catch (err) {
      console.error("❌ Error fetching services:", err);
      if (err.response?.status === 401) {
        setError("Session expired! Please login again.");
      } else {
        setError(err.response?.data?.detail || "Failed to load services");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, pageSize, statusFilter]);

  const getCategoryName = (id) =>
    categories.find((c) => c.id === id)?.name || "—";

  const getDepartmentName = (id) => {
    const d = departments.find((x) => x.id === id);
    return d?.department_name || d?.name || "—";
  };

  // ============================================================
  // 📌 VIEW
  // ============================================================
  const handleView = async (id) => {
    setViewLoading(true);
    setError("");
    try {
      const res = await getServiceById(id);
      const data = res?.data || res?.result || res;
      console.log("📥 Service details:", data);
      setViewService(data);
    } catch (err) {
      console.error("❌ View error:", err);
      setError(err.response?.data?.detail || "Failed to load details");
    } finally {
      setViewLoading(false);
    }
  };

  // ============================================================
  // 📌 TOGGLE ACTIVE
  // ============================================================
  const handleToggleActive = async (service) => {
    const nextState = !service.is_active;

    setServices((prev) =>
      prev.map((s) =>
        s.id === service.id ? { ...s, is_active: nextState } : s
      )
    );

    setTogglingId(service.id);
    setError("");
    setSuccess("");

    try {
      const res = await toggleServiceActive(service.id, nextState);
      const updated = res?.data || res?.result || res;

      console.log("📥 Toggle response:", updated);

      setServices((prev) =>
        prev.map((s) =>
          s.id === service.id
            ? { ...s, ...updated, is_active: updated?.is_active ?? nextState }
            : s
        )
      );

      setSuccess(
        `✅ "${service.title}" is now ${
          nextState
            ? "ACTIVE — visible on website"
            : "INACTIVE — hidden from website"
        }.`
      );
    } catch (err) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === service.id ? { ...s, is_active: service.is_active } : s
        )
      );
      console.error("❌ Toggle error:", err);
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
  const sortServices = (data) => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      const nA = a.title?.toLowerCase() || "";
      const nB = b.title?.toLowerCase() || "";
      return sortOrder === "asc"
        ? nA.localeCompare(nB)
        : nB.localeCompare(nA);
    });
    return sorted;
  };

  const getFilteredServices = () => {
    let filtered = services;

    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      filtered = filtered.filter((sv) => sv.title?.toLowerCase().includes(s));
    }

    if (statusFilter === "active") {
      filtered = filtered.filter((sv) => sv.is_active);
    } else if (statusFilter === "inactive") {
      filtered = filtered.filter((sv) => !sv.is_active);
    }

    return sortServices(filtered);
  };

  const filteredData = getFilteredServices();
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // ============================================================
  // 📌 SELECTION
  // ============================================================
  const handleSelectAll = () => {
    const ids = filteredData.map((s) => s.id);
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
    const ids = filteredData.map((s) => s.id);
    return ids.length > 0 && ids.every((id) => selectedIds.includes(id));
  };

  // ============================================================
  // 📌 BULK DELETE
  // ============================================================
  const handleBulkDelete = async () => {
    if (!selectedIds.length)
      return setError("Please select at least one service.");
    setIsProcessing(true);
    setError("");
    setSuccess("");
    try {
      for (const id of selectedIds) await deleteService(id);
      await fetchServices();
      setSuccess(`🗑️ ${selectedIds.length} service(s) deleted!`);
      setSelectedIds([]);
    } catch (err) {
      console.error("❌ Bulk delete error:", err);
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
  // 📌 EDIT — callback se parent ko batao
  // ============================================================
  const handleEdit = (service) => {
    if (onEdit) onEdit(service);
  };

  // ============================================================
  // 📌 LOADING
  // ============================================================
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2
          size={32}
          className="animate-spin text-[var(--color-primary)]"
        />
        <span className="ml-3 text-[var(--color-text-heading)] text-sm">
          Loading services...
        </span>
      </div>
    );
  }

  // ============================================================
  // 📌 RENDER
  // ============================================================
  return (
    <div className="space-y-4">
      {error && (
        <Alert type="error" message={error} onClose={() => setError("")} />
      )}
      {success && (
        <Alert
          type="success"
          message={success}
          onClose={() => setSuccess("")}
        />
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
            placeholder="Search services by title..."
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
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
            className="w-32"
          />

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
                <span>Title</span>
                <span>Category</span>
                <span>Department</span>
                <span>Status</span>
                <span className="text-center">Actions</span>
              </ListHeader>
            ),
            rows: (
              <>
                {paginatedData.length === 0 ? (
                  <div className="py-12 text-center text-[var(--color-text-heading)]">
                    <p className="text-sm">No services found</p>
                  </div>
                ) : (
                  paginatedData.map((service, index) => {
                    const isSelected = selectedIds.includes(service.id);
                    const serialNumber =
                      (currentPage - 1) * pageSize + index + 1;
                    const isToggling = togglingId === service.id;

                    return (
                      <div key={service.id}>
                        <ListRow columns={TABLE_COLUMNS} selected={isSelected}>
                          {isAdmin && (
                            <div className="flex items-center justify-center">
                              <button
                                onClick={() => handleSelectOne(service.id)}
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
                                text={service.title}
                                highlight={searchTerm}
                              />
                            </p>
                          </div>
                          <div className="text-sm text-[var(--color-text-heading)] truncate">
                            {getCategoryName(service.category_id)}
                          </div>
                          <div className="text-sm text-[var(--color-text-heading)] truncate">
                            {getDepartmentName(service.department_id)}
                          </div>
                          <div className="text-sm">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                service.is_active
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {service.is_active ? "Active" : "Inactive"}
                            </span>
                          </div>

                          {/* ACTIONS + TOGGLE */}
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => handleView(service.id)}
                              className="text-xs text-[var(--color-primary)] hover:underline"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleEdit(service)}
                              className="text-xs text-blue-600 hover:underline"
                            >
                              Edit
                            </button>

                            {isAdmin && (
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  role="switch"
                                  aria-checked={!!service.is_active}
                                  onClick={() => handleToggleActive(service)}
                                  disabled={isToggling}
                                  title={
                                    service.is_active
                                      ? "Click to deactivate"
                                      : "Click to activate"
                                  }
                                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                                    service.is_active
                                      ? "bg-emerald-500"
                                      : "bg-gray-300"
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                                      service.is_active
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
                                  {service.title}
                                </p>
                              </div>
                            </div>
                            {isAdmin && (
                              <button
                                onClick={() => handleSelectOne(service.id)}
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
                                Category
                              </span>
                              <span className="text-[var(--color-text-heading)]">
                                {getCategoryName(service.category_id)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[var(--color-text-heading)]">
                                Department
                              </span>
                              <span className="text-[var(--color-text-heading)]">
                                {getDepartmentName(service.department_id)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-[var(--color-text-heading)]">
                                Status
                              </span>
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                                  service.is_active
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {service.is_active ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[var(--color-border)]">
                            <button
                              onClick={() => handleView(service.id)}
                              className="text-xs text-[var(--color-primary)] hover:underline"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleEdit(service)}
                              className="text-xs text-blue-600 hover:underline"
                            >
                              Edit
                            </button>

                            {isAdmin && (
                              <div className="ml-auto flex items-center gap-2">
                                <span
                                  className={`text-[11px] font-medium ${
                                    service.is_active
                                      ? "text-emerald-600"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {service.is_active ? "Active" : "Inactive"}
                                </span>
                                <button
                                  type="button"
                                  role="switch"
                                  aria-checked={!!service.is_active}
                                  onClick={() => handleToggleActive(service)}
                                  disabled={togglingId === service.id}
                                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none disabled:opacity-50 ${
                                    service.is_active
                                      ? "bg-emerald-500"
                                      : "bg-gray-300"
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                                      service.is_active
                                        ? "translate-x-4"
                                        : "translate-x-0.5"
                                    }`}
                                  />
                                  {togglingId === service.id && (
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
      {(viewService || viewLoading) && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setViewService(null)}
        >
          <div
            className="bg-[var(--color-bg-card)] rounded-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewService(null)}
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
            ) : viewService ? (
              <>
                <div className="mb-5 pr-8">
                  <h3 className="text-lg text-[var(--color-text-heading)]">
                    {viewService.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-heading)] opacity-70">
                    Service #{viewService.id}
                  </p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-[var(--color-text-heading)]">
                      Category
                    </span>
                    <span className="text-[var(--color-text-heading)]">
                      {getCategoryName(viewService.category_id)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-[var(--color-text-heading)]">
                      Department
                    </span>
                    <span className="text-[var(--color-text-heading)]">
                      {getDepartmentName(viewService.department_id)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span className="text-[var(--color-text-heading)]">
                      Status
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        viewService.is_active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {viewService.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  {viewService.description && (
                    <div>
                      <span className="text-[var(--color-text-heading)] block mb-1">
                        Description
                      </span>
                      <p className="text-[var(--color-text-heading)] opacity-80">
                        {viewService.description}
                      </p>
                    </div>
                  )}
                  {viewService.created_at && (
                    <div className="flex justify-between">
                      <span className="text-[var(--color-text-heading)]">
                        Created
                      </span>
                      <span className="text-[var(--color-text-heading)]">
                        {viewService.created_at?.split("T")[0] || "N/A"}
                      </span>
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}