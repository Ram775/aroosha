// src/utils/appliedJobs.js
// Track applied jobs in localStorage (anonymous user ke liye)

const KEY = "applied_jobs";

export const getAppliedJobs = () => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const isJobApplied = (jobId) => {
  const applied = getAppliedJobs();
  return applied.some((id) => String(id) === String(jobId));
};

export const markJobApplied = (jobId) => {
  const applied = getAppliedJobs();
  if (!applied.some((id) => String(id) === String(jobId))) {
    applied.push(jobId);
    localStorage.setItem(KEY, JSON.stringify(applied));
  }
};

export const clearAppliedJobs = () => {
  localStorage.removeItem(KEY);
};