import { teamMutations } from "../models/mutations.js";
import { mapTeamRow } from "../lib/mapper.js";
import { validateTeamInput } from "../operations/validate.js";

/**
 * Create a new team
 */
export async function createTeam(db, input) {
  validateTeamInput(input);

  const { name, description, leaderId } = input;

  const result = await db.query(teamMutations.create, [
    name,
    description,
    leaderId,
  ]);

  return mapTeamRow(result.rows[0]);
}

/**
 * Update an existing team
 */
export async function updateTeam(db, id, input) {
  const { name, description, leaderId } = input;

  const result = await db.query(teamMutations.update, [
    id,
    name,
    description,
    leaderId,
  ]);

  return result.rows[0] ? mapTeamRow(result.rows[0]) : null;
}

/**
 * Delete a team
 */
export async function deleteTeam(db, id) {
  // First, remove team association from all employees
  await db.query(`UPDATE employees SET team_id = NULL WHERE team_id = $1`, [
    id,
  ]);

  const result = await db.query(teamMutations.delete, [id]);
  return result.rowCount > 0;
}

/**
 * Add member to team
 */
export async function addMember(db, teamId, employeeId) {
  await db.query(teamMutations.addMember, [teamId, employeeId]);

  const result = await db.query(`SELECT * FROM teams WHERE id = $1`, [teamId]);
  return result.rows[0] ? mapTeamRow(result.rows[0]) : null;
}

/**
 * Remove member from team
 */
export async function removeMember(db, teamId, employeeId) {
  await db.query(teamMutations.removeMember, [teamId, employeeId]);

  const result = await db.query(`SELECT * FROM teams WHERE id = $1`, [teamId]);
  return result.rows[0] ? mapTeamRow(result.rows[0]) : null;
}
