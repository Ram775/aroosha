// src/components/admin/AdminNavbar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../auth/AdminContext";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Menu,
  Search,
  Sun,
  Moon,
  HelpCircle,
} from "lucide-react";

// ✅ Session Timer imports — path check karo (jo tumhare folder me sahi ho)
import SessionTimer from "../../pages/Admin/SessionTimer";
import SessionExpiryModal from "../../pages/Admin/SessionTimer/SessionExpiryModal";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const { admin, logout } = useAdmin();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // ✅ Session timer states
  const [showExpiryModal, setShowExpiryModal] = useState(false);
  const [timerResetKey, setTimerResetKey] = useState(0);

  // ✅ Notifications
  const notifications = [
    { id: 1, title: "New job application", time: "2 min ago", read: false },
    { id: 2, title: "Service updated", time: "1 hour ago", read: false },
    { id: 3, title: "New user registered", time: "3 hours ago", read: true },
    { id: 4, title: "Job posting expired", time: "1 day ago", read: true },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  // ═══════════════════════════════════════════════════════
  // ✅ SESSION HANDLERS
  // ═══════════════════════════════════════════════════════

  // ✅ 2 min bache pe popup dikhao
  const handleWarning = () => {
    console.log("⚠️ Session warning — showing popup");
    setShowExpiryModal(true);
  };

  // ✅ Stay Logged In click
  const handleStayLoggedIn = () => {
    console.log("✅ Stay logged in — resetting timer");
    setShowExpiryModal(false);
    setTimerResetKey((prev) => prev + 1); // ✅ Timer reset trigger
  };

  // ✅ Logout
  const handleLogout = () => {
    setShowExpiryModal(false);
    logout();
  };

  return (
    <>
      <nav className="bg-card border-b border-border px-4 sm:px-6 py-3 flex-shrink-0 z-50">
        <div className="max-w-full mx-auto flex items-center justify-between">

          {/* ═══════════════ LEFT SECTION ═══════════════ */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors"
              onClick={() => {}}
            >
              <Menu size={20} className="text-muted" />
            </button>

            <div className="hidden md:flex items-center gap-2 bg-muted rounded-xl px-3 py-2 w-64">
              <Search size={18} className="text-muted" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm text-heading placeholder:text-muted w-full"
              />
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-border rounded text-muted">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* ═══════════════ RIGHT SECTION ═══════════════ */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* ✅ SESSION TIMER CHIP — YAHAN HAI */}
            <SessionTimer
              onWarning={handleWarning}          // ✅ Popup trigger
              onExpire={handleLogout}            // ✅ Auto logout
              resetKey={timerResetKey}           // ✅ Reset trigger
              logout={logout}
            />

            {/* Dark Mode */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl hover:bg-muted transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <Sun size={18} className="text-muted" />
              ) : (
                <Moon size={18} className="text-muted" />
              )}
            </button>

            {/* Help */}
            <button className="hidden sm:flex p-2 rounded-xl hover:bg-muted transition-colors">
              <HelpCircle size={18} className="text-muted" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-xl hover:bg-muted transition-colors relative"
              >
                <Bell size={18} className="text-muted" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <h3 className="text-sm font-semibold text-heading">Notifications</h3>
                    <button className="text-xs text-primary hover:underline">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`px-4 py-2.5 border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer ${
                          !notif.read ? "bg-primary/5" : ""
                        }`}
                      >
                        <p className="text-sm text-text-body">{notif.title}</p>
                        <p className="text-xs text-muted mt-0.5">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-border text-center">
                    <button className="text-xs text-primary hover:underline">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 rounded-xl hover:bg-muted transition-colors"
              >
                <div className="relative">
                  <img
                    src={
                      admin?.avatar ||
                      "https://ui-avatars.com/api/?name=Admin&background=F97316&color=fff&size=40"
                    }
                    alt="Admin"
                    className="w-8 h-8 rounded-full border-2 border-primary/30"
                  />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-heading leading-tight">
                    {admin?.name || "Admin"}
                  </p>
                  <p className="text-xs text-muted leading-tight">Administrator</p>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-muted transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-border">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          admin?.avatar ||
                          "https://ui-avatars.com/api/?name=Admin&background=F97316&color=fff&size=40"
                        }
                        alt="Admin"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-semibold text-heading">
                          {admin?.name || "Admin"}
                        </p>
                        <p className="text-xs text-muted">
                          {admin?.email || "admin@aroosha.com"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/admin/profile");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-body hover:bg-muted transition-colors"
                    >
                      <User size={16} />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/admin/settings");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text-body hover:bg-muted transition-colors"
                    >
                      <Settings size={16} />
                      Settings
                    </button>
                    <div className="border-t border-border my-1" />
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* ✅ SESSION EXPIRY POPUP — YAHAN HAI                     */}
      {/* ═══════════════════════════════════════════════════════ */}
      <SessionExpiryModal
        isOpen={showExpiryModal}
        onStayLoggedIn={handleStayLoggedIn}
        onLogout={handleLogout}
      />
    </>
  );
}