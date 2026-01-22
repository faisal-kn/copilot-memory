/**
 * Employee Database Functions
 * Direct database operations for employees
 */

/**
 * Get employee with team details
 */
export async function getEmployeeWithTeam(db, employeeId) {
  const query = `
    SELECT 
      e.*,
      t.id as team_id,
      t.name as team_name,
      t.description as team_description
    FROM employees e
    LEFT JOIN teams t ON e.team_id = t.id
    WHERE e.id = $1
  `;
  const result = await db.query(query, [employeeId]);
  return result.rows[0] || null;
}

/**
 * Get employees with their managers
 */
export async function getEmployeesWithManagers(db) {
  const query = `
    SELECT 
      e.*,
      m.first_name as manager_first_name,
      m.last_name as manager_last_name
    FROM employees e
    LEFT JOIN teams t ON e.team_id = t.id
    LEFT JOIN employees m ON t.leader_id = m.id
    ORDER BY e.last_name, e.first_name
  `;
  const result = await db.query(query);
  return result.rows;
}

/**
 * Bulk update employee status
 */
export async function bulkUpdateEmployeeStatus(db, employeeIds, isActive) {
  const query = `
    UPDATE employees 
    SET is_active = $2, updated_at = NOW()
    WHERE id = ANY($1::uuid[])
    RETURNING *
  `;
  const result = await db.query(query, [employeeIds, isActive]);
  return result.rows;
}
