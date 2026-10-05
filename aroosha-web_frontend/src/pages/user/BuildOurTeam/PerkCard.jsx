export default function PerkCard({ icon, title }) {
  return (
    <div className="flex items-center gap-3 bg-muted border border-border rounded-xl px-4 py-3.5">
      <span className="text-xl">{icon}</span>
      <span className="text-sm font-medium text-body">{title}</span>
    </div>
  );
}