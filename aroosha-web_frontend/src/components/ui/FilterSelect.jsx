// src/components/ui/FilterSelect.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function FilterSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  label,
  className = "",
  disabled = false,
  error = "",
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optValue) => {
    if (typeof onChange === "function") {
      onChange({ target: { value: optValue } });
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className || 'w-full'}`} ref={dropdownRef}>
      {label && (
        <label className="block text-[10px] font-semibold text-[var(--color-text-heading)] uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          group w-full flex items-center justify-between gap-2
          px-3 py-2 
          rounded-lg
          bg-[var(--color-bg-card)] 
          text-xs font-medium text-[var(--color-text-heading)]
          border
          transition-all duration-150 cursor-pointer
          ${isOpen
            ? 'border-[var(--color-primary)] shadow-sm'
            : 'border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-sm'
          }
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        `}
      >
        <span className={`truncate text-left ${selectedOption ? '' : 'text-[var(--color-text-muted)]'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={12}
          className={`
            shrink-0 transition-all duration-200
            ${isOpen 
              ? 'rotate-180 text-[var(--color-primary)]' 
              : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]'
            }
          `}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div
          className="
            absolute z-[100] mt-1 w-full min-w-full
            bg-[var(--color-bg-card)] 
            border border-[var(--color-border)] 
            rounded-lg
            shadow-lg
            py-1
            origin-top right-0
            overflow-hidden
          "
          style={{ animation: 'dropdownIn 150ms cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`
                  w-full flex items-center justify-between gap-2
                  px-3 py-1.5 text-xs text-left font-medium
                  transition-all duration-150
                  ${isSelected
                    ? 'bg-[var(--color-primary-pale)] text-[var(--color-primary-dark)]'
                    : 'text-[var(--color-text-heading)] hover:bg-[var(--color-bg-muted)]'
                  }
                `}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && (
                  <Check size={12} className="text-[var(--color-primary)] shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {error && <p className="mt-1 text-[10px] text-red-500">{error}</p>}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dropdownIn {
          from { 
            opacity: 0; 
            transform: translateY(-4px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}} />
    </div>
  );
}