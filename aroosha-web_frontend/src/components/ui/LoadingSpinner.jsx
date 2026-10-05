// src/components/ui/LoadingSpinner.jsx
export default function LoadingSpinner({ size = "md", color = "primary", fullScreen = false }) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const colors = {
    primary: "border-primary",
    white: "border-white",
    muted: "border-muted",
  };

  const spinner = (
    <div className="flex items-center justify-center">
      <div className={`
        ${sizes[size]} 
        border-4 
        ${colors[color]} 
        border-t-transparent 
        rounded-full 
        animate-spin
      `} />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-body">
        {spinner}
      </div>
    );
  }

  return spinner;
}
