import DataLoader from "dataloader";
import { employeeLoader } from "./employee.js";
import { teamLoader } from "./team.js";

/**
 * Create all data loaders
 * @param {Object} db - Database connection
 * @returns {Object} Object containing all data loaders
 */
export function createDataLoaders(db) {
  return {
    employeeLoader: new DataLoader((ids) => employeeLoader(db, ids)),
    teamLoader: new DataLoader((ids) => teamLoader(db, ids)),
  };
}
