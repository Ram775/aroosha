// src/pages/admin/Dashboard/index.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Briefcase,
  FileText,
  Building2,
  Shield,
  Loader2,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  UserPlus,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { getRoleInfo } from "../../../data/roles";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }
    try {
      const data = JSON.parse(localStorage.getItem("adminData") || "{}");
      setAdmin(data);
    } catch (err) {
      console.error("Error parsing admin data:", err);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 size={32} className="animate-spin text-[var(--color-primary)]" />
        <span className="ml-3 text-sm text-[var(--color-text-heading)]">
          Loading dashboard...
        </span>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-sm text-[var(--color-text-muted)]">
          Loading profile...
        </p>
      </div>
    );
  }

  const roleInfo = getRoleInfo(admin.role);
  const isAdmin = admin.role === "admin" || admin.role === "super_admin";

  // ============================================================
  // 🧪 DUMMY DATA — API ready hone par replace karenge
  // ============================================================
  const stats = [
    {
      label: "Total Users",
      value: "1,284",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Active Jobs",
      value: "47",
      change: "+4.2%",
      trend: "up",
      icon: Briefcase,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Applications",
      value: "156",
      change: "-2.1%",
      trend: "down",
      icon: FileText,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Departments",
      value: "12",
      change: "+1",
      trend: "up",
      icon: Building2,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      icon: UserPlus,
      color: "text-blue-600",
      bg: "bg-blue-50",
      title: "New application received",
      description: "John Doe applied for Senior React Developer",
      time: "2 min ago",
    },
    {
      id: 2,
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      title: "Job approved",
      description: "UI/UX Designer position was approved",
      time: "1 hour ago",
    },
    {
      id: 3,
      icon: Briefcase,
      color: "text-purple-600",
      bg: "bg-purple-50",
      title: "New job posted",
      description: "Backend Engineer added to Engineering dept",
      time: "3 hours ago",
    },
    {
      id: 4,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      title: "Pending review",
      description: "3 applications awaiting your approval",
      time: "5 hours ago",
    },
  ];

  const topDepartments = [
    { name: "Engineering", jobs: 18, applications: 64 },
    { name: "Design", jobs: 8, applications: 32 },
    { name: "Marketing", jobs: 7, applications: 24 },
    { name: "Sales", jobs: 6, applications: 21 },
  ];

  const quickActions = [
    { label: "Manage Users", path: "/admin/users" },
    { label: "Manage Jobs", path: "/admin/jobs" },
    { label: "Manage Departments", path: "/admin/departments" },
    { label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-heading)]">
            Dashboard
          </h1>
          <p className="text-[var(--color-text-muted)] mt-1 text-sm">
            Welcome back, {admin.name || "Admin"}! 👋
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            Role:{" "}
            <span className="font-semibold capitalize text-[var(--color-text-heading)]">
              {roleInfo?.name || admin.role}
            </span>
          </p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? TrendingUp : TrendingDown;
          const trendColor =
            stat.trend === "up" ? "text-emerald-600" : "text-red-600";
          return (
            <div
              key={stat.label}
              className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4 md:p-5 transition-all duration-200 hover:border-[var(--color-primary)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs sm:text-sm text-[var(--color-text-muted)]">
                  {stat.label}
                </p>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <Icon size={16} className={stat.color} />
                </div>
              </div>
              <p className="text-xl md:text-2xl font-bold text-[var(--color-text-heading)]">
                {stat.value}
              </p>
              <div className="flex items-center gap-1 mt-1.5">
                <TrendIcon size={12} className={trendColor} />
                <span className={`text-[11px] font-medium ${trendColor}`}>
                  {stat.change}
                </span>
                <span className="text-[11px] text-[var(--color-text-muted)]">
                  vs last week
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* TWO COLUMN LAYOUT: Activity + Departments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* RECENT ACTIVITY */}
        <div className="lg:col-span-2 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base md:text-lg font-semibold text-[var(--color-text-heading)]">
              Recent Activity
            </h2>
            <button
              onClick={() => navigate("/admin/applications")}
              className="inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline"
            >
              View all
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-3">
            {recentActivity.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--color-bg-muted)] transition-colors"
                >
                  <div className={`p-2 rounded-lg ${item.bg} shrink-0`}>
                    <Icon size={14} className={item.color} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[var(--color-text-heading)] truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)] truncate">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-[11px] text-[var(--color-text-muted)] shrink-0">
                    {item.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* TOP DEPARTMENTS */}
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base md:text-lg font-semibold text-[var(--color-text-heading)]">
              Top Departments
            </h2>
            <button
              onClick={() => navigate("/admin/departments")}
              className="inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline"
            >
              View all
              <ArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-4">
            {topDepartments.map((dept, i) => {
              const maxJobs = Math.max(...topDepartments.map((d) => d.jobs));
              const width = (dept.jobs / maxJobs) * 100;
              return (
                <div key={dept.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium text-[var(--color-text-muted)] w-4">
                        #{i + 1}
                      </span>
                      <span className="text-sm text-[var(--color-text-heading)]">
                        {dept.name}
                      </span>
                    </div>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {dept.jobs} jobs
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--color-bg-muted)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-500"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-1">
                    {dept.applications} applications
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ADMIN CONTROLS */}
      {isAdmin && (
        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 md:p-6">
          <div className="flex items-center gap-2 mb-1">
            <Shield size={16} className="text-[var(--color-primary)]" />
            <h2 className="text-base md:text-lg font-semibold text-[var(--color-text-heading)]">
              Admin Controls
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mb-4">
            You have full access to manage everything.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {quickActions.map((action) => (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                className="p-3 rounded-lg bg-[var(--color-primary-pale)] text-[var(--color-text-heading)] text-xs sm:text-sm font-medium border border-transparent hover:border-[var(--color-primary)] hover:bg-[var(--color-bg-card)] transition-all duration-150 text-center"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ROLE BASED CONTENT */}
      {admin.role === "hr" && (
        <RoleCard
          emoji="👥"
          title="HR Dashboard"
          description="Manage departments, jobs, and applications."
          accent="border-blue-200"
        />
      )}

      {admin.role === "manager" && (
        <RoleCard
          emoji="📋"
          title="Manager Dashboard"
          description="Manage your team and department jobs."
          accent="border-emerald-200"
        />
      )}

      {admin.role === "editor" && (
        <RoleCard
          emoji="✍️"
          title="Editor Dashboard"
          description="Manage content and services."
          accent="border-amber-200"
        />
      )}
    </div>
  );
}

// ============================================================
// 📌 Small reusable role card
// ============================================================
function RoleCard({ emoji, title, description, accent }) {
  return (
    <div
      className={`bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 md:p-6 ${accent}`}
    >
      <h2 className="text-base md:text-lg font-semibold text-[var(--color-text-heading)] flex items-center gap-2">
        <span>{emoji}</span>
        {title}
      </h2>
      <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1">
        {description}
      </p>
    </div>
  );
}