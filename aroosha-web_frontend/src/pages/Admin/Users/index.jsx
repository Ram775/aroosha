// src/pages/Admin/Users/index.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Eye, Plus, Users as UsersIcon } from "lucide-react";
import { useAdmin } from "../../../auth/AdminContext";
import UsersList from "./List";
import CreateUser from "./CreateUser";

export default function UsersPage() {
  const { admin } = useAdmin();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("list");
  const [users, setUsers] = useState([]);              // ← local list
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (location.state?.activeTab) setActiveTab(location.state.activeTab);
    if (location.state?.editData) setEditData(location.state.editData);
  }, [location]);

  const isAdmin = admin?.role === "admin" || admin?.role === "super_admin";

  const handleUserAdded = () => {
    setActiveTab("list");
    setEditData(null);
  };

  const handleCancelEdit = () => {
    setEditData(null);
    setActiveTab("list");
  };

  const handleEdit = (user) => {
    setEditData(user);
    setActiveTab("add");
  };

  const tabs = [
    { key: "list", label: "Users List", icon: Eye },
    { key: "add", label: editData ? "Edit User" : "Add User", icon: Plus },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-heading)] flex items-center gap-2">
          <UsersIcon size={24} className="text-[var(--color-primary)]" />
          Users
        </h1>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">
          {isAdmin ? "Manage all users" : "View users"}
        </p>
      </div>

      {isAdmin && (
        <div className="border-b border-[var(--color-border)]">
          <nav className="flex gap-0" aria-label="Tabs">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => {
                  if (key === "list") setEditData(null);
                  setActiveTab(key);
                }}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-all duration-200 flex items-center gap-2 ${
                  activeTab === key
                    ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                    : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-heading)] hover:border-[var(--color-border)]"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {activeTab === "list" && (
        <UsersList users={users} setUsers={setUsers} onEdit={handleEdit} />
      )}

      {activeTab === "add" && (
        <CreateUser
          users={users}
          setUsers={setUsers}
          onRefresh={handleUserAdded}
          editData={editData}
          onCancelEdit={handleCancelEdit}
        />
      )}
    </div>
  );
}