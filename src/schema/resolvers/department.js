import { DepartmentService } from "../../services/department/index.js";

export const departmentResolvers = {
  Query: {
    department: async (_, { id }, { db }) => {
      return DepartmentService.getById(db, id);
    },

    departments: async (_, __, { db }) => {
      return DepartmentService.getAll(db);
    },
  },

  Mutation: {
    createDepartment: async (_, { input }, { db }) => {
      return DepartmentService.create(db, input);
    },

    updateDepartment: async (_, { id, input }, { db }) => {
      return DepartmentService.update(db, id, input);
    },

    deleteDepartment: async (_, { id }, { db }) => {
      return DepartmentService.delete(db, id);
    },
  },

  Department: {
    teams: async (department, _, { db }) => {
      return DepartmentService.getTeams(db, department.name);
    },

    employeeCount: async (department, _, { db }) => {
      return DepartmentService.getEmployeeCount(db, department.name);
    },
  },
};
