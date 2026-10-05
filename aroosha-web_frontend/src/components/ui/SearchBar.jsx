// src/components/ui/SearchBar.jsx
import { Search, ArrowUp, ArrowDown } from "lucide-react";
import Button from "./Button";

export default function SearchBar({
  searchTerm,
  onSearchChange,
  sortOrder,
  onSortToggle,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-3 w-full ${className}`}>
      <div className="relative flex-1 w-full">
        <Search 
          size={16} 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-primary)]" 
        />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            w-full pl-10 pr-3 py-2.5 
            rounded-xl border border-[var(--color-border)] 
            bg-[var(--color-bg-card)] 
            text-sm text-[var(--color-text-heading)] 
            placeholder:text-[var(--color-text-muted)]
            focus:outline-none focus:ring-2 
            focus:ring-[var(--color-primary)]/20 
            focus:border-[var(--color-primary)]
            transition-all duration-200
            hover:border-[var(--color-primary)]
          "
        />
      </div>

      {onSortToggle && (
        <Button
          variant="outline"
          size="sm"
          onClick={onSortToggle}
          icon={sortOrder === "asc" ? ArrowUp : ArrowDown}
          className="w-full sm:w-auto whitespace-nowrap"
        >
          {sortOrder === "asc" ? "A → Z" : "Z → A"}
        </Button>
      )}
    </div>
  );
}