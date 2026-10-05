// src/components/ui/BulkActions.jsx
import { Square, CheckSquare, Check, X, Trash2 } from "lucide-react";
import Button from "./Button";

export default function BulkActions({
  selectedIds = [],
  totalPending = 0,
  isAllSelected = false,
  onSelectAll,
  onApprove,
  onReject,
  onDelete,
  isProcessing = false,
  className = "",
}) {
  const hasSelection = selectedIds.length > 0;

  return (
    <div className={`
      flex flex-col sm:flex-row sm:items-center gap-3 
      bg-[var(--color-primary-pale)]/50
      border border-[var(--color-primary-light)]/40 
      rounded-lg p-3
      ${className}
    `}>

      {/* Select All */}
      <div className="flex items-center gap-3">
        <button
          onClick={onSelectAll}
          disabled={isProcessing || totalPending === 0}
          className="
            flex items-center gap-2 px-3 py-2 
            rounded-lg 
            bg-[var(--color-bg-card)] 
            border border-[var(--color-border)]
            text-xs font-medium text-[var(--color-text-heading)]
            transition-all duration-150
            hover:border-[var(--color-primary)] hover:shadow-sm
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isAllSelected && totalPending > 0 ? (
            <CheckSquare size={14} className="text-[var(--color-primary)]" />
          ) : (
            <Square size={14} className="text-[var(--color-text-muted)]" />
          )}
          <span>
            {hasSelection ? `Selected (${selectedIds.length})` : "Select All"}
          </span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <Button
          variant="success"
          size="sm"
          onClick={onApprove}
          disabled={!hasSelection || isProcessing}
          loading={isProcessing}
          icon={Check}
          className="flex-1 sm:flex-none"
        >
          Approve
        </Button>

        <Button
          variant="warning"
          size="sm"
          onClick={onReject}
          disabled={!hasSelection || isProcessing}
          loading={isProcessing}
          icon={X}
          className="flex-1 sm:flex-none"
        >
          Block
        </Button>

        <Button
          variant="danger"
          size="sm"
          onClick={onDelete}
          disabled={!hasSelection || isProcessing}
          loading={isProcessing}
          icon={Trash2}
          className="flex-1 sm:flex-none"
        >
          Delete
        </Button>
      </div>

      {/* Selection Count */}
      {hasSelection && (
        <span className="text-xs text-[var(--color-text-heading)] sm:ml-auto">
          {selectedIds.length} item{selectedIds.length > 1 ? 's' : ''} selected
        </span>
      )}
    </div>
  );
}

