import { departmentQueries } from "../models/queries.js";
import { mapDepartmentRow } from "../lib/mapper.js";
import { mapTeamRow } from "../../team/lib/mapper.js";

/**
 * Get department by ID
 */
export async function getDepartmentById(db, id) {
  const result = await db.query(departmentQueries.getById, [id]);
  return result.rows[0] ? mapDepartmentRow(result.rows[0]) : null;
}

/**
 * Get all departments
 */
export async function getAllDepartments(db) {
  const result = await db.query(departmentQueries.getAll);
  return result.rows.map(mapDepartmentRow);
}

/**
 * Get teams by department name
 */
export async function getDepartmentTeams(db, departmentName) {
  const result = await db.query(departmentQueries.getTeams, [departmentName]);
  return result.rows.map(mapTeamRow);
}

/**
 * Get employee count in department
 */
export async function getDepartmentEmployeeCount(db, departmentName) {
  const result = await db.query(departmentQueries.countEmployees, [
    departmentName,
  ]);
  return parseInt(result.rows[0].count, 10);
}
