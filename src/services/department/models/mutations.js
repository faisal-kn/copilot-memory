/**
 * Department SQL Mutations
 */
export const departmentMutations = {
  create: `
    INSERT INTO departments (name, description, budget)
    VALUES ($1, $2, $3)
    RETURNING *
  `,

  update: `
    UPDATE departments SET
      name = COALESCE($2, name),
      description = COALESCE($3, description),
      budget = COALESCE($4, budget),
      updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `,

  delete: `
    DELETE FROM departments WHERE id = $1
  `,
};
