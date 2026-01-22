import {
  getEmployeeById,
  getAllEmployees,
  getEmployeesByTeam,
  getEmployeesByDepartment,
  getEmployeeStats,
} from "./controllers/get.js";
import {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  assignEmployeeToTeam,
} from "./controllers/mutate.js";

export const EmployeeService = {
  // Queries
  getById: getEmployeeById,
  getAll: getAllEmployees,
  getByTeam: getEmployeesByTeam,
  getByDepartment: getEmployeesByDepartment,
  getStats: getEmployeeStats,

  // Mutations
  create: createEmployee,
  update: updateEmployee,
  delete: deleteEmployee,
  assignToTeam: assignEmployeeToTeam,
};
