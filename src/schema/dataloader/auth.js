/**
 * Batch load users by IDs for authentication
 * @param {Object} db - Database connection
 * @param {Array<string>} ids - Array of user IDs
 * @returns {Promise<Array>} Array of users in the same order as IDs
 */
export async function authUserLoader(db, ids) {
  const query = `
    SELECT id, email, role, is_active 
    FROM users 
    WHERE id = ANY($1::uuid[])
  `;

  const result = await db.query(query, [ids]);
  const userMap = new Map(result.rows.map((user) => [user.id, user]));

  return ids.map((id) => userMap.get(id) || null);
}

/**
 * Batch load user permissions
 * @param {Object} db - Database connection
 * @param {Array<string>} userIds - Array of user IDs
 * @returns {Promise<Array>} Array of permissions for each user
 */
export async function permissionsLoader(db, userIds) {
  const query = `
    SELECT user_id, permission 
    FROM user_permissions 
    WHERE user_id = ANY($1::uuid[])
  `;

  const result = await db.query(query, [userIds]);
  const permissionMap = new Map();

  result.rows.forEach((row) => {
    if (!permissionMap.has(row.user_id)) {
      permissionMap.set(row.user_id, []);
    }
    permissionMap.get(row.user_id).push(row.permission);
  });

  return userIds.map((id) => permissionMap.get(id) || []);
}
