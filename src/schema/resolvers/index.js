import { employeeResolvers } from "./employee.js";
import { teamResolvers } from "./team.js";
import { departmentResolvers } from "./department.js";
import { GraphQLScalarType, Kind } from "graphql";

// DateTime scalar
const dateTimeScalar = new GraphQLScalarType({
  name: "DateTime",
  description: "DateTime custom scalar type",
  serialize(value) {
    return value instanceof Date ? value.toISOString() : value;
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

export const resolvers = {
  DateTime: dateTimeScalar,

  Query: {
    ...employeeResolvers.Query,
    ...teamResolvers.Query,
    ...departmentResolvers.Query,
  },

  Mutation: {
    ...employeeResolvers.Mutation,
    ...teamResolvers.Mutation,
    ...departmentResolvers.Mutation,
  },

  Employee: employeeResolvers.Employee,
  Team: teamResolvers.Team,
  Department: departmentResolvers.Department,
};
