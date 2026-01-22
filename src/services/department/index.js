import {
  getDepartmentById,
  getAllDepartments,
  getDepartmentTeams,
  getDepartmentEmployeeCount,
} from "./controllers/get.js";
import {
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "./controllers/mutate.js";

export const DepartmentService = {
  // Queries
  getById: getDepartmentById,
  getAll: getAllDepartments,
  getTeams: getDepartmentTeams,
  getEmployeeCount: getDepartmentEmployeeCount,

  // Mutations
  create: createDepartment,
  update: updateDepartment,
  delete: deleteDepartment,
};
