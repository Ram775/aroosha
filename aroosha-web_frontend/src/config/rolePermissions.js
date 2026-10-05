// src/config/rolePermissions.js

// ✅ SIRF 3 ROLES - HR, Manager, Editor
export const rolePermissions = {
  // ✅ ADMIN - Full Access (Sab kuch)
  admin: [
    'dashboard', 'jobs', 'services', 'applications', 
    'departments', 'users', 'pending-approvals', 'create-admin',
    'faq', 'team', 'hiring-requests', 'messages', 
    'analytics', 'settings'
  ],

  // ✅ HR - Limited Access
  hr: [  
    'dashboard', 'jobs', 'services', 'applications', 
    'departments', 'users', 'pending-approvals', 
    'faq', 'team', 'hiring-requests', 'messages'
  ],

  // ✅ MANAGER - Limited Access
  manager: [
    'dashboard', 'jobs', 'applications', 'departments', 
    'team', 'hiring-requests', 'messages'
  ],

  // ✅ EDITOR - Limited Access
  editor: [
    'dashboard', 'services', 'applications', 'messages'
  ],
};

// ✅ GET ROLE PERMISSIONS
export const getRolePermissions = (role) => {
  if (!role) return ['dashboard'];
  
  // ✅ Admin ke liye full access
  if (role === 'admin' || role === 'super_admin' || role === 'administrator') {
    return rolePermissions.admin;
  }
  
  // ✅ Baki roles ke liye
  return rolePermissions[role] || ['dashboard'];
};

// ✅ CHECK PERMISSION
export const hasPermission = (role, permission) => {
  if (!role) return false;
  
  // Admin has all permissions
  if (role === 'admin' || role === 'super_admin' || role === 'administrator') {
    return true;
  }
  
  const permissions = rolePermissions[role] || [];
  return permissions.includes(permission);
};