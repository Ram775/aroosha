// src/data/roles.js

export const ROLES = {
  HR: {
    id: 'hr',
    name: 'HR Manager',
    icon: 'Users',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    permissions: ['departments', 'jobs', 'applications', 'users'],
    description: 'Manage departments, jobs, and applications'
  },
  MANAGER: {
    id: 'manager',
    name: 'Department Manager',
    icon: 'Briefcase',
    color: 'text-green-600',
    bg: 'bg-green-50',
    permissions: ['jobs', 'applications', 'team'],
    description: 'Manage department jobs and team'
  },
  EDITOR: {
    id: 'editor',
    name: 'Content Editor',
    icon: 'FileText',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    permissions: ['content', 'services'],
    description: 'Manage content and services'
  }
};

// ✅ Admin ko special handle karo
export const getRoleInfo = (roleId) => {
  if (roleId === 'admin') {
    return {
      id: 'admin',
      name: 'Administrator',
      icon: 'Crown',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      permissions: ['all'],
      description: 'Full system access - Manage everything'
    };
  }
  return ROLES[roleId?.toUpperCase()] || {
    id: 'viewer',
    name: 'Viewer',
    icon: 'Eye',
    color: 'text-gray-600',
    bg: 'bg-gray-50',
    permissions: ['view'],
    description: 'Read-only access'
  };
};

export const getAllRoles = () => Object.values(ROLES);

export const hasPermission = (roleId, permission) => {
  if (!roleId) return false;
  
  // ✅ Admin has all permissions
  if (roleId === 'admin') return true;
  
  const role = ROLES[roleId.toUpperCase()];
  if (!role) return false;
  return role.permissions.includes(permission);
};