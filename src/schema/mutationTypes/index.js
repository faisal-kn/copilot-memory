export const mutationTypes = `#graphql
  # Input Types for Mutations
  input CreateEmployeeInput {
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    position: String!
    department: String
    salary: Float
    hireDate: DateTime
    teamId: ID
  }

  input UpdateEmployeeInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    position: String
    department: String
    salary: Float
    teamId: ID
    isActive: Boolean
  }

  input CreateTeamInput {
    name: String!
    description: String
    leaderId: ID
  }

  input UpdateTeamInput {
    name: String
    description: String
    leaderId: ID
  }

  input CreateDepartmentInput {
    name: String!
    description: String
    budget: Float
  }

  input UpdateDepartmentInput {
    name: String
    description: String
    budget: Float
  }

  type Mutation {
    # Employee Mutations
    createEmployee(input: CreateEmployeeInput!): Employee!
    updateEmployee(id: ID!, input: UpdateEmployeeInput!): Employee
    deleteEmployee(id: ID!): Boolean!
    assignEmployeeToTeam(employeeId: ID!, teamId: ID!): Employee

    # Team Mutations
    createTeam(input: CreateTeamInput!): Team!
    updateTeam(id: ID!, input: UpdateTeamInput!): Team
    deleteTeam(id: ID!): Boolean!
    addMemberToTeam(teamId: ID!, employeeId: ID!): Team
    removeMemberFromTeam(teamId: ID!, employeeId: ID!): Team

    # Department Mutations
    createDepartment(input: CreateDepartmentInput!): Department!
    updateDepartment(id: ID!, input: UpdateDepartmentInput!): Department
    deleteDepartment(id: ID!): Boolean!
  }
`;
