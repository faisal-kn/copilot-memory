/**
 * Employee SQL Queries
 */
export const employeeQueries = {
  getById: `
    SELECT * FROM employees WHERE id = $1
  `,

  getAll: `
    SELECT * FROM employees 
    ORDER BY created_at DESC 
    LIMIT $1 OFFSET $2
  `,

  countAll: `
    SELECT COUNT(*) FROM employees
  `,

  search: `
    SELECT * FROM employees 
    WHERE 
      first_name ILIKE $1 OR 
      last_name ILIKE $1 OR 
      email ILIKE $1 OR 
      position ILIKE $1
    ORDER BY created_at DESC 
    LIMIT $2 OFFSET $3
  `,

  countSearch: `
    SELECT COUNT(*) FROM employees 
    WHERE 
      first_name ILIKE $1 OR 
      last_name ILIKE $1 OR 
      email ILIKE $1 OR 
      position ILIKE $1
  `,

  getByTeam: `
    SELECT * FROM employees 
    WHERE team_id = $1 
    ORDER BY created_at DESC 
    LIMIT $2 OFFSET $3
  `,

  countByTeam: `
    SELECT COUNT(*) FROM employees WHERE team_id = $1
  `,

  getByDepartment: `
    SELECT * FROM employees 
    WHERE department = $1 
    ORDER BY created_at DESC 
    LIMIT $2 OFFSET $3
  `,

  countByDepartment: `
    SELECT COUNT(*) FROM employees WHERE department = $1
  `,

  getStats: `
    SELECT 
      COUNT(*) as total_employees,
      COUNT(*) FILTER (WHERE is_active = true) as active_employees,
      COUNT(DISTINCT team_id) as total_teams,
      AVG(salary) as average_salary
    FROM employees
  `,

  getByStatusAndSalaryRange: `
    SELECT * FROM employees 
    WHERE is_active = $3 
      AND salary BETWEEN $4 AND $5
    ORDER BY created_at DESC 
    LIMIT $1 OFFSET $2
  `,
};
