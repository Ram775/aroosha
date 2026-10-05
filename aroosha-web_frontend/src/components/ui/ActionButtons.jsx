// src/components/ui/ActionButtons.jsx
import React from "react";
import { Check, X, Trash2, Eye, Edit, Ban, RefreshCw } from "lucide-react";
import Button from "./Button";

export default function ActionButtons({
  onApprove,
  onReject,
  onDelete,
  onView,
  onEdit,
  onBlock,
  onRefresh,
  showApprove = false,
  showReject = false,
  showDelete = true,
  showView = false,
  showEdit = false,
  showBlock = false,
  showRefresh = false,
  size = "sm",
  disabled = false,
  className = "",
  approveLabel = "Approve",
  rejectLabel = "Reject",
  deleteLabel = "Delete",
  viewLabel = "View",
  editLabel = "Edit",
  blockLabel = "Block",
  refreshLabel = "Refresh",
}) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {showView && (
        <Button
          variant="ghost"
          size={size}
          onClick={onView}
          disabled={disabled}
          icon={Eye}
          title={viewLabel}
          className="p-1.5 hover:bg-body rounded-lg"
        />
      )}

      {showEdit && (
        <Button
          variant="ghost"
          size={size}
          onClick={onEdit}
          disabled={disabled}
          icon={Edit}
          title={editLabel}
          className="p-1.5 hover:bg-blue-50 rounded-lg text-muted hover:text-blue-500"
        />
      )}

      {showApprove && (
        <Button
          variant="ghost"
          size={size}
          onClick={onApprove}
          disabled={disabled}
          icon={Check}
          title={approveLabel}
          className="p-1.5 hover:bg-green-50 rounded-lg text-muted hover:text-green-500"
        />
      )}

      {showReject && (
        <Button
          variant="ghost"
          size={size}
          onClick={onReject}
          disabled={disabled}
          icon={X}
          title={rejectLabel}
          className="p-1.5 hover:bg-red-50 rounded-lg text-muted hover:text-red-500"
        />
      )}

      {showBlock && (
        <Button
          variant="ghost"
          size={size}
          onClick={onBlock}
          disabled={disabled}
          icon={Ban}
          title={blockLabel}
          className="p-1.5 hover:bg-orange-50 rounded-lg text-muted hover:text-orange-500"
        />
      )}

      {showDelete && (
        <Button
          variant="ghost"
          size={size}
          onClick={onDelete}
          disabled={disabled}
          icon={Trash2}
          title={deleteLabel}
          className="p-1.5 hover:bg-red-50 rounded-lg text-muted hover:text-red-500"
        />
      )}

      {showRefresh && (
        <Button
          variant="ghost"
          size={size}
          onClick={onRefresh}
          disabled={disabled}
          icon={RefreshCw}
          title={refreshLabel}
          className="p-1.5 hover:bg-body rounded-lg"
        />
      )}
    </div>
  );
}