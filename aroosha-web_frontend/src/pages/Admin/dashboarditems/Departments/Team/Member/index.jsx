// src/pages/Admin/dashboarditems/TeamMembers/index.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Users, Eye, Plus } from "lucide-react";
import { useAdmin } from "../../../../../../auth/AdminContext";
import TeamMembersList from "./List";
import AddTeamMember from "./Add";

export default function TeamMembers() {
  const { admin } = useAdmin();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("list");
  const [members, setMembers] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
    if (location.state?.editData) {
      setEditData(location.state.editData);
    }
  }, [location]);

  const isHR = admin?.role === 'hr' || admin?.role === 'admin' || admin?.role === 'super_admin';

  const handleMemberAdded = () => {
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
          <Users size={24} className="text-primary" />
          Team Members
        </h1>
        <p className="text-muted text-sm mt-1">
          {admin?.role === 'admin' ? "Manage all team members" : "View and add team members"}
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
              Members List
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
              {editData ? "Edit Member" : "Add Member"}
            </button>
          </nav>
        </div>
      )}

      {activeTab === "list" && <TeamMembersList key={refreshKey} />}

      {activeTab === "add" && (
        <AddTeamMember 
          members={members} 
          setMembers={setMembers} 
          onRefresh={handleMemberAdded}
          editData={editData}
          onCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
}