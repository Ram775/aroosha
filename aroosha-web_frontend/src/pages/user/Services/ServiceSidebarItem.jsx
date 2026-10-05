// src/pages/user/Services/ServiceSidebarItem.jsx
import { motion } from "framer-motion";

export default function ServiceSidebarItem({ icon, name, active, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: active ? 0 : 4 }}
      whileTap={{ scale: 0.98 }}
      className={`relative w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold text-left transition-all duration-300 overflow-hidden group ${
        active
          ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30"
          : "text-[var(--color-text-heading)] hover:bg-[var(--color-primary-pale)] hover:text-[var(--color-primary)]"
      }`}
    >
      {/* Active left bar */}
      {active && (
        <motion.span
          layoutId="sidebar-active-bar"
          className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white/70"
        />
      )}

      <span
        className={`text-lg shrink-0 transition-transform duration-300 ${
          active ? "scale-110" : "group-hover:scale-110"
        }`}
      >
        {icon}
      </span>
      <span className="truncate flex-1">{name}</span>

      {/* Arrow on hover (not active) */}
      {!active && (
        <span className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[var(--color-primary)]">
          →
        </span>
      )}
    </motion.button>
  );
}