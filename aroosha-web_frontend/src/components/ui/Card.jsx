// src/components/ui/Card.jsx
import React from "react";

export default function Card({
  children,
  title,
  subtitle,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footer,
  footerClassName = "",
  ...props
}) {
  return (
    <div className={`bg-card border border-border rounded-2xl overflow-hidden ${className}`} {...props}>
      {(title || subtitle) && (
        <div className={`px-6 py-4 border-b border-border ${headerClassName}`}>
          {title && <h3 className="text-lg font-semibold text-heading">{title}</h3>}
          {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        </div>
      )}
      <div className={`p-6 ${bodyClassName}`}>{children}</div>
      {footer && (
        <div className={`px-6 py-4 border-t border-border ${footerClassName}`}>{footer}</div>
      )}
    </div>
  );
}