/**
 * Map database row to Employee GraphQL type
 * @param {Object} row - Database row
 * @returns {Object} Mapped employee object
 */
export function mapEmployeeRow(row) {
  if (!row) return null;

  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    position: row.position,
    department: row.department,
    salary: row.salary ? parseFloat(row.salary) : null,
    hireDate: row.hire_date,
    isActive: row.is_active,
    teamId: row.team_id,
    team_id: row.team_id, // Keep for dataloader
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
