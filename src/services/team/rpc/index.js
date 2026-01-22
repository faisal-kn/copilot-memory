/**
 * Team RPC handlers
 * For inter-service communication
 */

/**
 * Get team for RPC
 */
export async function getTeamRpc(db, teamId) {
  const query = `SELECT * FROM teams WHERE id = $1`;
  const result = await db.query(query, [teamId]);
  return result.rows[0] || null;
}

/**
 * Check if team exists
 */
export async function teamExists(db, teamId) {
  const query = `SELECT EXISTS(SELECT 1 FROM teams WHERE id = $1) as exists`;
  const result = await db.query(query, [teamId]);
  return result.rows[0].exists;
}

/**
 * Get team's leader ID
 */
export async function getTeamLeaderId(db, teamId) {
  const query = `SELECT leader_id FROM teams WHERE id = $1`;
  const result = await db.query(query, [teamId]);
  return result.rows[0]?.leader_id || null;
}
