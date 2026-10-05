// src/components/ui/FieldError.jsx
import { AlertCircle } from "lucide-react";

export default function FieldError({ children }) {
  if (!children) return null;
  return (
    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
      <AlertCircle size={12} className="shrink-0" />
      <span>{children}</span>
    </p>
  );
}
