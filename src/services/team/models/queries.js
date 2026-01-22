/**
 * Team SQL Queries
 */
export const teamQueries = {
  getById: `
    SELECT * FROM teams WHERE id = $1
  `,

  getAll: `
    SELECT * FROM teams 
    ORDER BY created_at DESC 
    LIMIT $1 OFFSET $2
  `,

  countAll: `
    SELECT COUNT(*) FROM teams
  `,

  search: `
    SELECT * FROM teams 
    WHERE name ILIKE $1 OR description ILIKE $1
    ORDER BY created_at DESC 
    LIMIT $2 OFFSET $3
  `,

  countSearch: `
    SELECT COUNT(*) FROM teams 
    WHERE name ILIKE $1 OR description ILIKE $1
  `,

  getMembers: `
    SELECT * FROM employees 
    WHERE team_id = $1 
    ORDER BY first_name, last_name
  `,

  countMembers: `
    SELECT COUNT(*) FROM employees WHERE team_id = $1
  `,
};
