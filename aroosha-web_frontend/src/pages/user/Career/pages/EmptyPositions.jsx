// src/pages/user/Career/pages/EmptyPositions.jsx
import { Search } from "lucide-react";

export default function EmptyPositions({ onClear }) {
  return (
    <div
      className="text-center py-16 rounded-2xl"
      style={{
        background: "var(--color-bg-card)",
        border: "1px solid var(--color-border)",
        boxShadow:
          "0 8px 30px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Icon */}
      <div
        className="inline-flex p-4 rounded-full mb-4"
        style={{ background: "var(--color-bg-muted, #f8f4f0)" }}
      >
        <Search
          size={24}
          style={{ color: "var(--color-text-muted)" }}
        />
      </div>

      {/* Heading — Playfair Display italic */}
      <h3
        className="font-semibold text-base sm:text-lg leading-tight"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          color: "var(--color-text-heading)",
        }}
      >
        No positions found
      </h3>

      {/* Subtext */}
      <p
        className="text-xs sm:text-sm mt-2 max-w-md mx-auto px-4"
        style={{
          color: "var(--color-text-muted)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        Try adjusting your search or filters.
      </p>

      {/* Clear button */}
      {onClear && (
        <button
          onClick={onClear}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-xs sm:text-sm font-medium transition-all"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark, #C2410C))",
            boxShadow: "0 8px 20px rgba(249,115,22,0.3)",
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          Clear filters
        </button>
      )}
    </div>
  );
}