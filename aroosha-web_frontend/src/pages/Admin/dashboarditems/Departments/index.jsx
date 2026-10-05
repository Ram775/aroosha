// src/pages/Admin/dashboarditems/Departments/index.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Eye, Plus, Building2 } from "lucide-react";
import { useAdmin } from "../../../../auth/AdminContext";
import DepartmentsList from "./List";
import AddDepartment from "./Add";

export default function Departments() {
  const { admin } = useAdmin();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("list");
  const [departments, setDepartments] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [editData, setEditData] = useState(null);

  // ✅ CHECK LOCATION STATE FOR EDIT
  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
    if (location.state?.editData) {
      setEditData(location.state.editData);
      console.log("✏️ Edit Data received:", location.state.editData);
    }
  }, [location]);

  const isHR = admin?.role === 'hr' || admin?.role === 'admin' || admin?.role === 'super_admin';

  const handleDepartmentAdded = () => {
    setRefreshKey(prev => prev + 1);
    setActiveTab("list");
    setEditData(null);
  };

  const handleCancelEdit = () => {
    setEditData(null);
    setActiveTab("list");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-heading flex items-center gap-2">
          <Building2 size={24} className="text-primary" />
          Departments
        </h1>
        <p className="text-muted text-sm mt-1">
          {admin?.role === 'admin' ? "Manage all departments" : "View and create departments"}
        </p>
      </div>

      {isHR && (
        <div className="border-b border-border">
          <nav className="flex gap-0" aria-label="Tabs">
            <button
              onClick={() => {
                setActiveTab("list");
                setEditData(null);
              }}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-all duration-200 flex items-center gap-2 ${
                activeTab === "list"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-heading hover:border-border"
              }`}
            >
              <Eye size={16} />
              Departments List
            </button>
            <button
              onClick={() => setActiveTab("add")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-all duration-200 flex items-center gap-2 ${
                activeTab === "add"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted hover:text-heading hover:border-border"
              }`}
            >
              <Plus size={16} />
              {editData ? "Edit Department" : "Add Department"}
            </button>
          </nav>
        </div>
      )}

      {activeTab === "list" && (
        <DepartmentsList 
          key={refreshKey}
          departments={departments} 
          setDepartments={setDepartments} 
        />
      )}

      {activeTab === "add" && (
        <AddDepartment 
          departments={departments} 
          setDepartments={setDepartments} 
          onRefresh={handleDepartmentAdded}
          editData={editData}
          onCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
}