// src/pages/user/Career/pages/PositionCard.jsx
import {
  Briefcase,
  MapPin,
  Clock,
  ChevronRight,
  Building2,
  Award,
  CheckCircle2,
} from "lucide-react";

export default function PositionCard({
  job,
  departmentName,
  jobTypeName,
  onView,
  isApplied = false,
}) {
  return (
    <div
      onClick={onView}
      className={`group rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-300 ${
        isApplied
          ? "opacity-75 hover:opacity-100"
          : "hover:-translate-y-1"
      }`}
      style={{
        background: isApplied
          ? "var(--color-bg-body)"
          : "var(--color-bg-card)",
        border: `1px solid ${
          isApplied
            ? "var(--color-border)"
            : "var(--color-border)"
        }`,
        boxShadow: isApplied
          ? "0 4px 16px rgba(0,0,0,0.04)"
          : "0 8px 30px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        if (!isApplied) {
          e.currentTarget.style.borderColor = "var(--color-primary)";
          e.currentTarget.style.boxShadow =
            "0 20px 60px rgba(249, 115, 22, 0.15), 0 8px 24px rgba(0,0,0,0.08)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isApplied) {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.boxShadow =
            "0 8px 30px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.04)";
        }
      }}
    >
      {/* Top row — Icon + Status badge */}
      <div className="flex items-start justify-between mb-3">
        {/* Icon */}
        <div
          className="p-2 rounded-lg"
          style={{
            background: isApplied
              ? "var(--color-bg-card)"
              : "var(--color-primary-pale, rgba(249,115,22,0.1))",
          }}
        >
          <Briefcase
            size={15}
            style={{
              color: isApplied
                ? "var(--color-text-muted)"
                : "var(--color-primary)",
            }}
          />
        </div>

        {/* Status badge */}
        {isApplied ? (
          <span
            className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider"
            style={{
              background: "var(--color-bg-muted, #f8f4f0)",
              color: "var(--color-text-muted)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <CheckCircle2 size={10} />
            Applied
          </span>
        ) : (
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider"
            style={{
              background: "rgba(16, 185, 129, 0.1)",
              color: "#059669",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Actively Hiring
          </span>
        )}
      </div>

      {/* ✅ Job title — Playfair Display italic */}
      <h3
        className={`text-sm sm:text-base font-semibold line-clamp-2 transition-colors leading-snug ${
          isApplied ? "" : "group-hover:opacity-80"
        }`}
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          color: isApplied
            ? "var(--color-text-muted)"
            : "var(--color-text-heading)",
        }}
      >
        {job.title}
      </h3>

      {/* Designation */}
      <p
        className="text-[11px] sm:text-xs mt-1 line-clamp-1"
        style={{
          color: "var(--color-text-muted)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {job.designation}
      </p>

      {/* Info rows */}
      <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
        <div
          className="flex items-center gap-2 text-[11px] sm:text-xs"
          style={{
            color: "var(--color-text-muted)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          <MapPin
            size={12}
            className="shrink-0"
            style={{ color: "var(--color-primary)" }}
          />
          <span className="truncate">{job.location || "Remote"}</span>
        </div>
        <div
          className="flex items-center gap-2 text-[11px] sm:text-xs"
          style={{
            color: "var(--color-text-muted)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          <Building2
            size={12}
            className="shrink-0"
            style={{ color: "var(--color-primary)" }}
          />
          <span className="truncate">{departmentName || "—"}</span>
        </div>
        <div
          className="flex items-center gap-2 text-[11px] sm:text-xs"
          style={{
            color: "var(--color-text-muted)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          <Award
            size={12}
            className="shrink-0"
            style={{ color: "var(--color-primary)" }}
          />
          <span className="truncate">{jobTypeName || "—"}</span>
        </div>
        <div
          className="flex items-center gap-2 text-[11px] sm:text-xs"
          style={{
            color: "var(--color-text-muted)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          <Clock
            size={12}
            className="shrink-0"
            style={{ color: "var(--color-primary)" }}
          />
          <span className="truncate">
            {job.experience_required || "Experience not specified"}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div
        className="mt-3 sm:mt-4 pt-3 flex items-center justify-between border-t"
        style={{ borderColor: "var(--color-border)" }}
      >
        <span
          className="text-[10px]"
          style={{
            color: "var(--color-text-muted)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          {job.created_at
            ? new Date(job.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })
            : ""}
        </span>
        <span
          className={`inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold transition-all group-hover:gap-2 ${
            isApplied ? "" : ""
          }`}
          style={{
            color: isApplied
              ? "var(--color-text-muted)"
              : "var(--color-primary)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          {isApplied ? "View" : "View & Apply"}
          <ChevronRight size={12} />
        </span>
      </div>
    </div>
  );
}