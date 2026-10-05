// src/components/ui/Alert.jsx
import React from "react";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

const alertStyles = {
  success: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-700",
    icon: CheckCircle,
  },
  error: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-700",
    icon: XCircle,
  },
  warning: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
    icon: AlertCircle,
  },
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
    icon: Info,
  },
};

export default function Alert({
  type = "success",
  message,
  onClose,
  className = "",
  ...props
}) {
  const style = alertStyles[type] || alertStyles.info;
  const Icon = style.icon;

  return (
    <div
      className={`p-4 rounded-xl border flex items-center gap-3 animate-slideDown ${style.bg} ${style.border} ${style.text} ${className}`}
      {...props}
    >
      <Icon size={20} className="flex-shrink-0" />
      <span className="flex-1 text-sm">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 hover:opacity-70 transition-opacity"
          aria-label="Close alert"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

// Animation CSS - Add to your global CSS
// @keyframes slideDown {
//   from { opacity: 0; transform: translateY(-10px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// .animate-slideDown {
//   animation: slideDown 0.3s ease-out;
// }