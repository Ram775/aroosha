// src/pages/Admin/SessionTimer/SessionExpiryModal.jsx
import { useState, useRef } from "react";
import { AlertTriangle, Clock, Loader2 } from "lucide-react";
import { refreshToken } from "../../../api/sessionApi";

export default function SessionExpiryModal({ isOpen, onStayLoggedIn, onLogout }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const hasClickedRef = useRef(false);   // ✅ Double-click prevent

  if (!isOpen) return null;

  const handleStay = async () => {
    // ✅ Prevent double-click
    if (hasClickedRef.current || loading) {
      console.log("⚠️ Already clicked — ignoring duplicate");
      return;
    }

    hasClickedRef.current = true;
    setLoading(true);
    setError("");

    try {
      const data = await refreshToken();

      if (data.access_token) {
        localStorage.setItem("adminToken", data.access_token);

        if (data.role) {
          const existingData = JSON.parse(localStorage.getItem("adminData") || "{}");
          localStorage.setItem(
            "adminData",
            JSON.stringify({ ...existingData, role: data.role })
          );
        }

        console.log("✅ Token refreshed successfully");
        hasClickedRef.current = false;   // Reset
        onStayLoggedIn();
      } else {
        throw new Error("No access token in response");
      }
    } catch (err) {
      console.error("❌ Refresh failed:", err);
      hasClickedRef.current = false;   // Reset

      if (err.response?.status === 401) {
        setError("Session has already expired. Please log in again.");
        setTimeout(() => onLogout(), 2000);
      } else {
        setError(err.response?.data?.detail || "Failed to refresh session");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
    >
      <div className="bg-[var(--color-bg-card)] rounded-2xl shadow-2xl max-w-md w-full p-6">

        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-500/20">
            <AlertTriangle size={32} className="text-amber-600" />
          </div>
        </div>

        <h2 className="text-lg font-semibold text-center mb-2">
          Session Expiring Soon
        </h2>

        <p className="text-sm text-center text-[var(--color-text-muted)] mb-6">
          Your session will expire in{" "}
          <strong className="text-amber-600">2 minutes</strong>. Do you want to stay logged in?
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onLogout}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--color-bg-muted)] text-sm font-medium hover:bg-[var(--color-border)] transition-all disabled:opacity-50"
          >
            Logout
          </button>

          <button
            onClick={handleStay}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <Clock size={14} />
                Stay Logged In
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}