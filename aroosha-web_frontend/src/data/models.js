// src/data/models.js

// User Model
export const UserModel = {
  id: null,
  name: "",
  email: "",
  role: "viewer", // admin, hr, manager, editor, viewer
  department: "",
  status: "pending", // pending, active, inactive
  createdBy: null,
  createdAt: null
};

// Department Model
export const DepartmentModel = {
  id: null,
  name: "",
  description: "",
  head: "", // HR ID who created
  status: "pending", // pending, approved, rejected
  createdBy: null, // HR ID
  approvedBy: null, // Admin ID
  createdAt: null,
  approvedAt: null
};

// Job Model
export const JobModel = {
  id: null,
  title: "",
  department: "",
  type: "full-time", // full-time, part-time, contract, internship
  description: "",
  requirements: [],
  salary: "",
  location: "",
  status: "open", // open, closed, draft
  createdBy: null, // HR ID
  createdAt: null
};

// Application Model
export const ApplicationModel = {
  id: null,
  jobId: null,
  applicantName: "",
  applicantEmail: "",
  applicantPhone: "",
  resume: "",
  coverLetter: "",
  status: "pending", // pending, reviewed, shortlisted, rejected, hired
  appliedAt: null
};