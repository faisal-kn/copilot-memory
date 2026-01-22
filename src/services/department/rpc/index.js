/**
 * Department RPC handlers
 * For inter-service communication
 */

/**
 * Get department for RPC
 */
export async function getDepartmentRpc(db, departmentId) {
  const query = `SELECT * FROM departments WHERE id = $1`;
  const result = await db.query(query, [departmentId]);
  return result.rows[0] || null;
}

/**
 * Check if department exists
 */
export async function departmentExists(db, departmentId) {
  const query = `SELECT EXISTS(SELECT 1 FROM departments WHERE id = $1) as exists`;
  const result = await db.query(query, [departmentId]);
  return result.rows[0].exists;
}

/**
 * Get department by name
 */
export async function getDepartmentByName(db, name) {
  const query = `SELECT * FROM departments WHERE name = $1`;
  const result = await db.query(query, [name]);
  return result.rows[0] || null;
}
