import { employeeMutations } from "../models/mutations.js";
import { mapEmployeeRow } from "../lib/mapper.js";
import { validateEmployeeInput } from "../operations/validate.js";

/**
 * Create a new employee
 */
export async function createEmployee(db, input) {
  validateEmployeeInput(input);

  const {
    firstName,
    lastName,
    email,
    phone,
    position,
    department,
    salary,
    hireDate,
    teamId,
  } = input;

  const result = await db.query(employeeMutations.create, [
    firstName,
    lastName,
    email,
    phone,
    position,
    department,
    salary,
    hireDate || new Date(),
    teamId,
  ]);

  return mapEmployeeRow(result.rows[0]);
}

/**
 * Update an existing employee
 */
export async function updateEmployee(db, id, input) {
  const {
    firstName,
    lastName,
    email,
    phone,
    position,
    department,
    salary,
    teamId,
    isActive,
  } = input;

  const result = await db.query(employeeMutations.update, [
    id,
    firstName,
    lastName,
    email,
    phone,
    position,
    department,
    salary,
    teamId,
    isActive,
  ]);

  return result.rows[0] ? mapEmployeeRow(result.rows[0]) : null;
}

/**
 * Delete an employee
 */
export async function deleteEmployee(db, id) {
  const result = await db.query(employeeMutations.delete, [id]);
  return result.rowCount > 0;
}

/**
 * Assign employee to team
 */
export async function assignEmployeeToTeam(db, employeeId, teamId) {
  const result = await db.query(employeeMutations.assignToTeam, [
    employeeId,
    teamId,
  ]);
  return result.rows[0] ? mapEmployeeRow(result.rows[0]) : null;
}
