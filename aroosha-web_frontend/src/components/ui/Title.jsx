export default function Title({ children, className = "" }) {
  return (
    <h2 className={`text-2xl font-semibold ${className}`}>
      {children}
    </h2>
  );
}