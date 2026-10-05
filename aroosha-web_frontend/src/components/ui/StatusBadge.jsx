// src/components/ui/StatusBadge.jsx
import React from "react";
import { Clock, CheckCircle2, Ban, Trash2, AlertCircle } from "lucide-react";

export default function StatusBadge({ status }) {
  const config = {
    pending: {
      label: "Pending",
      icon: Clock,
      classes: "bg-amber-50 text-amber-600 border-amber-200",
      iconColor: "text-amber-500",
    },
    approved: {
      label: "Approved",
      icon: CheckCircle2,
      classes: "bg-emerald-50 text-emerald-600 border-emerald-200",
      iconColor: "text-emerald-500",
    },
    blocked: {
      label: "Blocked",
      icon: Ban,
      classes: "bg-red-50 text-red-600 border-red-200",
      iconColor: "text-red-500",
    },
    deleted: {
      label: "Deleted",
      icon: Trash2,
      classes: "bg-gray-50 text-gray-600 border-gray-200",
      iconColor: "text-gray-500",
    },
  };

  const current = config[status] || {
    label: status,
    icon: AlertCircle,
    classes: "bg-gray-50 text-gray-600 border-gray-200",
    iconColor: "text-gray-500",
  };

  const Icon = current.icon;

  return (
    <span className={`
      inline-flex items-center gap-1.5
      px-2.5 py-1 rounded-lg
      text-xs border
      ${current.classes}
    `}>
      <Icon size={12} className={current.iconColor} />
      {current.label}
    </span>
  );
}