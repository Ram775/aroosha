// src/components/ui/Badge.jsx
import React from "react";

export default function Badge({ 
  children, 
  variant = "primary",
  size = "md",
  className = "" 
}) {
  const variants = {
    primary: "bg-primary/10 text-primary border-primary/30",
    success: "bg-green-500/10 text-green-500 border-green-500/30",
    danger: "bg-red-500/10 text-red-500 border-red-500/30",
    warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
    info: "bg-blue-500/10 text-blue-500 border-blue-500/30",
    muted: "bg-gray-100 text-gray-600 border-gray-200",
    purple: "bg-purple-500/10 text-purple-500 border-purple-500/30",
    orange: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  };

  return (
    <span className={`
      inline-flex items-center rounded-full border font-medium
      ${variants[variant] || variants.primary}
      ${sizes[size] || sizes.md}
      ${className}
    `}>
      {children}
    </span>
  );
}