/**
 * Auth Database Functions
 * Direct database operations for authentication
 */

/**
 * Get user by email with permissions
 */
export async function getUserWithPermissions(db, email) {
  const query = `
    SELECT 
      u.*,
      array_agg(up.permission) as permissions
    FROM users u
    LEFT JOIN user_permissions up ON u.id = up.user_id
    WHERE u.email = $1
    GROUP BY u.id
  `;
  const result = await db.query(query, [email]);
  return result.rows[0] || null;
}

/**
 * Create user with default permissions
 */
export async function createUserWithPermissions(db, email, passwordHash, role) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // Create user
    const userResult = await client.query(
      `INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING *`,
      [email, passwordHash, role],
    );
    const user = userResult.rows[0];

    // Add default permissions based on role
    const defaultPermissions = getDefaultPermissions(role);
    for (const permission of defaultPermissions) {
      await client.query(
        `INSERT INTO user_permissions (user_id, permission) VALUES ($1, $2)`,
        [user.id, permission],
      );
    }

    await client.query("COMMIT");
    return user;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Get default permissions for role
 */
function getDefaultPermissions(role) {
  const permissions = {
    admin: ["read", "write", "delete", "manage_users", "manage_teams"],
    manager: ["read", "write", "manage_teams"],
    employee: ["read"],
  };
  return permissions[role] || ["read"];
}
