// src/components/ui/Table.jsx
import React from "react";

export default function Table({
  columns,
  data,
  keyField = "id",
  className = "",
  headerClassName = "",
  rowClassName = "",
  emptyText = "No data found",
  onRowClick,
  ...props
}) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full" {...props}>
        <thead className={`bg-body/50 ${headerClassName}`}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-6 py-3 text-left text-xs font-semibold text-muted uppercase ${col.className || ''}`}
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-muted">
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={item[keyField]}
                className={`hover:bg-body/50 transition-colors ${rowClassName} ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-6 py-4 ${col.cellClassName || ''}`}
                  >
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}