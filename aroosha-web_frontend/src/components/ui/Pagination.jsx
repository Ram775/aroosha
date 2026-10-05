// src/components/ui/Pagination.jsx
import React from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  pageSize = 10,
  onPageChange,
  totalItems = 0,
  className = "",
}) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (i > 1 && i < totalPages) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      if (totalPages > 1) pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Nav button styles
  const navBtn = `
    h-9 w-9 flex items-center justify-center rounded-lg
    border border-[var(--color-border)] 
    bg-[var(--color-bg-card)] 
    text-[var(--color-text-heading)]
    transition-all duration-200
    hover:bg-[var(--color-primary-pale)] 
    hover:border-[var(--color-primary)] 
    hover:text-[var(--color-primary)]
    disabled:opacity-40 disabled:cursor-not-allowed 
    disabled:hover:bg-[var(--color-bg-card)] 
    disabled:hover:border-[var(--color-border)] 
    disabled:hover:text-[var(--color-text-heading)]
  `;

  return (
    <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${className}`}>

      {/* Left — Items Info */}
      <div className="text-sm text-[var(--color-text-heading)] font-medium">
        Showing <span className="font-bold">{startItem}</span> to{" "}
        <span className="font-bold">{endItem}</span> of{" "}
        <span className="font-bold">{totalItems}</span> entries
      </div>

      {/* Right — Pagination Controls */}
      <div className="flex items-center gap-1">
        {/* First */}
        <button
          onClick={() => onPageChange?.(1)}
          disabled={currentPage === 1}
          className={navBtn}
          title="First Page"
        >
          <ChevronsLeft size={16} />
        </button>

        {/* Previous */}
        <button
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
          className={navBtn}
          title="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-2 text-[var(--color-text-heading)] font-medium">…</span>
            ) : (
              <button
                onClick={() => onPageChange?.(page)}
                className={`
                  min-w-[36px] h-9 px-2 rounded-lg text-sm font-bold
                  transition-all duration-200
                  ${currentPage === page
                    ? 'bg-[var(--color-primary)] text-white shadow-md scale-105'
                    : 'bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-heading)] hover:bg-[var(--color-primary-pale)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                  }
                `}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next */}
        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={navBtn}
          title="Next Page"
        >
          <ChevronRight size={16} />
        </button>

        {/* Last */}
        <button
          onClick={() => onPageChange?.(totalPages)}
          disabled={currentPage === totalPages || totalPages === 0}
          className={navBtn}
          title="Last Page"
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
}