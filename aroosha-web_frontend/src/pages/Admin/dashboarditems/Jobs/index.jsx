// src/pages/Admin/dashboarditems/jobs/index.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { List, Plus } from "lucide-react";
import JobList from "./List";
import AddJob from "./Add";

export default function JobsPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("list");
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (location.state?.activeTab) setActiveTab(location.state.activeTab);
    if (location.state?.editData) {
      setEditData(location.state.editData);
      setActiveTab("add");
    }
  }, [location.state]);

  const handleCancelEdit = () => {
    setEditData(null);
    setActiveTab("list");
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border)] mb-4">
        <button
          onClick={() => { setActiveTab("list"); setEditData(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm border-b-2 transition-all ${
            activeTab === "list"
              ? "border-[var(--color-primary)] text-[var(--color-primary)] font-medium"
              : "border-transparent text-[var(--color-text-heading)] hover:text-[var(--color-primary)]"
          }`}
        >
          <List size={16} />
          Jobs List
        </button>
        <button
          onClick={() => { setActiveTab("add"); setEditData(null); }}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm border-b-2 transition-all ${
            activeTab === "add"
              ? "border-[var(--color-primary)] text-[var(--color-primary)] font-medium"
              : "border-transparent text-[var(--color-text-heading)] hover:text-[var(--color-primary)]"
          }`}
        >
          <Plus size={16} />
          Add Job
        </button>
      </div>

      {activeTab === "list" ? (
        <JobList />
      ) : (
        <AddJob
          editData={editData}
          onCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
}