/**
 * Employee RPC handlers
 * For inter-service communication
 */

/**
 * Get employee for RPC
 */
export async function getEmployeeRpc(db, employeeId) {
  const query = `SELECT * FROM employees WHERE id = $1`;
  const result = await db.query(query, [employeeId]);
  return result.rows[0] || null;
}

/**
 * Check if employee exists
 */
export async function employeeExists(db, employeeId) {
  const query = `SELECT EXISTS(SELECT 1 FROM employees WHERE id = $1) as exists`;
  const result = await db.query(query, [employeeId]);
  return result.rows[0].exists;
}

/**
 * Get employee's team ID
 */
export async function getEmployeeTeamId(db, employeeId) {
  const query = `SELECT team_id FROM employees WHERE id = $1`;
  const result = await db.query(query, [employeeId]);
  return result.rows[0]?.team_id || null;
}
