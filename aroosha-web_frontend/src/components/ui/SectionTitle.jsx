export default function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-bold">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          {subtitle}
        </p>
      )}
    </div>
  );
}