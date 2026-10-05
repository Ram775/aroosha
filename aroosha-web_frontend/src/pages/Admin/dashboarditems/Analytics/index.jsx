// src/pages/Admin/Analytics/index.jsx
import React from "react";
import { BarChart3, TrendingUp, Users, Briefcase, FileText } from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-heading">Analytics</h1>
        <p className="text-muted text-sm">View platform analytics and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3">
            <Users size={20} className="text-blue-500" />
            <div>
              <p className="text-2xl font-bold text-heading">1,284</p>
              <p className="text-xs text-muted">Total Users</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3">
            <Briefcase size={20} className="text-green-500" />
            <div>
              <p className="text-2xl font-bold text-heading">47</p>
              <p className="text-xs text-muted">Total Jobs</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3">
            <FileText size={20} className="text-purple-500" />
            <div>
              <p className="text-2xl font-bold text-heading">156</p>
              <p className="text-xs text-muted">Applications</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center gap-3">
            <BarChart3 size={20} className="text-orange-500" />
            <div>
              <p className="text-2xl font-bold text-heading">12</p>
              <p className="text-xs text-muted">Departments</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-8 text-center">
        <BarChart3 size={40} className="text-muted mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-heading">Analytics Dashboard</h3>
        <p className="text-muted text-sm">Detailed analytics and reports coming soon</p>
      </div>
    </div>
  );
}