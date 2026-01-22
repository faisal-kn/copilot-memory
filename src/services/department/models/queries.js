/**
 * Department SQL Queries
 */
export const departmentQueries = {
  getById: `
    SELECT * FROM departments WHERE id = $1
  `,

  getAll: `
    SELECT * FROM departments ORDER BY name
  `,

  getTeams: `
    SELECT DISTINCT t.* FROM teams t
    JOIN employees e ON e.team_id = t.id
    WHERE e.department = $1
    ORDER BY t.name
  `,

  countEmployees: `
    SELECT COUNT(*) FROM employees WHERE department = $1
  `,
};
