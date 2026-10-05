// src/components/admin/AdminSidebar.jsx

import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  Settings,
  LogOut,
  FileText,
  MessageSquare,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Shield,
  Home,
  CheckCircle,
  UserPlus,
  HelpCircle,
  UserCheck,
  TrendingUp,
  Menu,
  X,
  Crown,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { useAdmin } from "../../auth/AdminContext";

/* =========================================================
   ROLE PERMISSIONS
========================================================= */
const ROLE_PERMISSIONS = {
  admin: [
    "dashboard",
    "jobs",
    "job-types",
    "services",
    "applications",
    "departments",
    "users",
    "pending-approvals",
    "create-admin",
    "faq",
    "team",
    "team-members",
    "hiring-requests",
    "messages",
    "analytics",
    "settings",
    "view-website",
  ],
  hr: [
    "dashboard",
    "jobs",
    "job-types",
    "applications",
    "departments",
    "pending-approvals",
    "team",
    "team-members",
    "hiring-requests",
    "messages",
    "settings",
    "view-website",
  ],
  manager: [
    "dashboard",
    "jobs",
    "job-types",
    "applications",
    "departments",
    "team",
    "hiring-requests",
    "messages",
    "analytics",
    "faq",
    "settings",
    "view-website",
  ],
  editor: [
    "dashboard",
    "jobs",
    "job-types",
    "services",
    "applications",
    "messages",
    "faq",
    "settings",
    "view-website",
  ],
  viewer: [
    "dashboard",
    "applications",
    "departments",
    "faq",
    "settings",
    "view-website",
  ],
};

/* =========================================================
   ALL MAIN MENU ITEMS  — ✅ Badge fields hataye
========================================================= */
const allMenuItems = [
  {
    key: "dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/admin/dashboard",
    end: true,
  },
  {
    key: "jobs",
    icon: Briefcase,
    label: "Jobs",
    path: "/admin/jobs",
    children: [
      { key: "jobs-all", label: "Post Jobs", path: "/admin/jobs" },
      { key: "jobs-applications", label: "Job Applications", path: "/admin/jobs/applications" },
    ],
  },
  {
    key: "job-types",
    icon: FileText,
    label: "Job Types",
    path: "/admin/job-types",
    end: true,
  },
 {
  key: "services",
  icon: TrendingUp,
  label: "Services",
  path: "/admin/services",
  children: [
    { key: "services-all", label: "Service Categories", path: "/admin/services" },
    { key: "services-categories", label: "Services", path: "/admin/services/categories" },
  ],
},
  {
    key: "departments",
    icon: Building2,
    label: "Departments",
    path: "/admin/departments",
    children: [
      { key: "departments-all", label: "All Departments", path: "/admin/departments" },
      { key: "departments-team", label: "Teams", path: "/admin/departments/team" },
      { key: "departments-team-members", label: "Team Members", path: "/admin/departments/team/team-members" },
    ],
  },
 {
  key: "users",
  icon: Users,
  label: "Users",
  path: "/admin/users",
  end: true,
},
  {
    key: "pending-approvals",
    icon: CheckCircle,
    label: "Pending Approvals",
    path: "/admin/pending-approvals",
    end: true,
  },
  {
    key: "create-admin",
    icon: UserPlus,
    label: "Add Admin",
    path: "/admin/create-admin",
    end: true,
  },
  // {
  //   key: "faq",
  //   icon: HelpCircle,
  //   label: "FAQ",
  //   path: "/admin/faq",
  //   end: true,
  // },
  {
    key: "hiring-requests",
    icon: UserCheck,
    label: "Hiring Requests",
    path: "/admin/hiring-requests",
    end: true,
  },
  {
    key: "messages",
    icon: MessageSquare,
    label: "Messages",
    path: "/admin/messages",
    end: true,
  },
  {
    key: "analytics",
    icon: BarChart3,
    label: "Analytics",
    path: "/admin/analytics",
    end: true,
  },
];

/* =========================================================
   ROLE ICONS / COLORS / LABELS
========================================================= */
const roleIcons = {
  admin: Crown,
  hr: Users,
  manager: Briefcase,
  editor: FileText,
  viewer: Shield,
};

const roleColors = {
  admin: "text-purple-600 bg-purple-50",
  hr: "text-blue-600 bg-blue-50",
  manager: "text-green-600 bg-green-50",
  editor: "text-orange-600 bg-orange-50",
  viewer: "text-gray-600 bg-gray-50",
};

const roleLabels = {
  admin: "Administrator",
  hr: "HR",
  manager: "Manager",
  editor: "Editor",
  viewer: "Viewer",
};

