import { departmentMutations } from "../models/mutations.js";
import { mapDepartmentRow } from "../lib/mapper.js";
import { validateDepartmentInput } from "../operations/validate.js";

/**
 * Create a new department
 */
export async function createDepartment(db, input) {
  validateDepartmentInput(input);

  const { name, description, budget } = input;

  const result = await db.query(departmentMutations.create, [
    name,
    description,
    budget,
  ]);

  return mapDepartmentRow(result.rows[0]);
}

/**
 * Update an existing department
 */
export async function updateDepartment(db, id, input) {
  const { name, description, budget } = input;

  const result = await db.query(departmentMutations.update, [
    id,
    name,
    description,
    budget,
  ]);

  return result.rows[0] ? mapDepartmentRow(result.rows[0]) : null;
}

/**
 * Delete a department
 */
export async function deleteDepartment(db, id) {
  const result = await db.query(departmentMutations.delete, [id]);
  return result.rowCount > 0;
}
