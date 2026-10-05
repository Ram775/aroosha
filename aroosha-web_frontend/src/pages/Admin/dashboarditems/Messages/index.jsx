// src/pages/admin/Messages/index.jsx
import React from "react";
import { MessageSquare, Mail, CheckCircle, Clock, User } from "lucide-react";

export default function AdminMessages() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-heading">Messages</h1>
        <p className="text-muted text-sm">Manage incoming messages</p>
      </div>
      <div className="bg-card border border-border rounded-xl p-8 text-center">
        <MessageSquare size={40} className="text-muted mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-heading">Messages</h3>
        <p className="text-muted text-sm">View and manage all messages</p>
      </div>
    </div>
  );
}