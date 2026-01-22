import { queryTypes } from "./queryTypes/index.js";
import { mutationTypes } from "./mutationTypes/index.js";

export const typeDefs = `#graphql
  scalar DateTime

  # Pagination Input
  input PaginationInput {
    page: Int
    limit: Int
  }

  # Pagination Info
  type PaginationInfo {
    currentPage: Int!
    totalPages: Int!
    totalCount: Int!
    limit: Int!
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
  }

  # Employee Type
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    position: String!
    department: String
    salary: Float
    hireDate: DateTime
    isActive: Boolean!
    teamId: ID
    team: Team
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Team Type
  type Team {
    id: ID!
    name: String!
    description: String
    leaderId: ID
    leader: Employee
    members: [Employee!]!
    memberCount: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Department Type
  type Department {
    id: ID!
    name: String!
    description: String
    budget: Float
    teams: [Team!]!
    employeeCount: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # Employee List Response
  type EmployeeListResponse {
    items: [Employee!]!
    pagination: PaginationInfo!
  }

  # Team List Response
  type TeamListResponse {
    items: [Team!]!
    pagination: PaginationInfo!
  }

  ${queryTypes}
  ${mutationTypes}
`;
