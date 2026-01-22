import { isEmpty } from "../../../lib/utils.js";

/**
 * Validate department input
 * @param {Object} input - Department input data
 * @throws {Error} If validation fails
 */
export function validateDepartmentInput(input) {
  const errors = [];

  if (isEmpty(input.name)) {
    errors.push("Department name is required");
  }

  if (input.name && input.name.length > 100) {
    errors.push("Department name must be less than 100 characters");
  }

  if (input.budget !== undefined && input.budget !== null) {
    if (typeof input.budget !== "number" || input.budget < 0) {
      errors.push("Budget must be a positive number");
    }
  }

  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(", ")}`);
  }
}