/* =========================================================
   SIDEBAR COMPONENT
========================================================= */
export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin, logout } = useAdmin();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [expandedKey, setExpandedKey] = useState(null);

  const currentRole = String(admin?.role || "viewer").toLowerCase().trim();
  const allowedKeys = ROLE_PERMISSIONS[currentRole] || ROLE_PERMISSIONS.viewer;

  /* -------------------------------------------------------
     FILTER MENU BY ROLE
  ------------------------------------------------------- */
  const menuItems = allMenuItems
    .map((item) => {
      if (!allowedKeys.includes(item.key)) return null;
      if (!item.children?.length) return item;

      if (currentRole === "admin") return item;

      if (currentRole === "hr") {
        if (item.key === "jobs") {
          return {
            ...item,
            children: item.children.filter((child) =>
              ["jobs-all", "jobs-applications"].includes(child.key)
            ),
          };
        }
        if (item.key === "users") {
          return {
            ...item,
            children: item.children.filter((child) =>
                 ["users-create", "users-profile"].includes(child.key)
            ),
          };
        }
      }

      if (currentRole === "manager") {
        if (item.key === "jobs") {
          return {
            ...item,
            children: item.children.filter((child) =>
              ["jobs-all", "jobs-applications"].includes(child.key)
            ),
          };
        }
      }

      if (currentRole === "editor") {
        if (item.key === "jobs") {
          return {
            ...item,
            children: item.children.filter((child) =>
              ["jobs-all"].includes(child.key)
            ),
          };
        }
        if (item.key === "services") {
          return {
            ...item,
            children: item.children.filter((child) =>
              ["services-all", "services-categories"].includes(child.key)
            ),
          };
        }
      }

      if (currentRole === "viewer") {
        return { ...item, children: undefined };
      }

      return item;
    })
    .filter(Boolean);

  /* -------------------------------------------------------
     AUTO OPEN ACTIVE PARENT
  ------------------------------------------------------- */
  useEffect(() => {
    const activeParent = allMenuItems.find((item) => {
      if (!item.children?.length) return false;
      return item.children.some((child) =>
        location.pathname.startsWith(child.path)
      );
    });

    if (activeParent) setExpandedKey(activeParent.key);
  }, [location.pathname]);

  /* -------------------------------------------------------
     TOGGLES
  ------------------------------------------------------- */
  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
    setIsProfileOpen(false);
  };

  const toggleExpand = (key) => {
    setExpandedKey((prev) => (prev === key ? null : key));
  };

  const isActive = (path, end = false) => {
    if (end) return location.pathname === path;
    if (path === "/admin/dashboard") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const isChildActive = (childPath) => location.pathname === childPath;

  /* -------------------------------------------------------
     USER DATA
  ------------------------------------------------------- */
  const RoleIcon = roleIcons[currentRole] || Shield;
  const roleColor = roleColors[currentRole] || "text-gray-600 bg-gray-50";
  const displayName = admin?.name || admin?.username || "Admin";
  const displayRole =
    admin?.position || admin?.designation || roleLabels[currentRole] || currentRole;
  const displayEmail = admin?.email || "admin@aroosha.com";

  const handleNavigate = (path) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    setIsMobileOpen(false);
    logout();
  };

  /* =======================================================
     SIDEBAR CONTENT
  ======================================================= */
  function SidebarContent() {
    return (
      <div className="flex flex-col h-full bg-card">

        {/* ═════ HEADER ═════ */}
        <div
          className={`flex items-center border-b border-border shrink-0 ${
            isCollapsed ? "justify-center p-3" : "justify-between px-4 py-3"
          }`}
        >
          {!isCollapsed && (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <Shield size={19} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-heading text-sm truncate">AROOSHA</p>
                <p className="text-[10px] text-muted truncate">Admin Panel</p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={toggleCollapse}
            className="p-2 rounded-lg text-muted hover:bg-muted hover:text-heading transition-all"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? <ChevronsRight size={19} /> : <ChevronsLeft size={19} />}
          </button>
        </div>

        {/* ═════ MENU (scroll) ═════ */}
        <div className={`flex-1 overflow-y-auto py-4 space-y-1 ${isCollapsed ? "px-2" : "px-3"}`}>
          {menuItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const itemIsActive = isActive(item.path, item.end);
            const childIsActive = hasChildren
              ? item.children.some((child) => isChildActive(child.path))
              : false;
            const isExpanded = expandedKey === item.key;

            return (
              <div key={item.key} className="w-full">
                <button
                  type="button"
                  onClick={() => {
                    if (hasChildren && !isCollapsed) {
                      toggleExpand(item.key);
                    } else {
                      handleNavigate(item.path);
                    }
                  }}
                                   className={`w-full flex items-center rounded-full transition-all duration-200 ${
                    isCollapsed ? "justify-center px-2 py-3" : "justify-between px-3 py-3"
                  } ${
                    itemIsActive && !hasChildren
                      ? "bg-primary text-white shadow-lg shadow-primary/30"
                      : childIsActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:bg-muted hover:text-heading"
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className={`flex items-center min-w-0 ${isCollapsed ? "justify-center" : "gap-3"}`}>
                    <item.icon
                      size={isCollapsed ? 21 : 18}
                      className={`shrink-0 ${
                        itemIsActive && !hasChildren
                          ? "text-white"
                          : childIsActive
                          ? "text-primary"
                          : "text-muted"
                      }`}
                    />
                    {!isCollapsed && <span className="truncate text-sm">{item.label}</span>}
                  </div>

                  {/* ✅ Sirf arrow — badge nahi */}
                  {!isCollapsed && hasChildren && (
                    <span className="ml-2 shrink-0">
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>
                  )}
                </button>

                {!isCollapsed && hasChildren && isExpanded && (
                  <div className="ml-5 mt-1 pl-3 border-l-2 border-primary/15 space-y-1">
                    {item.children.map((child) => {
                      const active = isChildActive(child.path);
                      return (
                        <button
                          type="button"
                          key={child.key}
                          onClick={() => handleNavigate(child.path)}
                          className={`w-full flex items-center text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                            active
                              ? "text-primary font-semibold bg-primary/10"
                              : "text-muted hover:text-heading hover:bg-muted/50"
                          }`}
                        >
                          {active && (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 shrink-0" />
                          )}
                          <span className="truncate">{child.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ═════ PROFILE (fixed bottom) ═════ */}
        <div className="border-t border-border shrink-0 bg-card">

          {isProfileOpen && !isCollapsed && (
            <div className="px-3 pt-2 pb-1 space-y-1">
              <div className="px-3 py-2 mb-1 rounded-xl bg-muted/40 border border-border">
                <p className="text-[10px] uppercase tracking-wider text-muted font-semibold">
                  Signed in as
                </p>
                <p className="text-sm font-semibold text-heading truncate mt-0.5">
                  {displayEmail}
                </p>
              </div>

              {allowedKeys.includes("settings") && (
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/admin/settings");
                    setIsMobileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:bg-muted hover:text-heading transition-all"
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
              )}

              {allowedKeys.includes("view-website") && (
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:bg-muted hover:text-heading transition-all"
                >
                  <Home size={18} />
                  <span>View Website</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}

          <div className={isCollapsed ? "p-2" : "p-3"}>
            <button
              type="button"
              onClick={() => {
                if (isCollapsed) {
                  setIsCollapsed(false);
                  setIsProfileOpen(true);
                  return;
                }
                setIsProfileOpen((prev) => !prev);
              }}
              className={`w-full flex items-center rounded-xl transition-all ${
                isCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-3"
              } ${
                isProfileOpen ? "bg-primary text-white" : "text-muted hover:bg-muted"
              }`}
              title={isCollapsed ? `${displayName} - ${displayRole}` : undefined}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  isProfileOpen ? "bg-white/20 text-white" : roleColor
                }`}
              >
                <RoleIcon size={17} />
              </div>

              {!isCollapsed && (
                <>
                  <div className="flex-1 min-w-0 text-left">
                    <p className={`text-sm font-semibold truncate ${isProfileOpen ? "text-white" : "text-heading"}`}>
                      {displayName}
                    </p>
                    <p className={`text-[11px] truncate ${isProfileOpen ? "text-white/80" : "text-muted"}`}>
                      {displayRole}
                    </p>
                  </div>
                  <div className={`shrink-0 ${isProfileOpen ? "text-white" : "text-muted"}`}>
                    {isProfileOpen ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     MOBILE
  ======================================================= */
  if (isMobileOpen) {
    return (
      <div
        className="fixed inset-0 z-50 bg-black/50 md:hidden"
        onClick={() => setIsMobileOpen(false)}
      >
        <div
          className="relative w-72 max-w-[85vw] h-full bg-card shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-3 right-3 z-20 p-2 rounded-lg bg-card text-muted hover:bg-muted"
          >
            <X size={20} />
          </button>
          <SidebarContent />
        </div>
      </div>
    );
  }

  /* =======================================================
     DESKTOP
  ======================================================= */
  return (
    <>
      <button
        type="button"
        onClick={() => setIsMobileOpen(true)}
        className="fixed bottom-4 right-4 z-40 md:hidden p-3 bg-primary text-white rounded-full shadow-xl"
      >
        <Menu size={24} />
      </button>

        <aside
  className={`hidden md:flex flex-col bg-card rounded-3xl shadow-2xl shadow-black/20 h-full shrink-0 transition-[width] duration-300 ${
    isCollapsed ? "w-16" : "w-64"
  }`}
>
        <SidebarContent />
      </aside>
    </>
  );
}