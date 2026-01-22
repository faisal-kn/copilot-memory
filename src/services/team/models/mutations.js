/**
 * Team SQL Mutations
 */
export const teamMutations = {
  create: `
    INSERT INTO teams (name, description, leader_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `,

  update: `
    UPDATE teams SET
      name = COALESCE($2, name),
      description = COALESCE($3, description),
      leader_id = COALESCE($4, leader_id),
      updated_at = NOW()
    WHERE id = $1
    RETURNING *
  `,

  delete: `
    DELETE FROM teams WHERE id = $1
  `,

  addMember: `
    UPDATE employees SET
      team_id = $1,
      updated_at = NOW()
    WHERE id = $2
  `,

  removeMember: `
    UPDATE employees SET
      team_id = NULL,
      updated_at = NOW()
    WHERE id = $2 AND team_id = $1
  `,
};
