// src/pages/Admin/Menu/RoleMenuAccess.jsx
import { useState, useEffect } from "react";
import { getMenus, createRoleMenuAccess } from "../../../api/menuApi";

const ROLES = ["admin", "hr", "manager", "editor", "viewer"];

export default function RoleMenuAccess() {
  const [menus, setMenus] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [savingMenuId, setSavingMenuId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [accessMap, setAccessMap] = useState({});

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const data = await getMenus();
        setMenus(data);
      } catch (error) {
        console.error("Menus fetch failed:", error);
        setMessage({ type: "error", text: "Menus load nahi ho paaye" });
      }
    };
    fetchMenus();
  }, []);

  const handleToggleAccess = async (menuId, currentAccess) => {
    if (!selectedRole) {
      setMessage({ type: "error", text: "Pehle role select karo" });
      return;
    }

    try {
      setSavingMenuId(menuId);

      await createRoleMenuAccess(selectedRole, menuId, !currentAccess);

      setAccessMap((prev) => ({
        ...prev,
        [menuId]: !currentAccess,
      }));

      setMessage({
        type: "success",
        text: `${selectedRole} ke liye access ${!currentAccess ? "diya" : "hataya"}`,
      });

      setTimeout(() => setMessage({ type: "", text: "" }), 2500);
    } catch (error) {
      console.error("Role menu access failed:", error);
      setMessage({
        type: "error",
        text: error?.response?.data?.detail?.[0]?.msg
          || error?.response?.data?.message
          || "Access update nahi hua",
      });
    } finally {
      setSavingMenuId(null);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-heading mb-6">Role Menu Access</h1>

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

      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <label className="block text-xs font-semibold text-muted uppercase mb-2">
          Select Role *
        </label>
        <select
          value={selectedRole}
          onChange={(e) => {
            setSelectedRole(e.target.value);
            setAccessMap({});
          }}
          className="w-full max-w-xs px-4 py-2.5 border border-border rounded-lg bg-body text-heading text-sm outline-none focus:border-primary"
        >
          <option value="">-- Select Role --</option>
          {ROLES.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {selectedRole && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-heading">
              Menus for <span className="text-primary capitalize">{selectedRole}</span>
            </h2>
          </div>

          {menus.length === 0 ? (
            <div className="p-8 text-center text-muted">
              Koi menu nahi mila. Pehle Menu Master me menu banao.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {menus.map((menu) => {
                const hasAccess = accessMap[menu.id] || false;
                const isSaving = savingMenuId === menu.id;

                return (
                  <div
                    key={menu.id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-muted/30"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-heading">
                        {menu.name}
                      </p>
                      <p className="text-xs text-muted font-mono mt-0.5">
                        {menu.navigation}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleAccess(menu.id, hasAccess)}
                      disabled={isSaving}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        hasAccess ? "bg-primary" : "bg-gray-300"
                      } ${isSaving ? "opacity-50 cursor-wait" : "cursor-pointer"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          hasAccess ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {!selectedRole && (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted">
            Pehle upar se role select karo — phir menus dikhenge
          </p>
        </div>
      )}
    </div>
  );
}