/**
 * Auth RPC handlers
 * For inter-service communication
 */

/**
 * Validate user for RPC
 */
export async function validateUserRpc(db, userId) {
  const query = `SELECT id, email, role, is_active FROM users WHERE id = $1`;
  const result = await db.query(query, [userId]);
  return result.rows[0] || null;
}

/**
 * Check user permission for RPC
 */
export async function checkPermissionRpc(db, userId, permission) {
  const query = `
    SELECT EXISTS(
      SELECT 1 FROM user_permissions 
      WHERE user_id = $1 AND permission = $2
    ) as has_permission
  `;
  const result = await db.query(query, [userId, permission]);
  return result.rows[0].has_permission;
}
