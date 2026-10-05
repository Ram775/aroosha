// src/components/ui/Container.jsx
export default function Container({ 
  children, 
  className = "",
  maxWidth = "7xl" 
}) {
  const widths = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div className={`
      mx-auto px-4 sm:px-6
      ${widths[maxWidth]}
      ${className}
    `}>
      {children}
    </div>
  );
}