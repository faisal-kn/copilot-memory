import { isEmpty } from "../../../lib/utils.js";

/**
 * Validate team input
 * @param {Object} input - Team input data
 * @throws {Error} If validation fails
 */
export function validateTeamInput(input) {
  const errors = [];

  if (isEmpty(input.name)) {
    errors.push("Team name is required");
  }

  if (input.name && input.name.length > 100) {
    errors.push("Team name must be less than 100 characters");
  }

  if (input.description && input.description.length > 500) {
    errors.push("Description must be less than 500 characters");
  }

  if (errors.length > 0) {
    throw new Error(`Validation failed: ${errors.join(", ")}`);
  }
}
