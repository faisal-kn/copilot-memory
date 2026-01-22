/**
 * Employee SQL Mutations
 */
export const employeeMutations = {
  create: `
    INSERT INTO employees (
      first_name, last_name, email, phone, position, 
      department, salary, hire_date, team_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `,

  update: `
    UPDATE employees SET
      first_name = COALESCE($2, first_name),
      last_name = COALESCE($3, last_name),
      email = COALESCE($4, email),
      phone = COALESCE($5, phone),
      position = COALESCE($6, position),
      department = COALESCE($7, department),
      salary = COALESCE($8, salary),
      team_id = COALESCE($9, team_id),
      is_active = COALESCE($10, is_active),
      updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `,

  delete: `
    DELETE FROM employees WHERE id = $1
  `,

  assignToTeam: `
    UPDATE employees SET
      team_id = $2,
      updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `,
};
