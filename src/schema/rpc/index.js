/**
 * RPC handlers for GraphQL schema
 * Used for inter-service communication
 */

export const rpcHandlers = {
  /**
   * Get employee data for RPC calls
   */
  getEmployeeData: async (db, employeeId) => {
    const query = `SELECT * FROM employees WHERE id = $1`;
    const result = await db.query(query, [employeeId]);
    return result.rows[0] || null;
  },

  /**
   * Get team data for RPC calls
   */
  getTeamData: async (db, teamId) => {
    const query = `SELECT * FROM teams WHERE id = $1`;
    const result = await db.query(query, [teamId]);
    return result.rows[0] || null;
  },

  /**
   * Validate employee exists
   */
  validateEmployee: async (db, employeeId) => {
    const query = `SELECT EXISTS(SELECT 1 FROM employees WHERE id = $1) as exists`;
    const result = await db.query(query, [employeeId]);
    return result.rows[0].exists;
  },
};
