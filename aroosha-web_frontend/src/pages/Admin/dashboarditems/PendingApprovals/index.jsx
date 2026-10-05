import { useState } from "react";
import { Check, X, User } from "lucide-react";

// Dummy data
const dummyPending = [
  { id: 1, name: "Engineering", description: "Handles technical development", requestedBy: "Priya (HR)" },
  { id: 3, name: "Sales", description: "Client acquisition and outreach", requestedBy: "Aman (HR)" },
];

export default function PendingApprovals() {
  const [pending, setPending] = useState(dummyPending);

  const handleApprove = (id) => {
    // 🔸 Yahan baad mein: await approveDepartment(id)
    setPending(pending.filter((d) => d.id !== id));
  };

  const handleReject = (id) => {
    // 🔸 Yahan baad mein: await rejectDepartment(id)
    setPending(pending.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-heading">Pending Approvals</h1>
        <p className="text-muted text-sm mt-1">Review and approve department requests submitted by your team.</p>
      </div>

      {pending.length === 0 ? (
        <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center">
          <p className="text-muted text-sm">No pending requests right now 🎉</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pending.map((dept) => (
            <div
              key={dept.id}
              className="bg-card border border-border rounded-2xl p-5 flex items-center justify-between gap-4"
            >
              <div className="flex-1">
                <p className="text-sm font-semibold text-heading">{dept.name}</p>
                <p className="text-xs text-muted mt-1">{dept.description}</p>
                <div className="flex items-center gap-1.5 mt-2 text-xs text-muted">
                  <User size={12} />
                  Requested by {dept.requestedBy}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleApprove(dept.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-500/10 text-green-600 text-sm font-medium hover:bg-green-500/20 transition-colors border border-green-500/20"
                >
                  <Check size={16} />
                  Approve
                </button>
                <button
                  onClick={() => handleReject(dept.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 text-red-600 text-sm font-medium hover:bg-red-500/20 transition-colors border border-red-500/20"
                >
                  <X size={16} />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}