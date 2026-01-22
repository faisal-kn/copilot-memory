/**
 * Auth Library utilities
 */

/**
 * Map user row to safe user object (without sensitive data)
 */
export function mapUserRow(row) {
  if (!row) return null;

  return {
    id: row.id,
    email: row.email,
    role: row.role,
    isActive: row.is_active,
    lastLogin: row.last_login,
    createdAt: row.created_at,
  };
}

/**
 * Available roles
 */
export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  EMPLOYEE: "employee",
};

/**
 * Check if role is valid
 */
export function isValidRole(role) {
  return Object.values(ROLES).includes(role);
}
