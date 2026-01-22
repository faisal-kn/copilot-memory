import { isValidEmail, isEmpty } from "../../../lib/utils.js";

/**
 * Validate employee input
 * @param {Object} input - Employee input data
 * @throws {Error} If validation fails
 */
export function validateEmployeeInput(input) {
  const errors = [];

  if (isEmpty(input.firstName)) {
    errors.push("First name is required");
  }

  if (isEmpty(input.lastName)) {
    errors.push("Last name is required");
  }

  if (isEmpty(input.email)) {
    errors.push("Email is required");
  } else if (!isValidEmail(input.email)) {
    errors.push("Invalid email format");
  }

  if (isEmpty(input.position)) {
    errors.push("Position is required");
  }

  if (input.salary !== undefined && input.salary !== null) {
    if (typeof input.salary !== "number" || input.salary < 0) {
      errors.push("Salary must be a positive number");
    }
  }

  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(", ")}`);
  }
}

/**
 * Validate employee update input
 * @param {Object} input - Employee update input data
 * @throws {Error} If validation fails
 */
export function validateEmployeeUpdateInput(input) {
  const errors = [];

  if (input.email !== undefined && !isEmpty(input.email)) {
    if (!isValidEmail(input.email)) {
      errors.push("Invalid email format");
    }
  }

  if (input.salary !== undefined && input.salary !== null) {
    if (typeof input.salary !== "number" || input.salary < 0) {
      errors.push("Salary must be a positive number");
    }
  }

  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(", ")}`);
  }
}
