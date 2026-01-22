import { EmployeeService } from "../../services/employee/index.js";
import {
  parsePagination,
  createPaginationResponse,
} from "../../lib/pagination.js";

export const employeeResolvers = {
  Query: {
    employee: async (_, { id }, { db }) => {
      return EmployeeService.getById(db, id);
    },

    employees: async (_, { pagination, search }, { db }) => {
      const paginationParams = parsePagination(pagination);
      const { items, totalCount } = await EmployeeService.getAll(
        db,
        paginationParams,
        search,
      );
      return createPaginationResponse(items, totalCount, paginationParams);
    },

    employeesByTeam: async (_, { teamId, pagination }, { db }) => {
      const paginationParams = parsePagination(pagination);
      const { items, totalCount } = await EmployeeService.getByTeam(
        db,
        teamId,
        paginationParams,
      );
      return createPaginationResponse(items, totalCount, paginationParams);
    },

    employeesByDepartment: async (_, { department, pagination }, { db }) => {
      const paginationParams = parsePagination(pagination);
      const { items, totalCount } = await EmployeeService.getByDepartment(
        db,
        department,
        paginationParams,
      );
      return createPaginationResponse(items, totalCount, paginationParams);
    },

    employeeStats: async (_, __, { db }) => {
      return EmployeeService.getStats(db);
    },
  },

  Mutation: {
    createEmployee: async (_, { input }, { db }) => {
      return EmployeeService.create(db, input);
    },

    updateEmployee: async (_, { id, input }, { db }) => {
      return EmployeeService.update(db, id, input);
    },

    deleteEmployee: async (_, { id }, { db }) => {
      return EmployeeService.delete(db, id);
    },

    assignEmployeeToTeam: async (_, { employeeId, teamId }, { db }) => {
      return EmployeeService.assignToTeam(db, employeeId, teamId);
    },
  },

  Employee: {
    team: async (employee, _, { loaders }) => {
      if (!employee.team_id) return null;
      return loaders.teamLoader.load(employee.team_id);
    },
  },
};
