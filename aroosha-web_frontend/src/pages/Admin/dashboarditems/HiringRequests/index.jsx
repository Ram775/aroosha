
import React, { useState } from "react";
import {
  UserCheck,
  Plus,
  Briefcase,
  Calendar,
  Clock,
  X,
  Users,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function HiringRequests() {
  const [showModal, setShowModal] = useState(false);

  const [requests, setRequests] = useState([
    {
      id: 1,
      position: "React Developer",
      department: "Development",
      openings: 2,
      experience: "1-2 Years",
      priority: "High",
      joiningDate: "15 Oct 2026",
      status: "Pending",
      createdAt: "05 Oct 2026",
    },
    {
      id: 2,
      position: "UI/UX Designer",
      department: "Design",
      openings: 1,
      experience: "2-3 Years",
      priority: "Medium",
      joiningDate: "01 Nov 2026",
      status: "Approved",
      createdAt: "03 Oct 2026",
    },
  ]);

  const [formData, setFormData] = useState({
    position: "",
    department: "",
    openings: 1,
    employmentType: "Full Time",
    experience: "",
    skills: "",
    priority: "Medium",
    joiningDate: "",
    reason: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      id: Date.now(),
      position: formData.position,
      department: formData.department,
      openings: formData.openings,
      experience: formData.experience,
      priority: formData.priority,
      joiningDate: formData.joiningDate,
      status: "Pending",
      createdAt: new Date().toLocaleDateString("en-GB"),
    };

    setRequests((prev) => [newRequest, ...prev]);

    setFormData({
      position: "",
      department: "",
      openings: 1,
      employmentType: "Full Time",
      experience: "",
      skills: "",
      priority: "Medium",
      joiningDate: "",
      reason: "",
      notes: "",
    });

    setShowModal(false);
  };

  const getStatus = (status) => {
    const styles = {
      Pending: "bg-yellow-500/10 text-yellow-600",
      Approved: "bg-green-500/10 text-green-600",
      Rejected: "bg-red-500/10 text-red-600",
      "In Progress": "bg-blue-500/10 text-blue-600",
    };

    const icons = {
      Pending: <Clock size={14} />,
      Approved: <CheckCircle size={14} />,
      Rejected: <XCircle size={14} />,
      "In Progress": <AlertCircle size={14} />,
    };

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
          styles[status] || "bg-gray-500/10 text-gray-600"
        }`}
      >
        {icons[status]}
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-heading">
            Hiring Requests
          </h1>

          <p className="text-muted text-sm mt-1">
            Submit and manage hiring requests for your team
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          New Request
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Total Requests</p>
              <h2 className="text-2xl font-bold text-heading mt-1">
                {requests.length}
              </h2>
            </div>

            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Briefcase size={22} />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Pending</p>
              <h2 className="text-2xl font-bold text-heading mt-1">
                {requests.filter((r) => r.status === "Pending").length}
              </h2>
            </div>

            <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-600">
              <Clock size={22} />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Approved</p>
              <h2 className="text-2xl font-bold text-heading mt-1">
                {requests.filter((r) => r.status === "Approved").length}
              </h2>
            </div>

            <div className="p-3 rounded-lg bg-green-500/10 text-green-600">
              <CheckCircle size={22} />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Open Positions</p>
              <h2 className="text-2xl font-bold text-heading mt-1">
                {requests.reduce(
                  (total, request) => total + Number(request.openings),
                  0
                )}
              </h2>
            </div>

            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-600">
              <Users size={22} />
            </div>
          </div>
        </div>

      </div>

      {/* Request List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">

        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-semibold text-heading">
            My Hiring Requests
          </h2>

          <p className="text-muted text-sm mt-1">
            Requests submitted to HR
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="p-10 text-center">
            <UserCheck
              size={40}
              className="text-muted mx-auto mb-3"
            />

            <h3 className="text-lg font-semibold text-heading">
              No Hiring Requests
            </h3>

            <p className="text-muted text-sm mt-1">
              Create your first hiring request.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-6 py-4 text-sm font-medium text-muted">
                    Position
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-muted">
                    Department
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-muted">
                    Openings
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-muted">
                    Experience
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-muted">
                    Priority
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-muted">
                    Joining
                  </th>

                  <th className="px-6 py-4 text-sm font-medium text-muted">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {requests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b border-border last:border-0 hover:bg-muted/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <Briefcase size={17} />
                        </div>

                        <div>
                          <p className="font-medium text-heading">
                            {request.position}
                          </p>

                          <p className="text-xs text-muted">
                            #{request.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-heading">
                      {request.department}
                    </td>

                    <td className="px-6 py-4 text-sm text-heading">
                      {request.openings}
                    </td>

                    <td className="px-6 py-4 text-sm text-heading">
                      {request.experience || "-"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-medium ${
                          request.priority === "High"
                            ? "text-red-500"
                            : request.priority === "Medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {request.priority}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-sm text-heading">
                      {request.joiningDate || "-"}
                    </td>

                    <td className="px-6 py-4">
                      {getStatus(request.status)}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

      {/* New Request Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="bg-card w-full max-w-3xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10">

              <div>
                <h2 className="text-xl font-semibold text-heading">
                  New Hiring Request
                </h2>

                <p className="text-sm text-muted mt-1">
                  Submit a hiring request to HR
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-muted/10 text-muted"
              >
                <X size={20} />
              </button>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">

              {/* Job Details */}
              <div>
                <h3 className="text-sm font-semibold text-heading mb-4 flex items-center gap-2">
                  <Briefcase size={17} />
                  Job Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm font-medium text-heading mb-1.5">
                      Job Title *
                    </label>

                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="e.g. React Developer"
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-transparent text-heading outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heading mb-1.5">
                      Department *
                    </label>

                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-transparent text-heading outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="">Select Department</option>
                      <option value="Development">Development</option>
                      <option value="Design">Design</option>
                      <option value="HR">HR</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heading mb-1.5">
                      Number of Openings *
                    </label>

                    <input
                      type="number"
                      name="openings"
                      min="1"
                      value={formData.openings}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-transparent text-heading outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heading mb-1.5">
                      Employment Type
                    </label>

                    <select
                      name="employmentType"
                      value={formData.employmentType}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-transparent text-heading outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option>Full Time</option>
                      <option>Part Time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heading mb-1.5">
                      Experience Required *
                    </label>

                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-transparent text-heading outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="">Select Experience</option>
                      <option value="Fresher">Fresher</option>
                      <option value="0-1 Years">0-1 Years</option>
                      <option value="1-2 Years">1-2 Years</option>
                      <option value="2-3 Years">2-3 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="5+ Years">5+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heading mb-1.5">
                      Priority
                    </label>

                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-lg border border-border bg-transparent text-heading outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-heading mb-1.5">
                      Expected Joining Date
                    </label>

                    <div className="relative">
                      <Calendar
                        size={17}
                        className="absolute left-3 top-3 text-muted"
                      />

                      <input
                        type="date"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-border bg-transparent text-heading outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-heading mb-1.5">
                  Required Skills *
                </label>

                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. React, JavaScript, Tailwind CSS, Git"
                  required
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-transparent text-heading outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-heading mb-1.5">
                  Reason for Hiring *
                </label>

                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Why is this position required?"
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-transparent text-heading outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-heading mb-1.5">
                  Additional Notes
                </label>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any additional information for HR..."
                  className="w-full px-3 py-2.5 rounded-lg border border-border bg-transparent text-heading outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 rounded-lg border border-border text-heading hover:bg-muted/10 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <FileText size={17} />
                  Submit Request
                </button>

              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
