/**
 * Auth Models - SQL Queries
 */

export const authQueries = {
  getUserByEmail: `
    SELECT * FROM users WHERE email = $1
  `,

  getUserById: `
    SELECT * FROM users WHERE id = $1
  `,

  createUser: `
    INSERT INTO users (email, password_hash, role)
    VALUES ($1, $2, $3)
    RETURNING *
  `,

  updateLastLogin: `
    UPDATE users SET last_login = NOW() WHERE id = $1
  `,
};
