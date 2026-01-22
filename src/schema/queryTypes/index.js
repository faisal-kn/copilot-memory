export const queryTypes = `#graphql
  type Query {
    # Employee Queries
    employee(id: ID!): Employee
    employees(pagination: PaginationInput, search: String): EmployeeListResponse!
    employeesByTeam(teamId: ID!, pagination: PaginationInput): EmployeeListResponse!
    employeesByDepartment(department: String!, pagination: PaginationInput): EmployeeListResponse!

    # Team Queries
    team(id: ID!): Team
    teams(pagination: PaginationInput, search: String): TeamListResponse!

    # Department Queries
    department(id: ID!): Department
    departments: [Department!]!

    # Statistics
    employeeStats: EmployeeStats!
  }

  type EmployeeStats {
    totalEmployees: Int!
    activeEmployees: Int!
    totalTeams: Int!
    averageSalary: Float
  }
`;
