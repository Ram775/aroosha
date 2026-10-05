// src/pages/Admin/dashboarditems/Services/Categories/index.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { List, Plus } from "lucide-react";
import ServiceList from "./List";
import AddService from "./Add";

export default function CategoriesPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("list");
  const [editData, setEditData] = useState(null);

  // ============================================================
  // 📌 HANDLE NAVIGATION STATE (agar bahar se aaye)
  // ============================================================
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
    if (location.state?.editData) {
      setEditData(location.state.editData);
      setActiveTab("add");
    }
  }, [location.state]);

  const handleCancelEdit = () => {
    setEditData(null);
    setActiveTab("list");
  };

  const handleEditFromList = (service) => {
    setEditData(service);
    setActiveTab("add");
  };

  const handleSuccess = () => {
    setEditData(null);
    setActiveTab("list");
  };

  const goToList = () => {
    setEditData(null);
    setActiveTab("list");
  };

  const goToAdd = () => {
    setEditData(null);
    setActiveTab("add");
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)] mb-4">
        <button
          type="button"
          onClick={goToList}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm border-b-2 transition-all ${
            activeTab === "list"
              ? "border-[var(--color-primary)] text-[var(--color-primary)] font-medium"
              : "border-transparent text-[var(--color-text-heading)] hover:text-[var(--color-primary)]"
          }`}
        >
          <List size={16} />
          Services List
        </button>
        <button
          type="button"
          onClick={goToAdd}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm border-b-2 transition-all ${
            activeTab === "add"
              ? "border-[var(--color-primary)] text-[var(--color-primary)] font-medium"
              : "border-transparent text-[var(--color-text-heading)] hover:text-[var(--color-primary)]"
          }`}
        >
          <Plus size={16} />
          Add Service
        </button>
      </div>

      {activeTab === "list" ? (
        <ServiceList onEdit={handleEditFromList} />
      ) : (
        <AddService
          editData={editData}
          onCancelEdit={handleCancelEdit}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}