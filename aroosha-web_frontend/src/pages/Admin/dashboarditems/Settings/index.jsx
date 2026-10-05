// src/pages/admin/Settings/index.jsx
import { useState } from "react";
import { useAdmin } from "../../../../auth/AdminContext";
import { Card, Button, Input } from "../../../../components/ui";
import { User, Shield, Save } from "lucide-react";

// ✅ DEFAULT EXPORT
export default function AdminSettings() {
  const { admin } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    phone: "+91 98765 43210",
    company: "Aroosha Technologies",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    alert("Profile updated successfully!");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    alert("Password changed successfully!");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-heading">Settings</h1>
        <p className="text-muted mt-1">Manage your account and application settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card padding="p-6">
          <div className="flex items-center gap-2 mb-6">
            <User size={20} className="text-primary" />
            <h2 className="text-lg font-bold text-heading">Profile Settings</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            <Input label="Email" type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <Input label="Phone" name="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            <Input label="Company" name="company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
            <Button type="submit" variant="primary" loading={loading} icon={<Save size={16} />}>
              Update Profile
            </Button>
          </form>
        </Card>

        {/* Security Settings */}
        <Card padding="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield size={20} className="text-primary" />
            <h2 className="text-lg font-bold text-heading">Security</h2>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <Input label="Current Password" type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} required />
            <Input label="New Password" type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} required />
            <Input label="Confirm Password" type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} required />
            <Button type="submit" variant="primary" loading={loading} icon={<Shield size={16} />}>
              Change Password
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}