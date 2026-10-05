// src/components/ui/ListRow.jsx
import React from 'react';

const ListRow = ({ columns, selected, children, className = "", style }) => {
  return (
    <div
      style={style}
      className={`
        hidden md:grid ${columns || ""}
        w-full transition-all duration-200
        px-4 py-3 items-center rounded-xl border
        ${selected
          ? "bg-[var(--color-primary-pale)] border-[var(--color-primary)]"
          : "bg-[var(--color-bg-card)] border-[var(--color-border)] hover:border-[var(--color-primary-light)] hover:shadow-sm"
        }
        ${className}
      `}
    >
      {React.Children.map(children, (child) => (
        <div className="min-w-0 px-2">{child}</div>
      ))}
    </div>
  );
};

export default ListRow;

// Mobile Card
export const MobileCard = ({ children, selected, className = "" }) => {
  return (
    <div
      className={`
        md:hidden bg-[var(--color-bg-card)] 
        border border-[var(--color-border)] 
        rounded-2xl p-4 transition-all duration-200
        ${selected
          ? "border-[var(--color-primary)] bg-[var(--color-primary-pale)]"
          : "hover:border-[var(--color-primary-light)] hover:shadow-md"
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
};