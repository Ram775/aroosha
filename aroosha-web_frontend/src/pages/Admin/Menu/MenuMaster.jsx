// src/pages/Admin/Menu/MenuMaster.jsx
import { useState, useEffect } from "react";
import { getMenus, createMenu } from "../../../api/menuApi";

export default function MenuMaster() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", navigation: "" });
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const data = await getMenus();
      setMenus(data);
    } catch (error) {
      console.error("Menu fetch failed:", error);
      setMessage({ type: "error", text: "Menus load nahi ho paaye" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.navigation.trim()) {
      setMessage({ type: "error", text: "Name aur Navigation dono zaroori hain" });
      return;
    }

    try {
      setLoading(true);

      const newMenu = await createMenu(formData);

      setMenus((prev) => [...prev, newMenu]);
      setFormData({ name: "", navigation: "" });
      setMessage({ type: "success", text: "Menu create ho gaya!" });

      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Menu creation failed:", error);
      setMessage({
        type: "error",
        text: error?.response?.data?.detail?.[0]?.msg
          || error?.response?.data?.message
          || "Menu create nahi hua",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-heading mb-6">Menu Master</h1>

      {message.text && (
        <div
          className={`mb-4 px-4 py-3 rounded-xl text-sm font-medium ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-card border border-border rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-heading mb-4">
          Create New Menu
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted uppercase mb-2">
              Menu Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Dashboard"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-body text-heading text-sm outline-none focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-muted uppercase mb-2">
              Navigation (Path) *
            </label>
            <input
              type="text"
              placeholder="e.g. /admin/dashboard"
              value={formData.navigation}
              onChange={(e) => setFormData({ ...formData, navigation: e.target.value })}
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-body text-heading text-sm outline-none focus:border-primary"
              required
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full md:w-auto"
            >
              {loading ? "Creating..." : "Create Menu"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-heading">
            All Menus ({menus.length})
          </h2>
        </div>

        {loading && menus.length === 0 ? (
          <div className="p-8 text-center text-muted">Loading...</div>
        ) : menus.length === 0 ? (
          <div className="p-8 text-center text-muted">Koi menu nahi mila</div>
        ) : (
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Navigation</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm text-muted">{menu.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-heading">{menu.name}</td>
                  <td className="px-4 py-3 text-sm text-muted font-mono">{menu.navigation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}