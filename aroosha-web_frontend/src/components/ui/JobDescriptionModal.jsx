export default function JobDescriptionModal({ isOpen, onClose, job }) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-primary"
        >
          ✕
        </button>
        <h2 className="text-lg font-bold text-heading mb-2">{job.title}</h2>
        <p className="text-sm text-muted mb-4">{job.location}</p>
        <p className="text-sm text-body leading-6">{job.description}</p>
      </div>
    </div>
  );
}