// src/components/ui/ListTable.jsx
import React from "react";

const ListTable = ({ columns, children, maxHeight = "none", style }) => {
  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <div
          className="w-full overflow-x-auto custom-table-scrollbar"
          style={{ maxHeight }}
        >
          <div className="w-max min-w-full px-3 pt-2 pb-3 bg-[var(--color-bg-muted)]/30 flex flex-col gap-2">
            <div
              style={style}
              className={`
                grid ${columns || ""}
                py-2.5 px-4 rounded-xl sticky top-0 z-10
                border border-[var(--color-primary-light)]/40
                bg-[var(--color-primary-pale)]
                items-center w-full
                text-xs font-bold 
                text-[var(--color-primary-dark)]
                uppercase tracking-wider
              `}
            >
              {children.header}
            </div>
            <div className="flex flex-col gap-2 w-full">
              {children.rows}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-3 p-2">
        {children.mobileCards || children.rows}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-table-scrollbar::-webkit-scrollbar { height: 8px; background-color: var(--color-bg-muted); }
        .custom-table-scrollbar::-webkit-scrollbar-track { background-color: var(--color-bg-muted); border-radius: 4px; }
        .custom-table-scrollbar::-webkit-scrollbar-thumb { background-color: var(--color-primary-light); border-radius: 4px; }
        .custom-table-scrollbar::-webkit-scrollbar-thumb:hover { background-color: var(--color-primary); }
      `}} />
    </div>
  );
};

export default ListTable;