/**
 * Employee Database Functions
 * Direct database operations for employees using Knex
 */

import { knexDb } from "../../lib/db.js";

/**
 * Get employee with team details
 */
export async function getEmployeeWithTeam(db, employeeId) {
  const result = await knexDb("employees as e")
    .select(
      "e.*",
      "t.id as team_id",
      "t.name as team_name",
      "t.description as team_description",
    )
    .leftJoin("teams as t", "e.team_id", "t.id")
    .where("e.id", employeeId)
    .first();

  return result || null;
}

/**
 * Get employees with their managers
 */
export async function getEmployeesWithManagers(db) {
  const result = await knexDb("employees as e")
    .select(
      "e.*",
      "m.first_name as manager_first_name",
      "m.last_name as manager_last_name",
    )
    .leftJoin("teams as t", "e.team_id", "t.id")
    .leftJoin("employees as m", "t.leader_id", "m.id")
    .orderBy(["e.last_name", "e.first_name"]);

  return result;
}

/**
 * Bulk update employee status
 */
export async function bulkUpdateEmployeeStatus(db, employeeIds, isActive) {
  const result = await knexDb("employees")
    .whereIn("id", employeeIds)
    .update({
      is_active: isActive,
      updated_at: knexDb.fn.now(),
    })
    .returning("*");

  return result;
}
